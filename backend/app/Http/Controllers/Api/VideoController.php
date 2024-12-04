<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreVideoRequest;
use App\Http\Requests\UpdateVideoRequest;
use App\Http\Resources\VideoResource;
use Illuminate\Support\Facades\Storage;
use App\Models\Video;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class VideoController extends Controller
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
        $videos = Video::when(request('search_id'), function ($query) {
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
        return VideoResource::collection($videos);
    }

    public function show(Video $video)
    {
        $this->authorize('blog-edit');
        return new VideoResource($video);
    }

    public function store(StoreVideoRequest $request)
    {
        $this->authorize('blog-create');

        $validatedData = $request->validate([
            'name' => 'required|string|max:255|unique:videos',
            'type' => 'required|string|max:255|in:Upload,Youtube Url',
            'is_published' => 'required|string|max:255',
            'shown_in_about_us' => 'required|string|max:255',
            'main_image_path' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'file_path' => [
                'nullable',
                'required_if:type,Upload',
                'max:20480'
            ],
            'video_url' => [
                'nullable',
                'required_if:type,Youtube Url',
                'url',
                'regex:/^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/'
            ]
        ], [
            'type.in' => 'The type must be either Upload or Youtube Url.',
            'file_path.required_if' => 'The file path is required when the type is Upload.',
            'file_path.mimes' => 'The file path must be a file of type: mp4, mov, avi, wmv.',
            'video_url.required_if' => 'The video URL is required when the type is Youtube Url.',
            'video_url.url' => 'The video URL must be a valid URL.',
            'video_url.format' => 'The video URL must be a valid YouTube URL.'
        ]);

        $validatedData['created_by'] = auth()->user()->id;

        if ($request->hasFile('main_image_path')) {
            $file = $request->file('main_image_path');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $filePath = 'uploads/' . $fileName;

            // Create and process the image using the new syntax
            $image = $this->imageManager->read($file)->coverDown(800, 800)->toJpeg(85);

            // Store the processed image
            Storage::disk('public')->put($filePath, $image);

            $validatedData['main_image_path'] = $filePath;
        }

        if ($request->hasFile('file_path') || $request->input('type') == 'Upload') {
            $request->validate([
                'file_path' =>  'required|mimes:mp4,mov,avi,wmv'
            ]);

            $file_name = time() . '_' . $request->file('file_path')->getClientOriginalName();
            $file_path = $request->file('file_path')->storeAs('uploads', $file_name, 'public');
            $validatedData['file_path'] = $file_path;
        }

        $video = Video::create($validatedData);
        return new VideoResource($video);
    }

    public function update(Video $video, UpdateVideoRequest $request)
    {
        $this->authorize('blog-edit');

        Log::info($request->all());

        $validatedData = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:videos,name,' . $video->id],
            'type' => [
                'required',
                'string',
                'max:255',
                'in:Upload,Youtube Url'
            ],
            'is_published' => 'required|string|max:255',
            'shown_in_about_us' => 'required|string|max:255',
            'file_path' => [
                'nullable',
            ],
            'video_url' => [
                'nullable',
            ]
        ], [
            'type.in' => 'The type must be either Upload or Youtube Url.',
            'file_path.required_if' => 'The file path is required when the type is Upload.',
            'file_path.mimes' => 'The file path must be a file of type: mp4, mov, avi, wmv.',
            'file_path.max' => 'The file path must not exceed 20MB.',
            'video_url.required_if' => 'The video URL is required when the type is Youtube Url.',
            'video_url.url' => 'The video URL must be a valid URL.',
            'video_url.regex' => 'The video URL must be a valid YouTube URL.',
        ]);

        if ($request->hasFile('main_image_path')) {
            $request->validate([
                'main_image_path' => [
                    'required',
                    'image',
                    'mimes:jpeg,png,jpg,gif,svg',
                    'max:2048'
                ]
            ]);

            $file = $request->file('main_image_path');

            $file_name = time() . '_' . '_video_' . $request->file('main_image_path')->getClientOriginalName();
            $file_path = 'uploads/' . $file_name;

            // Resize and optimize the image
            $image = $this->imageManager->read($file)->coverDown(800, 800)->toJpeg(85);

            // Store the optimized image
            Storage::disk('public')->put($file_path, $image);

            $validatedData['main_image_path'] = $file_path;
        }

        if ($request->hasFile('file_path')) {
            $request->validate([
                'file_path' =>  'required|mimes:mp4,mov,avi,wmv',
                'max:20480'
            ]);

            $file_name = time() . '_' . $request->file('file_path')->getClientOriginalName();
            $file_path = $request->file('file_path')->storeAs('uploads', $file_name, 'public');
            $validatedData['file_path'] = $file_path;
        } elseif ($validatedData['type'] == 'Upload') {
            $validatedData['file_path'] = null;
        }

        if ($request->has('video_url')) {
            $request->validate([
                'video_url' => [
                    'url',
                    'regex:/^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/',
                    'required_if:type,Youtube Url'
                ]
            ]);

            $validatedData['video_url'] = $request->input('video_url');
        } elseif ($validatedData['type'] == 'Youtube Url') {
            $validatedData['video_url'] = null;
        }

        $video->update($validatedData);

        return new VideoResource($video);
    }

    public function destroy(Video $video)
    {
        $this->authorize('blog-delete');
        $video->delete();

        return response()->noContent();
    }

    public function getList()
    {
        return VideoResource::collection(Video::all());
    }

    public function getVideos()
    {
        $videos = Video::get();

        return response()->json($videos);
    }

    public function getVideo()
    {

        $video_id = request('video_id', 1);

        $video = Video::find($video_id);

        return new VideoResource($video);
    }
}
