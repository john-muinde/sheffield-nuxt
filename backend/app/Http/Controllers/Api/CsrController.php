<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCsrRequest;
use App\Http\Requests\UpdateCsrRequest;
use App\Http\Resources\CsrResource;
use Intervention\Image\Laravel\Facades\Image;
use Illuminate\Support\Facades\Storage;
use App\Models\Csr;
use App\Models\CsrImage;
use Illuminate\Http\Request;

class CsrController extends Controller
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
        $csrs = Csr::when(request('search_id'), function ($query) {
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
        return CsrResource::collection($csrs);
    }

    public function store(StoreCsrRequest $request)
    {
        $this->authorize('csr-create');

        //dd($request);

        // Check if the csr with the same name already exists
        $existingCsr = Csr::where('name', $request->name)->first();
        if ($existingCsr) {
            return response()->json(['errors' => ['name' => ['Csr with the same name already exists.']]], 409);
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


        $csr = Csr::create($validatedData);



        if ($request->hasFile('csr_gallery')) {

            $csrGallery = collect($request->file('csr_gallery'))->map(function ($file) {

                $file_name = time() . '_' . '_gallery_' . $file->getClientOriginalName();
                $file_path = 'uploads/' . $file_name;

                // Create and process the image using the new syntax
                $image = $this->imageManager->read($file)->coverDown(800, 800)->toJpeg(85);

                // Store the optimized image
                Storage::disk('public')->put($file_path, $image);


                return $file_path;
            })->toArray();


            foreach ($csrGallery as $imagePath) {
                $csr->csrImages()->create([
                    'name' => $imagePath,
                ]);
            }
        }

        return new CsrResource($csr);
    }

    public function show(Csr $csr)
    {
        $this->authorize('csr-edit');
        return new CsrResource($csr);
    }

    public function update(Csr $csr, UpdateCsrRequest $request)
    {
        $this->authorize('csr-edit');

        $validatedData = $request->validated();


        // Check if the csr with the same name already exists (excluding the current csr)
        $existingCsr = Csr::where('name', $request->name)
            // ->where('brand', '=', $csr->brand)
            ->where('id', '!=', $csr->id)
            ->first();
        if ($existingCsr) {
            return response()->json(['errors' => ['name' => ['Csr with the same name already exists.']]], 409);
        }

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

        if ($request->hasFile('document')) {

            $file_name = time() . '_' . $request->file('document')->getClientOriginalName();
            $file_path = $request->file('document')->storeAs('uploads', $file_name, 'public');
            $validatedData['document_path'] = $file_path;
        }





        $csr->update($validatedData);




        if ($request->hasFile('csr_gallery')) {

            $csrGallery = collect($request->file('csr_gallery'))->map(function ($file) {

                $file_name = time() . '_' . '_gallery_' . $file->getClientOriginalName();
                $file_path = 'uploads/' . $file_name;

                // Create and process the image using the new syntax
                $image = $this->imageManager->read($file)->coverDown(800, 800)->toJpeg(85);

                // Store the optimized image
                Storage::disk('public')->put($file_path, $image);


                return $file_path;
            })->toArray();


            foreach ($csrGallery as $imagePath) {
                $csr->csrImages()->create([
                    'name' => $imagePath,
                ]);
            }
        }


        //dd("test");

        return new CsrResource($csr);
    }

    public function destroy(Csr $csr)
    {
        $this->authorize('csr-delete');
        $csr->delete();

        return response()->noContent();
    }

    public function getList()
    {
        return CsrResource::collection(Csr::all());
    }

    public function getCsrs()
    {
        $perPage = request('per_page', 12);
        $csrs = Csr::with('showroomBrand')->paginate($perPage);


        return response()->json($csrs);
    }
}
