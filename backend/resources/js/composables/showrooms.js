import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';
import axiosInstance from '../axiosInstance';

export default function useShowrooms() {
    const showrooms = ref([]);
    const showroomList = ref([]);
    const showroom = ref({
        name: '',
        image: '',
        description: '',
    });

    const router = useRouter();
    const validationErrors = ref({});
    const isLoading = ref(false);
    const swal = inject('$swal');

    const getShowrooms = async (
        page = 1,
        search_id = '',
        search_title = '',
        search_global = '',
        order_column = 'created_at',
        order_direction = 'desc',
    ) => {
        axiosInstance
            .get(
                '/api/showrooms?page=' +
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
                showrooms.value = response.data;
            });
    };

    const getShowroom = async (id) => {
        axiosInstance.get('/api/showrooms/' + id).then((response) => {
            showroom.value = response.data.data;
        });
    };

    const storeShowroom = async (showroom, files) => {
        if (isLoading.value) return;

        isLoading.value = true;
        validationErrors.value = {};

        let serializedPost = new FormData();

        for (var i = 0; i < files.length; i++) {
            let file = files[i];
            serializedPost.append('showroom_gallery[' + i + ']', file);
        }

        for (let item in showroom) {
            if (showroom.hasOwnProperty(item)) {
                serializedPost.append(item, showroom[item]);
            }
        }

        const config = {
            headers: { 'content-type': 'multipart/form-data' },
        };

        axiosInstance
            .post('/api/showrooms', serializedPost, config)
            .then((response) => {
                router.push({ name: 'showrooms.create' });
                // Reset the form values
                showroom.name = null;
                showroom.location = null;
                showroom.is_published = null;
                showroom.phone_number1 = null;
                showroom.phone_number2 = null;
                showroom.email = null;
                showroom.longitude = null;
                showroom.latitude = null;
                showroom.description = null;
                showroom.main_image = null;
                showroom.showroom_gallery = null;
                swal({
                    icon: 'success',
                    title: 'Showroom saved successfully',
                });
            })
            .catch((error) => {
                if (error.response?.data) {
                    validationErrors.value = error.response.data.errors;
                }
            })
            .finally(() => (isLoading.value = false));
    };

    const updateShowroom = async (showroom) => {
        if (isLoading.value) return;

        isLoading.value = true;
        validationErrors.value = {};

        let serializedPost = new FormData();

        for (let item in showroom) {
            if (showroom.hasOwnProperty(item)) {
                serializedPost.append(item, showroom[item]);
            }
        }

        const config = {
            headers: { 'content-type': 'multipart/form-data' },
        };

        axiosInstance
            .put('/api/showrooms/' + showroom.id, serializedPost, config)
            .then((response) => {
                router.push({ name: 'showrooms.index' });
                swal({
                    icon: 'success',
                    title: 'Showroom updated successfully',
                });
            })
            .catch((error) => {
                if (error.response?.data) {
                    validationErrors.value = error.response.data.errors;
                }
            })
            .finally(() => (isLoading.value = false));
    };

    const deleteShowroom = async (id) => {
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
                    .delete('/api/showrooms/' + id)
                    .then((response) => {
                        getShowrooms();
                        router.push({ name: 'showrooms.index' });
                        swal({
                            icon: 'success',
                            title: 'Showroom deleted successfully',
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

    const deleteShowroomImage = async (id) => {
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
                    .delete('/api/showroom-images/' + id)
                    .then((response) => {
                        getShowrooms();
                        //router.push({name: 'products.index'})
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

    const getShowroomList = async () => {
        axiosInstance.get('/api/showroom-list').then((response) => {
            showroomList.value = response.data.data;
        });
    };

    return {
        showroomList,
        showrooms,
        showroom,
        getShowrooms,
        getShowroomList,
        getShowroom,
        storeShowroom,
        updateShowroom,
        deleteShowroom,
        deleteShowroomImage,
        validationErrors,
        isLoading,
    };
}
