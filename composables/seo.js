import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';
import axiosInstance from '../axiosInstance';

export default function useSeo() {
    const seos = ref([]);
    const seo = ref({
        page: '',
    });

    const router = useRouter();
    const validationErrors = ref({});
    const isLoading = ref(false);
    const swal = inject('$swal');

    const getSeos = async (
        page = 1,
        search_id = '',
        search_title = '',
        search_global = '',
        order_column = 'created_at',
        order_direction = 'desc',
    ) => {
        axiosInstance
            .get(
                '/api/seo?page=' +
                    page +
                    '&search_id=' +
                    search_id +
                    '&search_title=' +
                    search_title +
                    '&search_global=' +
                    search_global +
                    '&order_column=' +
                    order_column +
                    '&order_direction=' +
                    order_direction,
            )
            .then((response) => {
                seo.value = response.data;
            });
    };

    const getSeo = async (id) => {
        axiosInstance.get('/api/seo/' + id).then((response) => {
            seo.value = response.data.data;
        });
    };

    const storeSeo = async (seo) => {
        if (isLoading.value) return;

        isLoading.value = true;
        validationErrors.value = {};

        let serializedPost = new FormData();
        for (let item in seo) {
            if (seo.hasOwnProperty(item)) {
                serializedPost.append(item, seo[item]);
            }
        }

        axiosInstance
            .post('/api/seo', serializedPost)
            .then((response) => {
                router.push({ name: 'view-seo' });
                swal({
                    icon: 'success',
                    title: 'SEO item saved successfully',
                });
            })
            .catch((error) => {
                if (error.response?.data) {
                    validationErrors.value = error.response.data.errors;
                }
            })
            .finally(() => (isLoading.value = false));
    };

    const updateSeo = async (seo) => {
        if (isLoading.value) return;

        isLoading.value = true;
        validationErrors.value = {};

        axiosInstance
            .put('/api/seo/' + seo.id, seo)
            .then((response) => {
                router.push({ name: 'view-seo' });
                swal({
                    icon: 'success',
                    title: 'SEO item updated successfully',
                });
            })
            .catch((error) => {
                if (error.response?.data) {
                    validationErrors.value = error.response.data.errors;
                }
            })
            .finally(() => (isLoading.value = false));
    };

    const deleteSeo = async (id) => {
        swal({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this action!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            confirmButtonColor: '#ef4444',
            timer: 20000,
            timerProgressBar: true,
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                axiosInstance
                    .delete('/api/seo/' + id)
                    .then((response) => {
                        getSeos();
                        router.push({ name: 'view-seo' });
                        swal({
                            icon: 'success',
                            title: 'SEO item deleted successfully',
                        });
                    })
                    .catch((error) => {
                        swal({
                            icon: 'error',
                            title: 'Something went wrong',
                        });
                    });
            }
        });
    };

    return {
        seo,
        seos,
        getSeos,
        getSeo,
        storeSeo,
        updateSeo,
        deleteSeo,
        validationErrors,
        isLoading,
    };
}
