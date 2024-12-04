<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use Intervention\Image\Laravel\Facades\Image;
use Illuminate\Support\Facades\Storage;
use App\Models\Project;
use App\Models\ProjectImage;
use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProjectController extends Controller
{
    public function index()
    {
        $orderColumn = request('order_column', 'created_at');
        if (!in_array($orderColumn, ['id', 'name', 'created_at'])) {
            $orderColumn = 'created_at';
        }
        $orderDirection = request('order_direction', 'desc');
        if (!in_array($orderDirection, ['asc', 'desc'])) {
            $orderDirection = 'desc';
        }
        $projects = Project::when(request('search_id'), function ($query) {
            $query->where('id', request('search_id'));
        })
            ->when(request('search_title'), function ($query) {
                $query->where('name', 'like', '%' . request('search_title') . '%');
            })
            ->when(request('search_parent_id'), function ($query) {
                $query->where('parent_id', 'like', '%' . request('search_parent_id') . '%');
            })
            ->when(request('search_global'), function ($query) {
                $query->where(function ($q) {
                    $q->where('id', request('search_global'))
                        ->orWhere('name', 'like', '%' . request('search_global') . '%');
                });
            })
            ->orderBy($orderColumn, $orderDirection)
            ->paginate(10000);
        return ProjectResource::collection($projects);
    }

    public function store(StoreProjectRequest $request)
    {
        $this->authorize('project-create');

        // Check if the project with the same name already exists
        $existingProject = Project::where('name', $request->name)->first();
        if ($existingProject) {
            return response()->json(['errors' => ['name' => ['Project with the same name already exists.']]], 409);
        }


        $validatedData = $request->validated();
        $validatedData['created_by'] = auth()->user()->id;

        if ($request->hasFile('main_image_path')) {

            $file = $request->file('main_image_path');

            $file_name = time() . '_' . $request->file('main_image_path')->getClientOriginalName();
            $file_path = 'uploads/' . $file_name;

            // Create and process the image using the new syntax
            $image = $this->imageManager->read($file)->coverDown(800, 800)->toJpeg(85);

            // Store the optimized image
            Storage::disk('public')->put($file_path, $image);
            //$file_path = $request->file('main_image_path')->storeAs('uploads', $file_name, 'public');

            $validatedData['main_image_path'] = $file_path;
        }

        if ($request->hasFile('document')) {

            $file_name = time() . '_' . $request->file('document')->getClientOriginalName();
            $file_path = $request->file('document')->storeAs('uploads', $file_name, 'public');
            $validatedData['document_path'] = $file_path;
        }


        $project = Project::create($validatedData);


        if ($request->has('categories')) {
            $categories = $request->input('categories');

            $categoryIds = explode(',', $categories);

            foreach ($categoryIds as $categoryId) {

                $project->clients()->create([
                    'category_id' => $categoryId,
                ]);
            }
        }



        if ($request->hasFile('project_gallery')) {

            $projectGallery = collect($request->file('project_gallery'))->map(function ($file) {

                $file_name = time() . '_' . '_gallery_' . $file->getClientOriginalName();
                $file_path = 'uploads/' . $file_name;

                // Create and process the image using the new syntax
                $image = $this->imageManager->read($file)->coverDown(800, 800)->toJpeg(85);

                // Store the optimized image
                Storage::disk('public')->put($file_path, $image);


                return $file_path;
            })->toArray();


            foreach ($projectGallery as $imagePath) {
                $project->projectImages()->create([
                    'name' => $imagePath,
                ]);
            }
        }

        return new ProjectResource($project);
    }

    public function show(Project $project)
    {
        $this->authorize('project-edit');
        return new ProjectResource($project);
    }

    public function update(Project $project, UpdateProjectRequest $request)
    {
        $this->authorize('project-edit');

        $validatedData = $request->validated();


        // Check if the project with the same name already exists (excluding the current project)
        $existingProject = Project::where('name', $request->name)
            ->where('id', '!=', $project->id)
            ->first();
        if ($existingProject) {
            return response()->json(['errors' => ['name' => ['Project with the same name already exists.']]], 409);
        }

        if ($request->hasFile('main_image_path')) {

            $file = $request->file('main_image_path');

            $file_name = time() . '_' . $request->file('main_image_path')->getClientOriginalName();
            $file_path = 'uploads/' . $file_name;

            // Create and process the image using the new syntax
            $image = $this->imageManager->read($file)->coverDown(800, 800)->toJpeg(85);

            // Store the optimized image
            Storage::disk('public')->put($file_path, $image);
            //$file_path = $request->file('main_image_path')->storeAs('uploads', $file_name, 'public');

            $validatedData['main_image_path'] = $file_path;
        }





        $project->update($validatedData);

        if ($request->has('categories')) {

            $project->clients()->delete();

            $categories = $request->input('categories');

            $categoryIds = explode(',', $categories);

            foreach ($categoryIds as $categoryId) {

                $project->clients()->create([
                    'category_id' => $categoryId,
                ]);
            }
        }



        if ($request->hasFile('project_gallery')) {

            $projectGallery = collect($request->file('project_gallery'))->map(function ($file) {

                $file_name = time() . '_' . '_gallery_' . $file->getClientOriginalName();
                $file_path = 'uploads/' . $file_name;

                // Create and process the image using the new syntax
                $image = $this->imageManager->read($file)->coverDown(800, 800)->toJpeg(85);

                // Store the optimized image
                Storage::disk('public')->put($file_path, $image);


                return $file_path;
            })->toArray();


            foreach ($projectGallery as $imagePath) {
                $project->projectImages()->create([
                    'name' => $imagePath,
                ]);
            }
        }


        //dd("test");

        return new ProjectResource($project);
    }

    public function destroy(Project $project)
    {
        $this->authorize('project-delete');
        $project->delete();

        return response()->noContent();
    }

    public function getList()
    {
        return ProjectResource::collection(Project::all());
    }

    public function getProjects()
    {
        $perPage = request('per_page', 12);

        $projects = Project::select('projects.*')
            ->join(
                DB::raw("(SELECT MAX(id) as id FROM projects GROUP BY client) as latest_projects"),
                function ($join) {
                    $join->on('projects.id', '=', 'latest_projects.id');
                }
            )
            ->get();


        return ProjectResource::collection($projects);
    }

    public function getProject()
    {

        $project_id = request('project_id', 1);

        //dd("iko");

        $project = Project::find($project_id);

        return new ProjectResource($project);
    }
}
