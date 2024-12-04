<?php
    namespace App\Http\Controllers\Api;

    use App\Http\Controllers\Controller;
    use Illuminate\Support\Facades\Storage;
    use App\Models\SolutionImage;
    use Illuminate\Http\Request;

    class SolutionImagesController extends Controller
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
            $productImage = SolutionImage::findOrFail($id);

            if (Storage::exists($productImage->name)) {
                Storage::delete($productImage->name);
            }

            $productImage->delete();

            return response()->json(['message' => 'Product image deleted successfully']);
        }
    }

?>