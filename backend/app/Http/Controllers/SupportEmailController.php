<?php

namespace App\Http\Controllers;

use App\Http\Resources\SupportEmailResource;
use App\Models\SupportEmail;
use Illuminate\Http\Request;

class SupportEmailController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $supportEmail = SupportEmail::latest()->paginate(10);

        return SupportEmailResource::collection($supportEmail);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $this->authorize("support-email-create");

        $attributes = $request->validate(
            [
                "email" => "required|email",
            ]
        );

        $supportEmail =  SupportEmail::create($attributes);

        return new SupportEmailResource($supportEmail);
    }

    /**
     * Display the specified resource.
     */
    public function show(SupportEmail $supportEmail)
    {
        $this->authorize("support-email-view");

        return new SupportEmailResource($supportEmail);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, SupportEmail $supportEmail)
    {
        $this->authorize("support-email-edit");

        $attributes = $request->validate(
            [
                "email" => "required|email",
            ]
        );
        $supportEmail = SupportEmail::findOrFail($supportEmail->id);
        $supportEmail->update($attributes);

        return new SupportEmailResource($supportEmail);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, SupportEmail $supportEmail)
    {
        $this->authorize("support-email-edit");

        $attributes = $request->validate(
            [
                "email" => "required|email",
            ]
        );
        $supportEmail = SupportEmail::findOrFail($supportEmail->id);
        $supportEmail->update($attributes);

        return new SupportEmailResource($supportEmail);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SupportEmail $supportEmail)
    {
        $this->authorize("support-email-delete");

        $supportEmail->delete();

        return response()->noContent();
    }
}
