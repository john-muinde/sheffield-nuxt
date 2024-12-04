<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCareerRequest;
use App\Http\Resources\CareerResource;
use App\Models\Career;

class CareerController extends Controller
{
    public function index()
    {
        $orderColumn = request('order_column', 'created_at');
        if (!in_array($orderColumn, ['id', 'title', 'created_at'])) {
            $orderColumn = 'created_at';
        }
        $orderDirection = request('order_direction', 'desc');
        if (!in_array($orderDirection, ['asc', 'desc'])) {
            $orderDirection = 'desc';
        }
        $careers = Career::when(request('search_id'), function ($query) {
            $query->where('id', request('search_id'));
        })
            ->when(request('search_title'), function ($query) {
                $query->where('title', 'like', '%' . request('search_title') . '%');
            })
            ->when(request('search_global'), function ($query) {
                $query->where(function ($q) {
                    $q->where('id', request('search_global'))
                        ->orWhere('title', 'like', '%' . request('search_global') . '%');
                });
            })
            ->orderBy($orderColumn, $orderDirection)
            ->paginate(50);
        return CareerResource::collection($careers);
    }

    public function store(StoreCareerRequest $request)
    {
        $this->authorize('career-create');

        // Check if the career with the same title already exists
        $existingCareer = Career::where('title', $request->title)->first();
        if ($existingCareer) {
            return response()->json(['errors' => ['title' => ['Career with the same title already exists.']]], 409);
        }

        $validatedData = $request->validated();
        $validatedData['created_by'] = auth()->user()->id;

        if ($request->hasFile('document')) {

            $file_name = time() . '_' . $request->file('document')->getClientOriginalName();
            $file_path = $request->file('document')->storeAs('uploads', $file_name, 'public');
            $validatedData['document_path'] = $file_path;
        }

        $career = Career::create($validatedData);

        return new CareerResource($career);
    }

    public function show(Career $career)
    {
        $this->authorize('career-edit');
        return new CareerResource($career);
    }

    public function update(Career $career, StoreCareerRequest $request)
    {
        $this->authorize('career-edit');

        // Check if the career with the same title already exists (excluding the current career)
        $existingCareer = Career::where('title', $request->title)
            ->where('id', '!=', $career->id)
            ->first();
        if ($existingCareer) {
            return response()->json(['errors' => ['title' => ['Career with the same title already exists.']]], 409);
        }
        $validatedData = $request->validated();

        if ($request->hasFile('document')) {

            $file_name = time() . '_' . $request->file('document')->getClientOriginalName();
            $file_path = $request->file('document')->storeAs('uploads', $file_name, 'public');
            $validatedData['document_path'] = $file_path;
        }

        $career->update($validatedData);

        return new CareerResource($career);
    }

    public function destroy(Career $career)
    {
        $this->authorize('career-delete');
        $career->delete();

        return response()->noContent();
    }

    public function getList()
    {
        return CareerResource::collection(Career::all());
    }
}