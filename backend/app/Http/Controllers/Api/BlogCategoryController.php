<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBlogCategoryRequest;
use App\Http\Resources\BlogCategoryResource;
use Intervention\Image\Laravel\Facades\Image;
use Illuminate\Support\Facades\Storage;
use App\Models\BlogCategory;
use Illuminate\Http\Request;

class BlogCategoryController extends Controller
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
        $blogCategories = BlogCategory::when(request('search_id'), function ($query) {
            $query->where('id', request('search_id'));
        })
            ->when(request('search_title'), function ($query) {
                $query->where('name', 'like', '%' . request('search_title') . '%');
            })
            ->when(request('search_global'), function ($query) {
                $query->where(function ($q) {
                    $q->where('id', request('search_global'))
                        ->orWhere('name', 'like', '%' . request('search_global') . '%');
                });
            })
            ->orderBy($orderColumn, $orderDirection)
            ->paginate(50);
        return BlogCategoryResource::collection($blogCategories);
    }

    public function store(StoreBlogCategoryRequest $request)
    {
        $this->authorize('blogCategory-create');

        // Check if the blogCategory with the same name already exists
        $existingBlogCategory = BlogCategory::where('name', $request->name)->first();
        if ($existingBlogCategory) {
            return response()->json(['errors' => ['name' => ['BlogCategory with the same name already exists.']]], 409);
        }

        $validatedData = $request->validated();
        $validatedData['created_by'] = auth()->user()->id;

        if ($request->hasFile('main_image')) {

            $file = $request->file('main_image');

            $file_name = time() . '_' . '_blogCategory_' . $request->file('main_image')->getClientOriginalName();
            $file_path = 'uploads/' . $file_name;

            // Create and process the image using the new syntax
            $image = $this->imageManager->read($file)->coverDown(800, 800)->toJpeg(85);

            // Store the optimized image
            Storage::disk('public')->put($file_path, $image);
            //$file_path = $request->file('main_image')->storeAs('uploads', $file_name, 'public');

            $validatedData['main_image_path'] = $file_path;
        }

        $blogCategory = BlogCategory::create($validatedData);

        return new BlogCategoryResource($blogCategory);
    }

    public function show(BlogCategory $blogCategory)
    {
        $this->authorize('blogCategory-edit');
        return new BlogCategoryResource($blogCategory);
    }

    public function update(BlogCategory $blogCategory, StoreBlogCategoryRequest $request)
    {
        $this->authorize('blogCategory-edit');

        // Check if the blogCategory with the same name already exists (excluding the current blogCategory)
        $existingBlogCategory = BlogCategory::where('name', $request->name)
            ->where('id', '!=', $blogCategory->id)
            ->first();
        if ($existingBlogCategory) {
            return response()->json(['errors' => ['name' => ['BlogCategory with the same name already exists.']]], 409);
        }
        $validatedData = $request->validated();

        if ($request->hasFile('main_image')) {

            $file = $request->file('main_image');

            $file_name = time() . '_' . '_blogCategory_' . $request->file('main_image')->getClientOriginalName();
            $file_path = 'uploads/' . $file_name;

            // Create and process the image using the new syntax
            $image = $this->imageManager->read($file)->coverDown(800, 800)->toJpeg(85);

            // Store the optimized image
            Storage::disk('public')->put($file_path, $image);
            //$file_path = $request->file('main_image')->storeAs('uploads', $file_name, 'public');

            $validatedData['main_image_path'] = $file_path;
        }

        $blogCategory->update($validatedData);

        return new BlogCategoryResource($blogCategory);
    }

    public function destroy(BlogCategory $blogCategory)
    {
        $this->authorize('blogCategory-delete');
        $blogCategory->delete();

        return response()->noContent();
    }

    public function getList()
    {
        return BlogCategoryResource::collection(BlogCategory::all());
    }
}
