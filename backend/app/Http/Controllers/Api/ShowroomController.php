<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreShowroomRequest;
use App\Http\Resources\ShowroomResource;
use Intervention\Image\Laravel\Facades\Image;
use Illuminate\Support\Facades\Storage;
use App\Models\Showroom;
use App\Models\showroomImage;
use Illuminate\Http\Request;

class ShowroomController extends Controller
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
        $showrooms = Showroom::when(request('search_id'), function ($query) {
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
            ->paginate(300);
        return ShowroomResource::collection($showrooms);
    }

    public function store(StoreShowroomRequest $request)
    {
        $this->authorize('showroom-create');

        // Check if the showroom with the same name already exists
        $existingShowroom = Showroom::where('name', $request->name)->first();
        if ($existingShowroom) {
            return response()->json(['errors' => ['name' => ['Showroom with the same name already exists.']]], 409);
        }


        $validatedData = $request->validated();
        $validatedData['created_by'] = auth()->user()->id;



        if ($request->hasFile('main_image')) {

            $file = $request->file('main_image');

            $file_name = time() . '_' . $request->file('main_image')->getClientOriginalName();
            $file_path = 'uploads/' . $file_name;

            // Create and process the image using the new syntax
            $image = $this->imageManager->read($file)->coverDown(800, 800)->toJpeg(85);

            // Store the optimized image
            Storage::disk('public')->put($file_path, $image);
            //$file_path = $request->file('main_image')->storeAs('uploads', $file_name, 'public');

            $validatedData['main_image_path'] = $file_path;
        }


        $showroom = Showroom::create($validatedData);



        if ($request->hasFile('showroom_gallery')) {

            $showroomGallery = collect($request->file('showroom_gallery'))->map(function ($file) {

                $file_name = time() . '_' . '_gallery_' . $file->getClientOriginalName();
                $file_path = 'uploads/' . $file_name;

                // Create and process the image using the new syntax
                $image = $this->imageManager->read($file)->coverDown(800, 800)->toJpeg(85);

                // Store the optimized image
                Storage::disk('public')->put($file_path, $image);


                return $file_path;
            })->toArray();


            foreach ($showroomGallery as $imagePath) {
                $showroom->showroomImages()->create([
                    'name' => $imagePath,
                ]);
            }
        }




        return new ShowroomResource($showroom);
    }

    public function show(Showroom $showroom)
    {
        $this->authorize('showroom-edit');
        return new ShowroomResource($showroom);
    }

    public function update(Showroom $showroom, StoreShowroomRequest $request)
    {
        $this->authorize('showroom-edit');

        // Check if the showroom with the same name already exists (excluding the current showroom)
        $existingShowroom = Showroom::where('name', $request->name)
            ->where('brand', '=', $showroom->brand)
            ->where('id', '!=', $showroom->id)
            ->first();
        if ($existingShowroom) {
            return response()->json(['errors' => ['name' => ['Showroom with the same name already exists.']]], 409);
        }



        $showroom->update($request->validated());

        return new ShowroomResource($showroom);
    }

    public function destroy(Showroom $showroom)
    {
        $this->authorize('showroom-delete');
        $showroom->delete();

        return response()->noContent();
    }

    public function getList()
    {
        return ShowroomResource::collection(Showroom::all());
    }

    public function getShowrooms()
    {

        $showrooms = Showroom::get();

        return response()->json($showrooms);
    }

    public function getShowroom()
    {

        $showroom_id = request('showroom_id', 1);

        $showroom = Showroom::find($showroom_id);
        $other_showrooms = Showroom::where('id', '!=', $showroom_id)->get();

        return response()->json(['showroom' => new ShowroomResource($showroom), 'other_showrooms' => $other_showrooms]);

        //return ;
    }
}
