<?php
    namespace App\Http\Controllers\Api;

    use App\Http\Controllers\Controller;
    use Illuminate\Support\Facades\Storage;
    use App\Models\ShowroomImage;
    use Illuminate\Http\Request;

    class ShowroomImagesController extends Controller
    {
        // Other controller methods (index, store, update)...

        /**
         * Remove the specified showroom image from storage.
         *
         * @param  int  $id
         * @return \Illuminate\Http\Response
         */
        public function destroy($id)
        {
            $showroomImage = ShowroomImage::findOrFail($id);

            if (Storage::exists($showroomImage->name)) {
                Storage::delete($showroomImage->name);
            }

            $showroomImage->delete();

            return response()->json(['message' => 'Showroom image deleted successfully']);
        }
    }

?>
