import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';
import axiosInstance from '../axiosInstance';

export default function useCsrs() {
    const csrs = ref([]);
    const csrList = ref([]);
    const csr = ref({
        name: '',
        description: '',
        is_published: '',
    });

    const router = useRouter();
    const validationErrors = ref({});
    const isLoading = ref(false);
    const swal = inject('$swal');

    const getCsrs = async (
        page = 1,
        search_id = '',
        search_title = '',
        search_global = '',
        order_column = 'created_at',
        order_direction = 'desc',
    ) => {
        axiosInstance
            .get(
                '/api/csrs?page=' +
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
                csrs.value = response.data;
            });
    };

    const getCsr = async (id) => {
        axiosInstance.get('/api/csrs/' + id).then((response) => {
            csr.value = response.data.data;
        });
    };

    const storeCsr = async (csr, files) => {
        if (isLoading.value) return;

        console.log(csr);

        isLoading.value = true;
        validationErrors.value = {};

        let serializedPost = new FormData();

        for (var i = 0; i < files.length; i++) {
            let file = files[i];
            serializedPost.append('csr_gallery[' + i + ']', file);
        }

        for (let item in csr) {
            if (csr.hasOwnProperty(item)) {
                serializedPost.append(item, csr[item]);
            }
        }

        const config = {
            headers: { 'content-type': 'multipart/form-data' },
        };

        axiosInstance
            .post('/api/csrs', serializedPost, config)
            .then((response) => {
                router.push({ name: 'csrs.create' });
                // Reset the form values
                csr.name = null;
                csr.csr_introduction = null;
                csr.company_involvement = null;
                csr.collaborations_and_partnership = null;
                csr.main_image = null;
                csr.csr_gallery = null;

                swal({
                    icon: 'success',
                    title: 'CSR saved successfully',
                });
            })
            .catch((error) => {
                if (error.response?.data) {
                    validationErrors.value = error.response.data.errors;
                }
            })
            .finally(() => (isLoading.value = false));
    };

    const updateCsr = async (csr, files) => {
        if (isLoading.value) return;

        isLoading.value = true;
        validationErrors.value = {};

        let serializedPost = new FormData();

        if (files.length > 0) {
            for (var i = 0; i < files.length; i++) {
                let file = files[i];
                serializedPost.append('csr_gallery[' + i + ']', file);
            }
        }

        // for (let item in csr) {
        //     if (csr.hasOwnProperty(item)) {
        //         if (csr.hasOwnProperty(item) && item !== 'categories') {
        //             serializedPost.append(item, csr[item])
        //         }
        //     }
        // }

        for (let item in csr) {
            if (csr.hasOwnProperty(item) && item !== 'categories') {
                let value = csr[item];
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

        console.log(serializedPost);

        await axiosInstance
            .post('/api/csrs/' + csr.id, serializedPost, config)
            .then((response) => {
                router.push({ name: 'csrs.index' });
                swal({
                    icon: 'success',
                    title: 'CSR updated successfully',
                });
            })
            .catch((error) => {
                if (error.response?.data) {
                    validationErrors.value = error.response.data.errors;
                }
            })
            .finally(() => (isLoading.value = false));
    };

    const deleteCsr = async (id) => {
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
                    .delete('/api/csrs/' + id)
                    .then((response) => {
                        getCsrs();
                        router.push({ name: 'csrs.index' });
                        swal({
                            icon: 'success',
                            title: 'CSR deleted successfully',
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

    const deleteCsrImage = async (id) => {
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
                    .delete('/api/csr-images/' + id)
                    .then((response) => {
                        getCsrs();
                        //router.push({name: 'csrs.index'})
                        router.go(0);
                        swal({
                            icon: 'success',
                            title: 'Image deleted successfully',
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

    const getCsrList = async () => {
        axiosInstance.get('/api/csr-list').then((response) => {
            csrList.value = response.data.data;
        });
    };

    return {
        csrList,
        csrs,
        csr,
        getCsrs,
        getCsrList,
        getCsr,
        storeCsr,
        updateCsr,
        deleteCsr,
        deleteCsrImage,
        validationErrors,
        isLoading,
    };
}
