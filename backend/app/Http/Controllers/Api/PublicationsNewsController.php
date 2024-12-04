<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreNewsRequest;
use App\Http\Resources\NewsResource;
use Intervention\Image\Laravel\Facades\Image;
use Illuminate\Support\Facades\Storage;
use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Spatie\PdfToImage\Pdf;

class PublicationsNewsController extends Controller
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
        $news = News::when(request('search_id'), function ($query) {
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
        return NewsResource::collection($news);
    }

    public function store(StoreNewsRequest $request)
    {
        $this->authorize('product-create');

        $validatedData = $this->validateRequest($request);

        $request->validate([
            'file_path' => 'required|file|mimes:pdf,doc,docx,xls,xlsx,ppt,pptx',
        ]);

        $validatedData['created_by'] = auth()->user()->id;

        $news = News::create($validatedData);

        return new NewsResource($news);
    }

    public function update(News $news, StoreNewsRequest $request)
    {
        $this->authorize('product-edit');

        $validatedData = $this->validateRequest($request);

        $request->validate([
            'file_path' => 'nullable|file|mimes:pdf,doc,docx,xls,xlsx,ppt,pptx',
        ]);

        $news->update($validatedData);

        return new NewsResource($news);
    }

    private function validateRequest(Request $request)
    {
        $rules = [
            'name' => 'required|string|max:255|unique:news,name,' . $request->id,
            'description' => 'required|string',
            'type' => 'required|in:Image,Video',
            'main_image_path' => 'nullable|image|mimes:jpeg,png,jpg|max:10240',
            'file_path' => 'nullable',
            'url' => 'nullable|url',
            'is_published' => 'required|boolean',
        ];

        if ($request->type === 'Image') {
            $rules['file_path'] = 'required_without:main_image_path|image|mimes:jpeg,png,jpg|max:10240';
        } elseif ($request->type === 'Video') {
            $rules['file_path'] = 'required|url';
        }

        $validatedData = $request->validate($rules);

        return $this->handleRequest($request, $validatedData);
    }

    private function handleRequest(Request $request, array $validatedData)
    {
        // Handle main image
        if ($request->hasFile('main_image_path')) {
            $mainImage = $this->handleImageUpload(
                $request->file('main_image_path'),
                'news_',
                800
            );
            $validatedData['main_image_path'] = $mainImage['path'];
        }

        // Handle file upload and thumbnail generation
        if ($request->hasFile('file_path')) {
            $file = $request->file('file_path');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $filePath = $file->storeAs('uploads', $fileName, 'public');
            $validatedData['file_path'] = $filePath;

            // Generate thumbnail based on file type
            if ($request->type === 'Image') {
                $thumbnail = $this->generateImageThumbnail($file);
            } else if ($request->type === 'Document') {
                $thumbnail = $this->generateDocumentThumbnail($file);
            }

            if ($thumbnail) {
                $validatedData['thumbnail_path'] = $thumbnail;
            }

            // Clean up old thumbnail if updating
            if ($request->id) {
                $this->cleanupOldFiles($request->id, ['thumbnail_path']);
            }

            Log::info('data', $validatedData);
        }

        return $validatedData;
    }

    private function generateImageThumbnail($file)
    {
        try {
            $fileName = time() . '_thumb_' . $file->getClientOriginalName();
            $thumbnailPath = 'uploads/thumbs/' . $fileName;

            // Create thumbs directory if it doesn't exist
            if (!Storage::disk('public')->exists('uploads/thumbs')) {
                Storage::disk('public')->makeDirectory('uploads/thumbs');
            }

            // Generate thumbnail
            $thumbnail = Image::make($file)
                ->resize(150, null, function ($constraint) {
                    $constraint->aspectRatio();
                    $constraint->upsize();
                })
                ->crop(150, 150)
                ->encode('jpg', 80);

            // Store the thumbnail
            Storage::disk('public')->put($thumbnailPath, $thumbnail);

            return $thumbnailPath;
        } catch (\Exception $e) {
            Log::error('Image thumbnail generation failed: ' . $e->getMessage());
            return null;
        }
    }

    private function generateDocumentThumbnail($file)
    {
        try {
            $extension = strtolower($file->getClientOriginalExtension());
            $fileName = time() . '_thumb_' . pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME) . '.jpg';
            $thumbnailPath = 'uploads/thumbs/' . $fileName;

            // Create thumbs directory if it doesn't exist
            if (!Storage::disk('public')->exists('uploads/thumbs')) {
                Storage::disk('public')->makeDirectory('uploads/thumbs');
            }

            // Handle different document types
            if ($extension === 'pdf') {
                return $this->generatePdfThumbnail($file, $thumbnailPath);
            } else if (in_array($extension, ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'])) {
                return $this->generateOfficeThumbnail($file, $thumbnailPath);
            }

            return null;
        } catch (\Exception $e) {
            Log::error('Document thumbnail generation failed: ' . $e->getMessage());
            return null;
        }
    }

    private function generatePdfThumbnail($file, $thumbnailPath)
    {
        // Store the PDF temporarily
        $tempPath = storage_path('app/temp/' . uniqid() . '.pdf');
        copy($file->getRealPath(), $tempPath);

        try {
            // Convert first page of PDF to image
            $pdf = new Pdf($tempPath);
            $pdf->setPage(1)
                ->setOutputFormat('jpg')
                ->saveImage(storage_path('app/public/' . $thumbnailPath));

            // Resize the generated image to thumbnail size
            $thumbnail = Image::make(storage_path('app/public/' . $thumbnailPath))
                ->resize(150, null, function ($constraint) {
                    $constraint->aspectRatio();
                    $constraint->upsize();
                })
                ->crop(150, 150)
                ->save();

            // Clean up temp file
            unlink($tempPath);

            return $thumbnailPath;
        } catch (\Exception $e) {
            Log::error('PDF thumbnail generation failed: ' . $e->getMessage());
            if (file_exists($tempPath)) {
                unlink($tempPath);
            }
            return null;
        }
    }

    private function generateOfficeThumbnail($file, $thumbnailPath)
    {
        try {
            // Create a default thumbnail for Office documents
            $defaultThumb = Image::canvas(150, 150, '#f5f5f5')
                ->text(strtoupper(pathinfo($file->getClientOriginalName(), PATHINFO_EXTENSION)), 75, 75, function ($font) {
                    $font->file(public_path('fonts/Arial.ttf'));
                    $font->size(24);
                    $font->color('#333333');
                    $font->align('center');
                    $font->valign('middle');
                });

            // Store the thumbnail
            Storage::disk('public')->put($thumbnailPath, $defaultThumb->encode('jpg', 80));

            return $thumbnailPath;
        } catch (\Exception $e) {
            Log::error('Office document thumbnail generation failed: ' . $e->getMessage());
            return null;
        }
    }

    private function handleImageUpload($file, $prefix, $maxWidth)
    {
        $fileName = time() . '_' . $prefix . $file->getClientOriginalName();
        $filePath = 'uploads/' . $fileName;

        // Resize and optimize the image
        $image = Image::make($file)->resize($maxWidth, null, function ($constraint) {
            $constraint->aspectRatio();
            $constraint->upsize();
        })->encode('jpg', 85);

        // Store the optimized image
        Storage::disk('public')->put($filePath, $image);

        return [
            'path' => $filePath,
            'image' => $image
        ];
    }


    private function cleanupOldFiles($newsId, array $fields)
    {
        try {
            $news = News::find($newsId);
            if (!$news) return;

            foreach ($fields as $field) {
                if (!empty($news->$field)) {
                    Storage::disk('public')->delete($news->$field);
                }
            }
        } catch (\Exception $e) {
            Log::error('File cleanup failed: ' . $e->getMessage());
        }
    }

    public function show(News $news)
    {
        $this->authorize('product-edit');
        return new NewsResource($news);
    }


    public function destroy(News $news)
    {
        $this->authorize('product-delete');

        // Clean up all associated files
        $this->cleanupOldFiles($news->id, ['main_image_path', 'file_path', 'thumbnail_path']);

        $news->delete();

        return response()->noContent();
    }

    public function getList()
    {
        return NewsResource::collection(News::all());
    }
}
