import { ref, getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router';
import { apiRequest } from '../utils/api';
import { Modal } from 'ant-design-vue';

export default function useBlogCategories() {
    const blogCategories = ref([]);
    const blogCategoryList = ref([]);
    const blogCategory = ref({
        name: '',
        is_published: '',
        description: '',
    });

    const router = useRouter();
    const validationErrors = ref({});
    const isLoading = ref(false);

    const getBlogCategories = async (
        page = 1,
        search_id = '',
        search_title = '',
        search_global = '',
        order_column = 'created_at',
        order_direction = 'desc',
    ) => {
        try {
            const response = await apiRequest(
                'get',
                `/api/blogCategories?page=${page}&search_id=${search_id}&search_title=${search_title}&search_global=${search_global}&order_column=${order_column}&order_direction=${order_direction}`,
            );
            blogCategories.value = response;
        } catch (errors) {
            validationErrors.value = errors;
        }
    };

    const getBlogCategory = async (id) => {
        try {
            const response = await apiRequest(
                'get',
                `/api/blogCategories/${id}`,
            );
            blogCategory.value = response;
        } catch (errors) {
            validationErrors.value = errors;
        }
    };

    const storeBlogCategory = async (blogCategory) => {
        if (isLoading.value) return;

        isLoading.value = true;
        validationErrors.value = {};

        let serializedPost = new FormData();
        for (let item in blogCategory) {
            if (blogCategory.hasOwnProperty(item)) {
                serializedPost.append(item, blogCategory[item]);
            }
        }

        const config = {
            headers: { 'content-type': 'multipart/form-data' },
        };

        try {
            await apiRequest(
                'post',
                '/api/blogCategories',
                serializedPost,
                config,
            );
            router.push({ name: 'blogCategories.create' });
            // Reset the form values
            blogCategory.name = null;
            blogCategory.description = null;
            blogCategory.main_image = null;
            blogCategory.is_published = null;
            showToast('Blog Category saved successfully', 'success');
        } catch (errors) {
            validationErrors.value = errors;
        } finally {
            isLoading.value = false;
        }
    };

    const updateBlogCategory = async (blogCategory) => {
        if (isLoading.value) return;

        isLoading.value = true;
        validationErrors.value = {};

        let serializedPost = new FormData();
        for (let item in blogCategory) {
            if (blogCategory.hasOwnProperty(item)) {
                serializedPost.append(item, blogCategory[item]);
            }
        }

        const config = {
            headers: { 'content-type': 'multipart/form-data' },
        };

        try {
            await apiRequest(
                'put',
                `/api/blogCategories/${blogCategory.id}`,
                serializedPost,
                config,
            );
            router.push({ name: 'blogCategories.index' });
            showToast('Blog Category updated successfully', 'success');
        } catch (errors) {
            validationErrors.value = errors;
        } finally {
            isLoading.value = false;
        }
    };

    const deleteBlogCategory = async (id) => {
        Modal.confirm({
            title: 'Are you sure?',
            content: 'You won\'t be able to revert this action!',
            okText: 'Yes, delete it!',
            okType: 'danger',
            cancelText: 'No, cancel',
            onOk() {
                apiRequest('delete', `/api/blogCategories/${id}`).then(() => {
                    getBlogCategories();
                    router.push({ name: 'blogCategories.index' });
                    showToast('Blog Category deleted successfully', 'success');
                });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const getBlogCategoryList = async () => {
        try {
            const response = await apiRequest('get', '/api/blogCategory-list');
            blogCategoryList.value = response;
        } catch (errors) {
            validationErrors.value = errors;
        }
    };

    return {
        blogCategoryList,
        blogCategories,
        blogCategory,
        getBlogCategories,
        getBlogCategoryList,
        getBlogCategory,
        storeBlogCategory,
        updateBlogCategory,
        deleteBlogCategory,
        validationErrors,
        isLoading,
    };
}
