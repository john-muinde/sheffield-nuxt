<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreEventRequest;
use App\Http\Resources\EventResource;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Intervention\Image\Laravel\Facades\Image;
use Illuminate\Support\Facades\Storage;

class EventController extends Controller
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
        $events = Event::when(request('search_id'), function ($query) {
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
        return EventResource::collection($events);
    }

    public function store(StoreEventRequest $request)
    {
        $this->authorize('event-create');

        $validatedData = $request->validate([
            'name' => 'required|string|max:255|unique:events',
            'description' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'url' => 'required|url',
            'location' => 'required|string|max:255',
            'main_image_path' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'is_published' => 'required|boolean',
        ]);

        $validatedData['created_by'] = auth()->user()->id;

        if ($request->hasFile('main_image_path')) {

            $request->validate([
                'main_image_path' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);

            $file = $request->file('main_image_path');

            $file_name = time() . '_' . '_event_' . $request->file('main_image_path')->getClientOriginalName();
            $file_path = 'uploads/' . $file_name;

            // Create and process the image using the new syntax
            $image = $this->imageManager->read($file)->coverDown(800, 800)->toJpeg(85);

            // Store the optimized image
            Storage::disk('public')->put($file_path, $image);

            $validatedData['main_image_path'] = $file_path;
        }

        $event = Event::create($validatedData);

        return new EventResource($event);
    }

    public function show(Event $event)
    {
        $this->authorize('event-edit');
        return new EventResource($event);
    }

    public function update(Request $request, $id)
    {
        $this->authorize('event-edit');

        $validatedData = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:events,name,' . $id],
            'description' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'url' => 'required|url',
            'location' => 'required|string|max:255',
            'is_published' => 'required|boolean',
        ]);

        $event = Event::findOrFail($id);

        if ($request->hasFile('main_image_path')) {

            $request->validate([
                'main_image_path' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);

            $file = $request->file('main_image_path');

            $file_name = time() . '_' . '_event_' . $request->file('main_image_path')->getClientOriginalName();
            $file_path = 'uploads/' . $file_name;

            // Create and process the image using the new syntax
            $image = $this->imageManager->read($file)->coverDown(800, 800)->toJpeg(85);

            // Store the optimized image
            Storage::disk('public')->put($file_path, $image);

            $validatedData['main_image_path'] = $file_path;
        }

        $event->update($validatedData);

        return new EventResource($event);
    }

    public function destroy(Event $event)
    {
        $this->authorize('event-delete');
        $event->delete();

        return response()->noContent();
    }

    public function getList()
    {
        return EventResource::collection(Event::all());
    }

    public function getEvents()
    {
        $events = Event::where('end_date', '>=', now())->get();

        return response()->json($events);
    }
}
