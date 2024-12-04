<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePublicationRequest;
use App\Http\Requests\UpdatePublicationRequest;
use App\Http\Resources\PublicationResource;
use Intervention\Image\Laravel\Facades\Image;
use Illuminate\Support\Facades\Storage;
use App\Models\Publication;
use Spatie\PdfToImage\Pdf;
use Illuminate\Support\Facades\Log;

class PublicationController extends Controller
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
        $publications = Publication::when(request('search_id'), function ($query) {
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
        return PublicationResource::collection($publications);
    }

    public function store(StorePublicationRequest $request)
    {
        $this->authorize('blog-create');

        $validatedData = $request->validate([
            'name' => 'required|max:255|unique:publications',
            'content' => 'required|max:255',
            'type' => 'required|max:255|in:Newsletter,Brochures',
            'publication_file' => 'required|file|mimes:pdf',
            'thumbnail_path' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'is_published' => 'required',
        ]);

        $validatedData['created_by'] = auth()->user()->id;

        if ($request->hasFile('publication_file')) {
            $file = $request->file('publication_file');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $filePath = $file->storeAs('uploads', $fileName, 'public');
            $validatedData['publication_file'] = $filePath;
        }

        if ($request->hasFile('thumbnail_path')) {
            $request->validate([
                'thumbnail_path' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
            ]);

            // Store new files
            $file = $request->file('thumbnail_path');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $filePath = $file->storeAs('uploads/thumbs', $fileName, 'public');
            $validatedData['thumbnail_path'] = $filePath;
        }

        if ($request->hasFile('main_image_path')) {
            $request->validate([
                'main_image_path' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);

            $file_name = time() . '_' . $request->file('main_image_path')->getClientOriginalName();
            $file_path = $request->file('main_image_path')->storeAs('uploads', $file_name, 'public');
            $validatedData['main_image_path'] = $file_path;
        }

        $publication = Publication::create($validatedData);

        return new PublicationResource($publication);
    }

    public function show(Publication $publication)
    {
        $this->authorize('blog-edit');
        return new PublicationResource($publication);
    }

    public function update(Publication $publication, UpdatePublicationRequest $request)
    {
        $this->authorize('blog-edit');

        $validatedData = $request->validate([
            'name' => 'required|max:255|unique:publications,name,' . $publication->id,
            'content' => 'required|max:255',
            'type' => 'required|max:255|in:Newsletter,Brochures',
            'is_published' => 'required',
        ]);

        if ($request->hasFile('publication_file')) {
            $request->validate([
                'publication_file' => 'required|file|mimes:pdf',
            ]);
            // Delete old files
            if ($publication->publication_file) {
                Storage::disk('public')->delete($publication->publication_file);
            }
            if ($publication->thumbnail_path) {
                Storage::disk('public')->delete($publication->thumbnail_path);
            }

            // Store new files
            $file = $request->file('publication_file');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $filePath = $file->storeAs('uploads', $fileName, 'public');
            $validatedData['publication_file'] = $filePath;
        }

        if ($request->hasFile('thumbnail_path')) {
            $request->validate([
                'thumbnail_path' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
            ]);

            if ($publication->thumbnail_path) {
                Storage::disk('public')->delete($publication->thumbnail_path);
            }

            // Store new files
            $file = $request->file('thumbnail_path');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $filePath = $file->storeAs('uploads/thumbs', $fileName, 'public');
            $validatedData['thumbnail_path'] = $filePath;
        }

        if ($request->hasFile('main_image_path')) {
            $request->validate([
                'main_image_path' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);

            // Delete old main image
            if ($publication->main_image_path) {
                Storage::disk('public')->delete($publication->main_image_path);
            }

            $file_name = time() . '_' . $request->file('main_image_path')->getClientOriginalName();
            $file_path = $request->file('main_image_path')->storeAs('uploads', $file_name, 'public');
            $validatedData['main_image_path'] = $file_path;
        }

        $publication->update($validatedData);

        return new PublicationResource($publication);
    }


    public function destroy(Publication $publication)
    {
        $this->authorize('blog-delete');

        // Delete associated files
        if ($publication->publication_file) {
            Storage::disk('public')->delete($publication->publication_file);
        }
        if ($publication->thumbnail_path) {
            Storage::disk('public')->delete($publication->thumbnail_path);
        }
        if ($publication->main_image_path) {
            Storage::disk('public')->delete($publication->main_image_path);
        }

        $publication->delete();

        return response()->noContent();
    }

    public function getList()
    {
        return PublicationResource::collection(Publication::all());
    }

    public function getPublications()
    {
        $publications = Publication::get();

        return response()->json($publications);
    }

    public function getPublication()
    {

        $publication_id = request('publication_id', 1);

        $publication = Publication::find($publication_id);

        return new PublicationResource($publication);
    }
}
