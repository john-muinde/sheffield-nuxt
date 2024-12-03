import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { apiRequest } from '../utils/api';
import { Modal } from 'ant-design-vue';

export default function useBlogs() {
    const blogs = ref([]);
    const blogList = ref([]);
    const blog = ref({
        name: '',
        parent_id: '',
        description: '',
        is_published: '',
    });

    const router = useRouter();
    const validationErrors = ref({});
    const isLoading = ref(false);

    const getBlogs = async (
        page = 1,
        search_id = '',
        search_title = '',
        search_parent_id = '',
        search_global = '',
        order_column = 'created_at',
        order_direction = 'desc',
    ) => {
        try {
            const response = await apiRequest(
                'get',
                `/api/blogs?page=${page}&search_id=${search_id}&search_title=${search_title}&search_parent_id=${search_parent_id}&search_global=${search_global}&order_column=${order_column}&order_direction=${order_direction}`,
            );
            blogs.value = response;
        } catch (errors) {
            validationErrors.value = errors;
        }
    };

    const getBlog = async (id) => {
        try {
            const response = await apiRequest('get', `/api/blogs/${id}`);
            blog.value = response;
        } catch (errors) {
            validationErrors.value = errors;
        }
    };

    const storeBlog = async (blog, files) => {
        if (isLoading.value) return;

        isLoading.value = true;
        validationErrors.value = {};

        let serializedPost = new FormData();
        const categoryIds = blog.categories.map((category) => category.id);

        serializedPost.append('categories', categoryIds);

        for (var i = 0; i < files.length; i++) {
            let file = files[i];
            serializedPost.append('blog_gallery[' + i + ']', file);
        }

        for (let item in blog) {
            if (blog.hasOwnProperty(item) && item !== 'categories') {
                serializedPost.append(item, blog[item]);
            }
        }

        const config = {
            headers: { 'content-type': 'multipart/form-data' },
        };

        try {
            await apiRequest('post', '/api/blogs', serializedPost, config);
            router.push({ name: 'blogs.create' });
            // Reset the form values
            blog.name = null;
            blog.description = null;
            blog.parent_id = null;
            blog.is_published = null;
            blog.model_number = null;
            blog.sku = null;
            blog.quantity = null;
            blog.cost_price = null;
            blog.retail_price = null;
            blog.weight = null;
            blog.length = null;
            blog.width = null;
            blog.height = null;
            blog.short_description = null;
            blog.technical_specification = null;
            blog.terms_of_operation = null;
            blog.main_image = null;
            blog.blog_gallery = null;
            blog.document = null;

            showToast('Blog saved successfully', 'success');
        } catch (errors) {
            validationErrors.value = errors;
        } finally {
            isLoading.value = false;
        }
    };

    const updateBlog = async (blog, files) => {
        if (isLoading.value) return;

        isLoading.value = true;
        validationErrors.value = {};

        let serializedPost = new FormData();
        const categoryIds = blog.categories.map((category) => category.id);

        serializedPost.append('categories', categoryIds);

        if (files.length > 0) {
            for (var i = 0; i < files.length; i++) {
                let file = files[i];
                serializedPost.append('blog_gallery[' + i + ']', file);
            }
        }

        for (let item in blog) {
            if (blog.hasOwnProperty(item) && item !== 'categories') {
                let value = blog[item];
                if (
                    value === null &&
                    (item === 'weight' ||
                        item === 'length' ||
                        item === 'height' ||
                        item === 'width' ||
                        item === 'quantity' ||
                        item === 'cost_price' ||
                        item === 'retail_price')
                ) {
                    value = 0;
                }
                serializedPost.append(item, value);
            }
        }

        const config = {
            headers: { 'Content-Type': 'multipart/form-data' },
        };

        serializedPost.append('_method', 'put');

        try {
            await apiRequest(
                'post',
                `/api/blogs/${blog.id}`,
                serializedPost,
                config,
            );
            router.push({ name: 'blogs.index' });
            showToast('Blog updated successfully', 'success');
        } catch (errors) {
            validationErrors.value = errors;
        } finally {
            isLoading.value = false;
        }
    };

    const deleteBlog = async (id) => {
        Modal.confirm({
            title: 'Are you sure?',
            content: 'You won\'t be able to revert this action!',
            okText: 'Yes, delete it!',
            okType: 'danger',
            cancelText: 'No, cancel',
            onOk() {
                apiRequest('delete', `/api/blogs/${id}`).then(() => {
                    getBlogs();
                    router.push({ name: 'blogs.index' });
                    showToast('Blog deleted successfully', 'success');
                });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const deleteBlogImage = async (id) => {
        Modal.confirm({
            title: 'Are you sure?',
            content: 'You won\'t be able to revert this action!',
            okText: 'Yes, delete it!',
            okType: 'danger',
            cancelText: 'No, cancel',
            onOk() {
                apiRequest('delete', `/api/blog-images/${id}`).then(() => {
                    getBlogs();
                    router.go(0);
                    showToast('Image deleted successfully', 'success');
                });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const getBlogList = async () => {
        try {
            const response = await apiRequest('get', '/api/blog-list');
            blogList.value = response;
        } catch (errors) {
            validationErrors.value = errors;
        }
    };

    return {
        blogList,
        blogs,
        blog,
        getBlogs,
        getBlogList,
        getBlog,
        storeBlog,
        updateBlog,
        deleteBlog,
        deleteBlogImage,
        validationErrors,
        isLoading,
    };
}
