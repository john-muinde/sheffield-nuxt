import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { apiRequest } from '../utils/api';
import { Modal } from 'ant-design-vue';

export default function usePublications() {
    const publications = ref([]);
    const publicationsList = ref([]);
    const publication = ref({
        name: '',
        type: '',
        content: '',
        is_published: '',
        publication_file: null,
        thumbnail_path: null,
        main_image_path: null,
    });

    const router = useRouter();
    const validationErrors = ref({});
    const isLoading = ref(false);

    const getPublications = async (
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
                `/api/publications?page=${page}&search_id=${search_id}&search_title=${search_title}&search_parent_id=${search_parent_id}&search_global=${search_global}&order_column=${order_column}&order_direction=${order_direction}`,
            );
            publications.value = response;
        } catch (errors) {
            validationErrors.value = errors;
            console.error(errors);
        }
    };

    const getPublication = async (id) => {
        try {
            const response = await apiRequest('get', `/api/publications/${id}`);
            publication.value = response;
        } catch (errors) {
            validationErrors.value = errors;
            console.error(errors);
        }
    };

    const storePublication = async (publication, ignoreLoading = false) => {
        if (isLoading.value && !ignoreLoading) return;

        isLoading.value = true;
        validationErrors.value = {};

        let serializedPost = new FormData();

        for (let item in publication) {
            if (publication.hasOwnProperty(item)) {
                serializedPost.append(item, publication[item]);
            }
        }

        const config = {
            headers: { 'Content-Type': 'multipart/form-data' },
        };

        try {
            await apiRequest(
                'post',
                '/api/publications',
                serializedPost,
                config,
            );
            router.push({ name: 'publications.index' });
            publication.value = {
                name: '',
                parent_id: '',
                description: '',
                is_published: '',
            };
            showToast('Publication saved successfully', 'success');
        } catch (errors) {
            validationErrors.value = errors;
            console.error(errors);
        } finally {
            isLoading.value = false;
        }
    };

    const updatePublication = async (publication, ignoreLoading = false) => {
        if (isLoading.value && !ignoreLoading) return;

        isLoading.value = true;
        validationErrors.value = {};

        let serializedPost = new FormData();

        for (let item in publication) {
            if (publication.hasOwnProperty(item)) {
                serializedPost.append(item, publication[item]);
            }
        }

        const config = {
            headers: { 'Content-Type': 'multipart/form-data' },
        };

        try {
            await apiRequest(
                'put',
                `/api/publications/${publication.id}`,
                serializedPost,
                config,
            );
            router.push({ name: 'publications.index' });
            showToast('Publication updated successfully', 'success');
        } catch (errors) {
            validationErrors.value = errors;
            console.error(errors);
        } finally {
            isLoading.value = false;
        }
    };

    const deletePublication = async (id) => {
        Modal.confirm({
            title: 'Are you sure?',
            content: 'You won\'t be able to revert this action!',
            okText: 'Yes, delete it!',
            okType: 'danger',
            cancelText: 'No, cancel',
            onOk: async () => {
                await apiRequest('delete', `/api/publications/${id}`);
                getPublications();
                router.push({ name: 'publications.index' });
                showToast('Publication deleted successfully', 'success');
            },
        });
    };

    const getPublicationList = async () => {
        try {
            const response = await apiRequest('get', '/api/publication-list');
            publicationsList.value = response;
        } catch (errors) {
            validationErrors.value = errors;
            console.error(errors);
        }
    };

    return {
        publicationsList,
        publications,
        publication,
        getPublications,
        getPublicationList,
        getPublication,
        storePublication,
        updatePublication,
        deletePublication,
        validationErrors,
        isLoading,
    };
}
