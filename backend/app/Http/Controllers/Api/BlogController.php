<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBlogRequest;
use App\Http\Requests\UpdateBlogRequest;
use App\Http\Resources\BlogResource;
use App\Http\Resources\GalleryResource;
use Intervention\Image\Laravel\Facades\Image;
use Illuminate\Support\Facades\Storage;
use App\Models\Blog;
use App\Models\BlogImage;
use App\Models\BlogCategory;
use Illuminate\Http\Request;

use App\Models\Publication;
use App\Models\Video;
use App\Models\Gallery;
use App\Models\News;
use Illuminate\Support\Facades\Cache;

class BlogController extends Controller
{
    public function index()
    {
        $orderColumn = request('order_column', 'created_at');
        $allowedColumns = ['id', 'name', 'created_at'];
        $orderColumn = in_array($orderColumn, $allowedColumns) ? $orderColumn : 'created_at';

        $orderDirection = request('order_direction', 'desc');
        $orderDirection = in_array($orderDirection, ['asc', 'desc']) ? $orderDirection : 'desc';

        $cacheKey = 'blogs_' . md5(json_encode(request()->all()));

        $blogs = Cache::remember($cacheKey, now()->addMinutes(10), function () use ($orderColumn, $orderDirection) {
            return Blog::when(request('search_id'), function ($query) {
                $query->where('id', request('search_id'));
            })
                ->when(request('search_title'), function ($query) {
                    $query->where('name', 'like', '%' . request('search_title') . '%');
                })
                ->when(request('search_parent_id'), function ($query) {
                    $query->where('parent_id', 'like', '%' . request('search_parent_id') . '%');
                })
                ->when(request('search_global'), function ($query) {
                    $query->where(function ($q) {
                        $q->where('id', request('search_global'))
                            ->orWhere('name', 'like', '%' . request('search_global') . '%');
                    });
                })
                ->orderBy($orderColumn, $orderDirection)
                ->paginate(request('per_page', 20)); // Reduced pagination size
        });

        return BlogResource::collection($blogs);
    }


    public function store(StoreBlogRequest $request)
    {
        $this->authorize('blog-create');

        //dd($request);

        // Check if the blog with the same name already exists
        $existingBlog = Blog::where('name', $request->name)->first();
        if ($existingBlog) {
            return response()->json(['errors' => ['name' => ['Blog with the same name already exists.']]], 409);
        }


        $validatedData = $request->validated();
        $validatedData['created_by'] = auth()->user()->id;

        if ($request->hasFile('main_image')) {

            $file = $request->file('main_image');

            $file_name = time() . '_' . $request->file('main_image')->getClientOriginalName();
            $file_path = 'uploads/' . $file_name;

            // Create and process the image using the new syntax
            $image = $this->imageManager->read($file)->coverDown(800, 800)->toJpeg(85);

            // Store the optimized image
            Storage::disk('public')->put($file_path, $image);
            //$file_path = $request->file('main_image')->storeAs('uploads', $file_name, 'public');

            $validatedData['main_image_path'] = $file_path;
        }

        if ($request->hasFile('document')) {

            $file_name = time() . '_' . $request->file('document')->getClientOriginalName();
            $file_path = $request->file('document')->storeAs('uploads', $file_name, 'public');
            $validatedData['document_path'] = $file_path;
        }


        $blog = Blog::create($validatedData);


        if ($request->has('categories')) {
            $categories = $request->input('categories');

            $categoryIds = explode(',', $categories);

            foreach ($categoryIds as $categoryId) {

                $blog->blogCategories()->create([
                    'category_id' => $categoryId,
                ]);
            }
        }



        if ($request->hasFile('blog_gallery')) {

            $blogGallery = collect($request->file('blog_gallery'))->map(function ($file) {

                $file_name = time() . '_' . '_gallery_' . $file->getClientOriginalName();
                $file_path = 'uploads/' . $file_name;

                // Create and process the image using the new syntax
                $image = $this->imageManager->read($file)->coverDown(800, 800)->toJpeg(85);

                // Store the optimized image
                Storage::disk('public')->put($file_path, $image);


                return $file_path;
            })->toArray();


            foreach ($blogGallery as $imagePath) {
                $blog->blogImages()->create([
                    'name' => $imagePath,
                ]);
            }
        }

        return new BlogResource($blog);
    }

    public function show(Blog $blog)
    {
        $this->authorize('blog-edit');
        return new BlogResource($blog);
    }

    public function update(Blog $blog, UpdateBlogRequest $request)
    {
        $this->authorize('blog-edit');

        $validatedData = $request->validated();


        // Check if the blog with the same name already exists (excluding the current blog)
        $existingBlog = Blog::where('name', $request->name)
            ->where('id', '!=', $blog->id)
            ->first();
        if ($existingBlog) {
            return response()->json(['errors' => ['name' => ['Blog with the same name already exists.']]], 409);
        }

        if ($request->hasFile('main_image')) {

            $file = $request->file('main_image');

            $file_name = time() . '_' . $request->file('main_image')->getClientOriginalName();
            $file_path = 'uploads/' . $file_name;

            // Create and process the image using the new syntax
            $image = $this->imageManager->read($file)->coverDown(800, 800)->toJpeg(85);

            // Store the optimized image
            Storage::disk('public')->put($file_path, $image);
            //$file_path = $request->file('main_image')->storeAs('uploads', $file_name, 'public');

            $validatedData['main_image_path'] = $file_path;
        }





        $blog->update($validatedData);

        if ($request->has('categories')) {

            $blog->blogCategories()->delete();

            $categories = $request->input('categories');

            $categoryIds = explode(',', $categories);

            foreach ($categoryIds as $categoryId) {

                $blog->blogCategories()->create([
                    'category_id' => $categoryId,
                ]);
            }
        }



        if ($request->hasFile('blog_gallery')) {

            $blogGallery = collect($request->file('blog_gallery'))->map(function ($file) {

                $file_name = time() . '_' . '_gallery_' . $file->getClientOriginalName();
                $file_path = 'uploads/' . $file_name;

                // Create and process the image using the new syntax
                $image = $this->imageManager->read($file)->coverDown(800, 800)->toJpeg(85);

                // Store the optimized image
                Storage::disk('public')->put($file_path, $image);


                return $file_path;
            })->toArray();


            foreach ($blogGallery as $imagePath) {
                $blog->blogImages()->create([
                    'name' => $imagePath,
                ]);
            }
        }


        //dd("test");

        return new BlogResource($blog);
    }

    public function destroy(Blog $blog)
    {
        $this->authorize('blog-delete');
        $blog->delete();

        return response()->noContent();
    }

    public function getList()
    {
        return BlogResource::collection(Blog::all());
    }

    public function getBlogs()
    {
        $perPage = request('per_page', 5);
        $cacheKey = 'blogs_published_' . $perPage . '_page_' . request('page', 1);

        $blogs = Cache::remember($cacheKey, now()->addMinutes(10), function () use ($perPage) {
            return Blog::where('is_published', true)
                ->orderBy('created_at', 'DESC')
                ->select(['id', 'name', 'excerpt', 'main_image_path'])
                ->paginate($perPage);
        });

        return $blogs;
    }


    public function getBlog()
    {

        $blog_id = request('blog_id', 1);

        $blog = Blog::find($blog_id);

        return new BlogResource($blog);
    }


    public function getBlogDetails()
    {

        $blog_id = request('blog_id', 1);

        $blog = Blog::find($blog_id);
        $other_blogs = Blog::where('id', '!=', $blog_id)
            ->select('main_image_path', 'name', 'id')
            ->limit(15)
            ->get();


        return response()->json(['blog' => new BlogResource($blog), 'other_blogs' => $other_blogs]);
    }


    public function getBlogSidebar()
    {
        $other_blogs = Blog::orderBy('created_at', 'ASC')->get();
        return response()->json(['other_blogs' => $other_blogs]);
    }

    public function getMediaCenter()
    {

        $blogs = Blog::orderBy('created_at', 'DESC')->limit(9)->get();
        $videos = Video::orderBy('created_at', 'DESC')->get();

        $newsletters = Publication::where('type', '=', 'Newsletter')->orderBy('created_at', 'DESC')->get();
        $brochures = Publication::where('type', '=', 'Brochures')->orderBy('created_at', 'DESC')->get();



        return response()->json(
            [
                'blogs' => $blogs,
                'videos' => $videos,
                'newsletters' => $newsletters,
                'brochures' => $brochures,
            ]
        );
    }


    public function getMediaCenterVideos()
    {
        $videos = Video::orderBy('created_at', 'DESC')
            ->where('is_published', 1)
            ->get();
        return response()->json(
            [
                'videos' => $videos,
            ]
        );
    }



    public function getMediaCenterGalleries()
    {
        $perPage = (int) request('per_page', '0');
        $galleryFilters = request('gallery_type', []);

        $query = Gallery::where('is_published', true);

        if (!empty($galleryFilters)) {
            $query->whereIn('gallery_type', $galleryFilters);
        }

        $galleries = $query->orderBy('created_at', 'DESC');

        if ($perPage > 0) {
            $galleries = $query->paginate($perPage);
        } else {
            $galleries = $query->get();
        }

        return ['data' => $galleries];
    }

    public function getMediaCenterGalleriesDetails()
    {

        $showroom_id = request('showroom_id', 1);

        $Gallery = Gallery::find($showroom_id);

        return response()->json(['showroom' => new GalleryResource($Gallery)]);
    }


    public function getInTheNews()
    {

        $perPage = request('per_page', 9);
        $News = News::where('is_published', '=', true)->orderBy('created_at', 'DESC')->paginate($perPage);

        return $News;
    }
}
