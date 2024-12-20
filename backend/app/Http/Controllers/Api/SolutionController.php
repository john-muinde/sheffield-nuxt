<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSolutionRequest;
use App\Http\Requests\UpdateSolutionRequest;
use App\Http\Resources\ProductResource;
use App\Http\Resources\SolutionResource;
use App\Models\Category;
use App\Models\Solution;
use App\Models\SolutionCategory;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Storage;

class SolutionController extends Controller
{
    public function index()
    {
        $orderColumn = request('order_column', 'created_at');
        if (! in_array($orderColumn, ['id', 'name', 'created_at'])) {
            $orderColumn = 'created_at';
        }
        $orderDirection = request('order_direction', 'desc');
        if (! in_array($orderDirection, ['asc', 'desc'])) {
            $orderDirection = 'desc';
        }
        $solutions = Solution::when(request('search_id'), function ($query) {
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

        return SolutionResource::collection($solutions);
    }

    public function store(StoreSolutionRequest $request)
    {
        $this->authorize('solution-create');

        //dd($request);

        // Check if the solution with the same name already exists
        $existingSolution = Solution::where('name', $request->name)->first();
        if ($existingSolution) {
            return response()->json(['errors' => ['name' => ['Solution with the same name already exists.']]], 409);
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

        //dd($validatedData);
        $solution = Solution::create($validatedData);

        if ($request->has('categories')) {
            $categories = $request->input('categories');

            $categoryIds = explode(',', $categories);

            foreach ($categoryIds as $categoryId) {

                $solution->solutionCategories()->create([
                    'category_id' => $categoryId,
                ]);
            }
        }

        return new SolutionResource($solution);
    }

    public function show(Solution $solution)
    {
        $this->authorize('solution-edit');

        return new SolutionResource($solution);
    }

    public function update(Solution $solution, UpdateSolutionRequest $request)
    {
        $this->authorize('solution-edit');

        $validatedData = $request->validated();

        // Check if the solution with the same name already exists (excluding the current solution)
        $existingSolution = Solution::where('name', $request->name)
            ->where('id', '!=', $solution->id)
            ->first();
        if ($existingSolution) {
            return response()->json(['errors' => ['name' => ['Solution with the same name already exists.']]], 409);
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

        $solution->update($validatedData);

        if ($request->has('categories')) {

            // $solution->solutionCategories()->delete();

            // $categories = $request->input('categories');

            // $categoryIds = explode(',', $categories);

            // foreach ($categoryIds as $categoryId) {

            //     $solution->solutionCategories()->create([
            //         'category_id' => $categoryId,
            //     ]);
            // }

            $categories = $request->input('categories');
            $categoryIds = explode(',', $categories);

            // Get the existing category IDs associated with $solution
            $existingCategoryIds = $solution->solutionCategories->pluck('category_id')->toArray();

            // Find the category IDs to be deleted (present in $existingCategoryIds but not in $categoryIds)
            $categoriesToDelete = array_diff($existingCategoryIds, $categoryIds);

            // Delete the categories to be removed
            $solution->solutionCategories()->whereIn('category_id', $categoriesToDelete)->delete();

            // Find the category IDs to be added (present in $categoryIds but not in $existingCategoryIds)
            $categoriesToAdd = array_diff($categoryIds, $existingCategoryIds);

            // Add the new categories
            foreach ($categoriesToAdd as $categoryId) {
                $solution->solutionCategories()->create([
                    'category_id' => $categoryId,
                ]);
            }
        }

        //dd("test");

        return new SolutionResource($solution);
    }

    public function destroy(Solution $solution)
    {
        $this->authorize('solution-delete');
        $solution->delete();

        return response()->noContent();
    }

    public function getList()
    {
        return SolutionResource::collection(Solution::all());
    }

    public function getMainSolutions($id)
    {
        $solutions = Solution::where('solution_category', $id)
            ->where('is_published', 1) // Assuming you want to fetch published solutions
            ->orderBy('order_index', 'ASC')
            ->get();
        $data = [];
        $data['data'] = $solutions;

        return $data;
    }

    public function getSolutions()
    {
        $perPage = request('per_page', 12);
        $categoryId = request('category_id', 21);

        $allChildrenIds = [];

        $category = Category::find($categoryId);
        $the_category = $category;
        $allChildrenIds = $category->getAllChildrenIds();

        $solutions = Solution::with('solutionBrand')
            ->whereHas('solutionCategories', function ($query) use ($categoryId, $allChildrenIds) {
                $query->whereIn('category_id', $allChildrenIds);
                $query->orWhere('category_id', '=', $categoryId);
            })
            ->paginate($perPage);

        $category = Category::withCount('categorySolutions')->where('parent_id', $categoryId)->orderBy('name', 'ASC')->get();

        $solutionBrands = Solution::with('solutionBrand')
            ->whereHas('solutionCategories', function ($query) use ($categoryId, $allChildrenIds) {
                $query->whereIn('category_id', $allChildrenIds);
                $query->orWhere('category_id', '=', $categoryId);
            })
            ->select('brand')
            ->orderBy('brand', 'ASC')
            ->groupBy('brand')->get();

        $result = [
            'solutions' => $solutions,
            'categories' => $category,
            'brands' => $solutionBrands,
            'the_category' => $the_category,
        ];

        return response()->json($result);
    }

    public function getSolutionCategories()
    {
        $solution_id = request('solution_id', 1);

        $solution = Solution::where('id', '=', $solution_id)->first();

        return new SolutionResource($solution);
    }

    public function getSolutionCategoryProducts()
    {
        $perPage = request('per_page', 10000);
        $solution_id = request('solution_id', 1);
        $checkedCategoriesSolutions = request('checkedCategoriesSolutions');

        $product_categories = Solution::find($solution_id);

        if (!$product_categories) {
            return response()->json(['products' => [], 'total' => 0]);
        }

        $categoryId = $product_categories->solutionCategories->pluck('category_id');
        $categories = Category::whereIn('id', $categoryId)->get();

        $allChildrenIds = [];
        foreach ($categories as $category) {
            $allChildrenIds = array_merge($allChildrenIds, $category->getAllChildrenIds());
        }

        $SolutionCategory = SolutionCategory::where('solution_id', $solution_id)
            ->orderBy('order_index', 'ASC')
            ->get();

        $allcats = [];
        if (!isset($checkedCategoriesSolutions[$solution_id])) {
            foreach ($SolutionCategory as $value) {
                $category_id = $value->category_id;
                $categorycat = Category::find($category_id);
                $allChildrenIdscat = $categorycat->getAllChildrenIds();
                $allcats = array_merge($allcats, [$category_id], $allChildrenIdscat);
            }
        } else {
            foreach ($checkedCategoriesSolutions[$solution_id] as $category_id) {
                $categorycat = Category::find($category_id);
                $allChildrenIdscat = $categorycat->getAllChildrenIds();
                $allcats = array_merge($allcats, [$category_id], $allChildrenIdscat);
            }
        }

        $allProducts = [];
        foreach ($allcats as $value) {
            $category_products = Category::where('id', $value)
                ->with(['products' => function ($query) {
                    $query->orderBy('order_index')
                        ->with('productBrand')
                        ->with(['productCategories' => function ($query) {
                            $query->with(['category' => function ($query) {
                                $query->with('parent');
                            }]);
                        }]);
                }])
                ->orderBy('order_index')
                ->first();

            if ($category_products && $category_products->products->isNotEmpty()) {
                $allProducts = array_merge($allProducts, json_decode(json_encode(ProductResource::collection($category_products->products)), true));
            }
        }

        $page = request()->get('page', 1);
        $total = count($allProducts);
        $products = array_slice($allProducts, ($page - 1) * $perPage, $perPage);

        if (empty($products)) {
            return response()->json(['products' => [], 'total' => 0]);
        }

        $my_products = new LengthAwarePaginator($products, $total, $perPage, $page);

        return response()->json(['products' => $my_products]);
    }


    public function getSolutionsAdmin()
    {

        $perPage = request('per_page', 10000);
        $categoryId = request('category_id', 21);
        $mainCategory = request('mainCategory');
        $filter_category_id = request('filter_category_id');
        $search = request('search');

        if (isset($mainCategory) && ! isset($search)) {

            $perPage = 1000;
        }

        //dd($perPage);

        $Solution = Solution::with('solutionCategory');

        if ($search != '') {
            $Solution = $Solution->where('name', 'like', '%' . $search . '%');
        }

        if ($mainCategory != '') {
            $Solution = $Solution->where('solution_category', '=', $mainCategory);
        }

        $Solution = $Solution->OrderBy('order_index', 'ASC')->paginate($perPage);

        $result = [
            'categories' => $Solution,
        ];

        return response()->json($result);
    }

    public function getSolutionsCategories()
    {

        $solution_id = request('solution_id');
        $perPage = 1000;

        $Solution = Solution::with('solutionCategories.category')->where('id', '=', $solution_id)->first();

        $solutions = $Solution->solutionCategories;

        // $page = request()->get('page', 1);
        // $allCategories = $Solution->solutionCategories;
        // $total = $allCategories->count();
        // $categories = $allCategories->slice(($page - 1) * $perPage, $perPage)->all();

        // $solutions = new LengthAwarePaginator($categories, $total, $perPage, $page);

        $result = [

            'categories' => $solutions,
            'the_solutions' => $Solution,

        ];

        return response()->json($result);
    }

    public function postNewOrderSolutions()
    {
        $data = request('data');

        foreach ($data as $key => $value) {

            $solution_id = $value;

            $Solution = Solution::find($solution_id);

            //print_r($Category);

            // Update the order
            if ($Solution) {
                $Solution->order_index = $key + 1;
                $Solution->save();
            }
        }
    }

    public function postNewOrderSolutionOrders()
    {
        $data = request('data');

        foreach ($data as $key => $value) {

            $solution_id = $value;

            $Solution = SolutionCategory::find($solution_id);

            //print_r($Category);

            // Update the order
            if ($Solution) {
                $Solution->order_index = $key + 1;
                $Solution->save();
            }
        }
    }
}
