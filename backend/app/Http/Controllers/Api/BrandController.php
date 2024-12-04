<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBrandRequest;
use App\Http\Resources\BrandResource;
use Intervention\Image\Laravel\Facades\Image;
use Illuminate\Support\Facades\Storage;
use App\Models\Brand;
use Illuminate\Http\Request;

class BrandController extends Controller
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
        $brands = Brand::when(request('search_id'), function ($query) {
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
            ->paginate(10000);
        return BrandResource::collection($brands);
    }

    public function store(StoreBrandRequest $request)
    {
        $this->authorize('brand-create');

        // Check if the brand with the same name already exists
        $existingBrand = Brand::where('name', $request->name)->first();
        if ($existingBrand) {
            return response()->json(['errors' => ['name' => ['Brand with the same name already exists.']]], 409);
        }

        $validatedData = $request->validated();
        $validatedData['created_by'] = auth()->user()->id;

        if ($request->hasFile('main_image')) {

            $file = $request->file('main_image');

            $file_name = time() . '_' . '_brand_' . $request->file('main_image')->getClientOriginalName();
            $file_path = 'uploads/' . $file_name;

            // Create and process the image using the new syntax
            $image = $this->imageManager->read($file)->coverDown(800, 800)->toJpeg(85);

            // Store the optimized image
            Storage::disk('public')->put($file_path, $image);
            //$file_path = $request->file('main_image')->storeAs('uploads', $file_name, 'public');

            $validatedData['main_image_path'] = $file_path;
        }

        $brand = Brand::create($validatedData);

        return new BrandResource($brand);
    }

    public function show(Brand $brand)
    {
        $this->authorize('brand-edit');
        return new BrandResource($brand);
    }

    public function update(Brand $brand, StoreBrandRequest $request)
    {
        $this->authorize('brand-edit');

        $validatedData = $request->validate([
            'name' => 'required|string|max:255|unique:brands,name,' . $brand->id,
            'description' => 'required|string|max:255',
            'is_published' => 'required|string|max:255',
        ]);

        if ($request->hasFile('main_image')) {

            $validatedData = $request->validate([
                'main_image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
            ]);

            $file = $request->file('main_image');

            $file_name = time() . '_' . '_brand_' . $request->file('main_image')->getClientOriginalName();
            $file_path = 'uploads/' . $file_name;

            // Create and process the image using the new syntax
            $image = $this->imageManager->read($file)->coverDown(800, 800)->toJpeg(85);

            // Store the optimized image
            Storage::disk('public')->put($file_path, $image);
            //$file_path = $request->file('main_image')->storeAs('uploads', $file_name, 'public');

            $validatedData['main_image_path'] = $file_path;
        }

        $brand->update($validatedData);

        return new BrandResource($brand);
    }

    public function destroy(Brand $brand)
    {
        $this->authorize('brand-delete');
        $brand->delete();

        return response()->noContent();
    }

    public function getList()
    {
        return BrandResource::collection(Brand::all());
    }
}
