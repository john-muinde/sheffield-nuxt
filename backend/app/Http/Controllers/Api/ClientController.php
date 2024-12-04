<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreClientRequest;
use App\Http\Resources\ClientResource;
use Intervention\Image\Laravel\Facades\Image;
use Illuminate\Support\Facades\Storage;
use App\Models\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
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
        $clients = Client::when(request('search_id'), function ($query) {
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
            ->paginate(5000);
        return ClientResource::collection($clients);
    }



    public function store(StoreClientRequest $request)
    {
        $this->authorize('client-create');

        // Define validation rules
        $validatedData = $request->validate([
            'name' => 'required|min:3|unique:clients',
            'phone' => 'required|min:3',
            'email' => 'required|min:3',
            'address' => 'required|min:3',
            'description' => 'required|min:3',
            'is_published' => 'required',
            'main_image_path' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $validatedData['created_by'] = auth()->user()->id;

        if ($request->hasFile('main_image_path')) {
            $file = $request->file('main_image_path');
            $file_name = time() . '_client_' . $file->getClientOriginalName();
            $file_path = 'uploads/' . $file_name;

            // Create and process the image using the new syntax
            $image = $this->imageManager->read($file)->coverDown(800, 800)->toJpeg(85);

            // Store the optimized image
            Storage::disk('public')->put($file_path, $image);

            $validatedData['main_image_path'] = $file_path;
        }

        $client = Client::create($validatedData);

        return new ClientResource($client);
    }

    public function update(Client $client, StoreClientRequest $request)
    {
        $this->authorize('client-edit');

        // Define validation rules
        $validatedData = $request->validate([
            'name' => 'required|min:3|unique:clients,name,' . $client->id,
            'phone' => 'required|min:3',
            'email' => 'required|min:3',
            'address' => 'required|min:3',
            'description' => 'required|min:3',
            'is_published' => 'required',
            'main_image_path' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($request->hasFile('main_image_path')) {
            $file = $request->file('main_image_path');
            $file_name = time() . '_client_' . $file->getClientOriginalName();
            $file_path = 'uploads/' . $file_name;

            // Create and process the image using the new syntax
            $image = $this->imageManager->read($file)->coverDown(800, 800)->toJpeg(85);
            // Store the optimized image
            Storage::disk('public')->put($file_path, $image);

            $validatedData['main_image_path'] = $file_path;
        }

        $client->update($validatedData);

        return new ClientResource($client);
    }

    public function show(Client $client)
    {
        $this->authorize('client-edit');
        return new ClientResource($client);
    }

    public function destroy(Client $client)
    {
        $this->authorize('client-delete');
        $client->delete();

        return response()->noContent();
    }

    public function getList()
    {
        return ClientResource::collection(Client::all());
    }


    public function getClients()
    {
        $clients = Client::get();

        return $clients;
    }
}
