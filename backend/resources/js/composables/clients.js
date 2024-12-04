import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { apiRequest } from '../utils/api';
import { Modal } from 'ant-design-vue';

export default function useClients() {
    const clients = ref([]);
    const clientList = ref([]);
    const client = ref({
        name: '',
        phone: '',
        email: '',
        address: '',
        is_published: '',
        main_image_path: '',
        description: '',
    });

    const router = useRouter();
    const validationErrors = ref({});
    const isLoading = ref(false);

    const getClients = async (
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
                `/api/clients?page=${page}&search_id=${search_id}&search_title=${search_title}&search_global=${search_global}&order_column=${order_column}&order_direction=${order_direction}`,
            );
            clients.value = response;
        } catch (errors) {
            validationErrors.value = errors;
        }
    };

    const getClient = async (id) => {
        try {
            const response = await apiRequest('get', `/api/clients/${id}`);
            client.value = response;
        } catch (errors) {
            validationErrors.value = errors;
        }
    };

    const storeClient = async (client) => {
        if (isLoading.value) return;

        isLoading.value = true;
        validationErrors.value = {};

        let serializedPost = new FormData();

        for (let item in client) {
            if (client.hasOwnProperty(item)) {
                serializedPost.append(item, client[item]);
            }
        }

        const config = {
            headers: { 'Content-Type': 'multipart/form-data' },
        };

        try {
            await apiRequest('post', '/api/clients', serializedPost, config);
            router.push({ name: 'clients.index' });
            client.value = {
                name: '',
                phone: '',
                email: '',
                address: '',
                is_published: '',
                description: '',
            };
            showToast('Client saved successfully', 'success');
        } catch (errors) {
            validationErrors.value = errors;
        } finally {
            isLoading.value = false;
        }
    };

    const updateClient = async (client) => {
        if (isLoading.value) return;

        isLoading.value = true;
        validationErrors.value = {};

        let serializedPost = new FormData();

        for (let item in client) {
            if (client.hasOwnProperty(item)) {
                serializedPost.append(item, client[item]);
            }
        }

        const config = {
            headers: { 'Content-Type': 'multipart/form-data' },
        };

        try {
            await apiRequest(
                'put',
                `/api/clients/${client.id}`,
                serializedPost,
                config,
            );
            router.push({ name: 'clients.index' });
            showToast('Client updated successfully', 'success');
        } catch (errors) {
            validationErrors.value = errors;
        } finally {
            isLoading.value = false;
        }
    };

    const deleteClient = async (id) => {
        Modal.confirm({
            title: 'Are you sure?',
            content: 'You won\'t be able to revert this action!',
            okText: 'Yes, delete it!',
            okType: 'danger',
            cancelText: 'No, cancel',
            onOk() {
                apiRequest('delete', `/api/clients/${id}`).then(() => {
                    getClients();
                    router.push({ name: 'clients.index' });
                    showToast('Client deleted successfully', 'success');
                });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const getClientList = async () => {
        try {
            const response = await apiRequest('get', '/api/client-list');
            clientList.value = response;
        } catch (errors) {
            validationErrors.value = errors;
        }
    };

    return {
        clientList,
        clients,
        client,
        getClients,
        getClientList,
        getClient,
        storeClient,
        updateClient,
        deleteClient,
        validationErrors,
        isLoading,
    };
}
