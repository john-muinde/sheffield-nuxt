<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreNewsRequest;
use App\Http\Resources\NewsResource;
use Intervention\Image\Laravel\Facades\Image;
use Illuminate\Support\Facades\Storage;
use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class NewsController extends Controller
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
        $news = News::when(request('search_id'), function ($query) {
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
        return NewsResource::collection($news);
    }

    public function store(StoreNewsRequest $request)
    {
        $this->authorize('product-create');

        $validatedData = $this->validateRequest($request);
        $validatedData['created_by'] = auth()->user()->id;

        $news = News::create($validatedData);

        return new NewsResource($news);
    }

    public function update(News $news, StoreNewsRequest $request)
    {
        $this->authorize('product-edit');

        $validatedData = $this->validateRequest($request);

        $news->update($validatedData);

        return new NewsResource($news);
    }

    private function validateRequest(Request $request)
    {
        $rules = [
            'name' => 'required|string|max:255|unique:news,name,' . $request->id,
            'description' => 'required|string',
            'type' => 'required|in:Image,Video',
            'main_image_path' => 'nullable|image|mimes:jpeg,png,jpg|max:10240',
            'file_path' => 'nullable',
            'url' => 'nullable|url',
            'is_published' => 'required|boolean',
        ];

        if ($request->type === 'Image') {
            $rules['file_path'] = 'required_without:main_image_path|image|mimes:jpeg,png,jpg|max:10240';
        } elseif ($request->type === 'Video') {
            $rules['file_path'] = 'required|url';
        }

        $validatedData = $request->validate($rules);

        return $this->handleRequest($request, $validatedData);
    }

    private function handleRequest(Request $request, array $validatedData)
    {
        if ($request->hasFile('main_image_path')) {
            $file = $request->file('main_image_path');
            $file_name = time() . '_news_' . $file->getClientOriginalName();
            $file_path = 'uploads/' . $file_name;

            // Create and process the image using the new syntax
            $image = $this->imageManager->read($file)->coverDown(800, 800)->toJpeg(85);

            // Store the optimized image
            Storage::disk('public')->put($file_path, $image);

            $validatedData['main_image_path'] = $file_path;
        }

        if ($request->hasFile('file_path') && $request->type === 'Image') {
            $file = $request->file('file_path');
            $file_name = time() . '_' . $file->getClientOriginalName();
            $file_path = $file->storeAs('uploads', $file_name, 'public');
            $validatedData['file_path'] = $file_path;
        }

        return $validatedData;
    }



    public function show(News $news)
    {
        $this->authorize('product-edit');
        return new NewsResource($news);
    }


    public function destroy(News $news)
    {
        $this->authorize('product-delete');
        $news->delete();

        return response()->noContent();
    }

    public function getList()
    {
        return NewsResource::collection(News::all());
    }
}
