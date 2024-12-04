<?php
    namespace App\Http\Controllers\Api;

    use App\Http\Controllers\Controller;
    use Illuminate\Support\Facades\Storage;
    use App\Models\CsrImage;
    use Illuminate\Http\Request;

    class CsrImagesController extends Controller
    {
        // Other controller methods (index, store, update)...

        /**
         * Remove the specified csr image from storage.
         *
         * @param  int  $id
         * @return \Illuminate\Http\Response
         */
        public function destroy($id)
        {
            $CsrImage = CsrImage::findOrFail($id);

            if (Storage::exists($CsrImage->name)) {
                Storage::delete($CsrImage->name);
            }

            $CsrImage->delete();

            return response()->json(['message' => 'Csr image deleted successfully']);
        }
    }

?>