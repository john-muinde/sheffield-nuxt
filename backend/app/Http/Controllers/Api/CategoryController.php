<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Intervention\Image\Laravel\Facades\Image;
use Illuminate\Support\Facades\Storage;

class CategoryController extends Controller
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
        $categories = Category::when(request('search_id'), function ($query) {
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
            ->paginate(10000);
        return CategoryResource::collection($categories);
    }

    public function store(StoreCategoryRequest $request)
    {

        $this->authorize(ability: 'category-create');

        $validatedData = $request->validate([
            'name' => 'required|string|max:255|unique:categories',
            'description' => 'required|string',
            'parent_id' => 'nullable|exists:categories,id',
            'is_published' => 'required|boolean',
        ]);

        $validatedData['created_by'] = auth()->user()->id;

        $category = Category::create($validatedData);

        return new CategoryResource($category);
    }

    public function show(Category $category)
    {
        $this->authorize('category-edit');
        return new CategoryResource($category);
    }

    public function update(Category $category, StoreCategoryRequest $request)
    {
        $this->authorize('category-edit');

        $validatedData = $request->validate([
            'name' => 'required|string|max:255|unique:categories,name,' . $category->id,
            'description' => 'required|string',
            'parent_id' => 'nullable|exists:categories,id',
            'is_published' => 'required|boolean',
        ]);

        $category->update($validatedData);

        return new CategoryResource($category);
    }

    public function destroy(Category $category)
    {
        $this->authorize('category-delete');
        $category->delete();

        return response()->noContent();
    }

    public function getList()
    {
        $result = Category::when(
            request('exclude_id'),
            function ($query, $excludeId) {
                return $query->where('id', '<>', $excludeId)->whereNull('parent_id');
            }
        )->get();

        return CategoryResource::collection($result);
    }
    public function getCategoriesMain()
    {

        $categories = Category::whereNull('parent_id')->get();

        return response()->json($categories);
    }


    public function getCategories()
    {
        $perPage = request('per_page', 20);
        $categoryId = request('category_id', 21);
        $mainCategory = request('mainCategory');
        $filter_category_id = request('filter_category_id');
        $search = request('search');

        if (isset($mainCategory)) {

            $perPage = 1000;
        }

        //dd($perPage);

        $category = Category::with('parent');

        if ($search != "") {

            $category = $category->where('name', 'like', '%' . $search . '%');
        }

        if ($mainCategory != "" && $filter_category_id == "") {

            $category = $category->where('parent_id', '=', $mainCategory);
        }

        if ($mainCategory != "" && $filter_category_id != "") {

            $category = $category->where('parent_id', '=', $filter_category_id);
        }

        $category = $category->OrderBy('order_index', 'ASC')->paginate($perPage);

        $result = [
            'categories' => $category
        ];

        return response()->json($result);
    }

    public function getSidebarCategories()
    {

        //add kitchen id 21 add others later

        $categories = Category::WhereIn('parent_id', [21])->with('children.children')->get();

        return response()->json($categories);
    }



    public function getMainCategories($id)
    {

        $categories = Category::WhereIn('parent_id', [$id])->with('children.children')->where('is_published', true)->orderBy('order_index', 'ASC')->get();

        return CategoryResource::collection($categories);
    }

    public function getSelectedCategoryList($id)
    {

        // $categories = Category::whereIn('parent_id', [$id])
        // ->with('children.children') // Eager load children and grandchildren
        // ->get();

        $result = [];
        Category::getCategoriesRecursively($id, $result);


        return CategoryResource::collection($result);
    }



    public function postNewOrderCategories()
    {

        $data = request('data');

        foreach ($data as $key => $value) {

            $category_id = $value;

            $Category = Category::find($category_id);

            //print_r($Category);

            // Update the order
            if ($Category) {
                $Category->order_index = $key + 1;
                $Category->save();
            }
        }
    }
}
