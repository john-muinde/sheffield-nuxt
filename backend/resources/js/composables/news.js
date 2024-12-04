import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { apiRequest } from '../utils/api';
import { Modal } from 'ant-design-vue';

export default function useNews() {
    const allNews = ref([]);
    const newsList = ref([]);
    const news = ref({
        name: '',
        type: '',
        content: '',
        is_published: '',
        main_image_path: '',
        file_path: '',
        url: '',
    });

    const router = useRouter();
    const validationErrors = ref({});
    const isLoading = ref(false);

    const getNews = async (
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
                `/api/news?page=${page}
                &search_id=${search_id}
                &search_title=${search_title}
                &search_global=${search_global}
                &order_column=${order_column}
                &order_direction=${order_direction}`,
            );
            allNews.value = response;
        } catch (errors) {
            validationErrors.value = errors;
        }
    };

    const getSingleNews = async (id) => {
        try {
            const response = await apiRequest('get', `/api/news/${id}`);
            news.value = response;
        } catch (errors) {
            validationErrors.value = errors;
        }
    };

    const storeNews = async (news) => {
        if (isLoading.value) return;

        isLoading.value = true;
        validationErrors.value = {};

        let serializedPost = new FormData();

        for (let item in news) {
            if (news.hasOwnProperty(item)) {
                serializedPost.append(item, news[item]);
            }
        }

        const config = {
            headers: { 'Content-Type': 'multipart/form-data' },
        };

        try {
            await apiRequest('post', '/api/news', serializedPost, config);
            router.push({ name: 'news.index' });
            // Reset the form values
            news.name = null;
            news.description = null;
            news.main_image_path = null;
            news.is_published = null;
            news.video = null;
            showToast('News saved successfully', 'success');
        } catch (errors) {
            validationErrors.value = errors;
        } finally {
            isLoading.value = false;
        }
    };

    const updateNews = async (news) => {
        if (isLoading.value) return;

        isLoading.value = true;
        validationErrors.value = {};

        let serializedPost = new FormData();

        for (let item in news) {
            if (news.hasOwnProperty(item)) {
                serializedPost.append(item, news[item]);
            }
        }

        const config = {
            headers: { 'Content-Type': 'multipart/form-data' },
        };

        serializedPost.append('_method', 'put');

        try {
            await apiRequest(
                'post',
                `/api/news/${news.id}`,
                serializedPost,
                config,
            );
            router.push({ name: 'news.index' });
            showToast('News updated successfully', 'success');
        } catch (errors) {
            validationErrors.value = errors;
        } finally {
            isLoading.value = false;
        }
    };

    const deleteNews = async (id) => {
        Modal.confirm({
            title: 'Are you sure?',
            content: 'You won\'t be able to revert this action!',
            okText: 'Yes, delete it!',
            okType: 'danger',
            cancelText: 'No, cancel',
            onOk() {
                apiRequest('delete', `/api/news/${id}`).then(() => {
                    getNews();
                    router.push({ name: 'news.index' });
                    showToast('News deleted successfully', 'success');
                });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const getNewsList = async () => {
        try {
            const response = await apiRequest('get', '/api/news-list');
            newsList.value = response;
        } catch (errors) {
            validationErrors.value = errors;
        }
    };

    return {
        newsList,
        allNews,
        news,
        getNews,
        getNewsList,
        getSingleNews,
        storeNews,
        updateNews,
        deleteNews,
        validationErrors,
        isLoading,
    };
}
