<?php
    namespace App\Http\Controllers\Api;

    use App\Http\Controllers\Controller;
    use Illuminate\Support\Facades\Storage;
    use App\Models\ProjectImage;
    use Illuminate\Http\Request;

    class ProjectImagesController extends Controller
    {
        // Other controller methods (index, store, update)...

        /**
         * Remove the specified product image from storage.
         *
         * @param  int  $id
         * @return \Illuminate\Http\Response
         */
        public function destroy($id)
        {
            $projectImage = ProjectImage::findOrFail($id);

            if (Storage::exists($projectImage->name)) {
                Storage::delete($projectImage->name);
            }

            $projectImage->delete();

            return response()->json(['message' => 'Project image deleted successfully']);
        }
    }

?>
