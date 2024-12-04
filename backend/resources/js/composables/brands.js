import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Modal } from 'ant-design-vue';
import { apiRequest } from '../utils/api';

export default function useBrands() {
    const brands = ref([]);
    const brandList = ref([]);
    const brand = ref({
        name: '',
        is_published: '',
        description: '',
    });

    const router = useRouter();
    const validationErrors = ref({});
    const isLoading = ref(false);

    const getBrands = async (
        page = 1,
        search_id = '',
        search_title = '',
        search_global = '',
        order_column = 'created_at',
        order_direction = 'desc',
    ) => {
        isLoading.value = true;
        try {
            const data = await apiRequest(
                'get',
                `/api/brands?page=${page}
                &search_id=${search_id}
                &search_title=${search_title}
                &search_global=${search_global}
                &order_column=${order_column}
                &order_direction=${order_direction}`,
            );
            brands.value = data;
            console.log(data);
        } catch (errors) {
            validationErrors.value = errors;
        } finally {
            isLoading.value = false;
        }
    };

    const getBrand = async (id) => {
        isLoading.value = true;
        try {
            const data = await apiRequest('get', `/api/brands/${id}`);
            brand.value = data;
        } catch (errors) {
            validationErrors.value = errors;
        } finally {
            isLoading.value = false;
        }
    };

    const storeBrand = async (brand) => {
        if (isLoading.value) return;

        isLoading.value = true;
        validationErrors.value = {};

        let serializedPost = new FormData();
        for (let item in brand) {
            if (brand.hasOwnProperty(item)) {
                serializedPost.append(item, brand[item]);
            }
        }

        const config = {
            headers: { 'content-type': 'multipart/form-data' },
        };

        try {
            await apiRequest('post', '/api/brands', serializedPost, config);
            router.push({ name: 'brands.index' });
            showToast('Brand created successfully', 'success');
            // Reset the form values
            brand.name = '';
            brand.description = '';
            brand.main_image = '';
            brand.is_published = '';
        } catch (errors) {
            validationErrors.value = errors;
        } finally {
            isLoading.value = false;
        }
    };

    const updateBrand = async (brand) => {
        if (isLoading.value) return;

        isLoading.value = true;
        validationErrors.value = {};

        let serializedPost = new FormData();
        for (let item in brand) {
            if (brand.hasOwnProperty(item)) {
                serializedPost.append(item, brand[item]);
            }
        }

        const config = {
            headers: { 'content-type': 'multipart/form-data' },
        };

        serializedPost.append('_method', 'put');

        try {
            await apiRequest(
                'post',
                `/api/brands/${brand.id}`,
                serializedPost,
                config,
            );
            router.push({ name: 'brands.index' });
            showToast('Brand updated successfully', 'success');
        } catch (errors) {
            validationErrors.value = errors;
        } finally {
            isLoading.value = false;
        }
    };

    const deleteBrand = async (id) => {
        Modal.confirm({
            title: 'Are you sure?',
            content: 'You won\'t be able to revert this action!',
            okText: 'Yes, delete it!',
            okType: 'danger',
            cancelText: 'No, cancel',
            onOk() {
                apiRequest('delete', `/api/brands/${id}`).then(() => {
                    getBrands();
                    router.push({ name: 'brands.index' });
                    showToast('Brand deleted successfully', 'success');
                });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const getBrandList = async () => {
        try {
            const data = await apiRequest('get', '/api/brand-list');
            brandList.value = data;
        } catch (errors) {
            validationErrors.value = errors;
        }
    };

    return {
        brandList,
        brands,
        brand,
        getBrands,
        getBrandList,
        getBrand,
        storeBrand,
        updateBrand,
        deleteBrand,
        validationErrors,
        isLoading,
    };
}
