<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use App\Models\GalleryImage;
use Illuminate\Http\Request;

class GalleryImagesController extends Controller
{
    // Other controller methods (index, store, update)...

    /**
     * Remove the specified gallery image from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $GalleryImage = GalleryImage::findOrFail($id);

        if (Storage::exists($GalleryImage->name)) {
            Storage::delete($GalleryImage->name);
        }

        $GalleryImage->delete();

        return response()->json(['message' => 'Gallery image deleted successfully']);
    }
}
