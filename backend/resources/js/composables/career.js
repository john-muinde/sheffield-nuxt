import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';

export default function useCareers() {
    const careers = ref([]);
    const careerList = ref([]);
    const career = ref({
        name: '',
        parent_id: '',
        description: '',
        is_published: '',
    });

    const router = useRouter();
    const validationErrors = ref({});
    const isLoading = ref(false);
    const swal = inject('$swal');

    const getCareers = async (
        page = 1,
        search_id = '',
        search_title = '',
        search_parent_id = '',
        search_global = '',
        order_column = 'created_at',
        order_direction = 'desc',
    ) => {
        axiosInstance
            .get(
                '/api/careers?page=' +
                    page +
                    '&search_id=' +
                    search_id +
                    '&search_title=' +
                    search_title +
                    '&search_parent_id=' +
                    search_parent_id +
                    '&search_global=' +
                    search_global +
                    '&order_column=' +
                    order_column +
                    '&order_direction=' +
                    order_direction,
            )
            .then((response) => {
                careers.value = response.data;
            });
    };

    const getCareer = async (id) => {
        axiosInstance.get('/api/careers/' + id).then((response) => {
            career.value = response.data.data;
        });
    };

    const storeCareer = async (career) => {
        if (isLoading.value) return;

        console.log(career);

        isLoading.value = true;
        validationErrors.value = {};

        let serializedPost = new FormData();

        for (let item in career) {
            if (career.hasOwnProperty(item)) {
                serializedPost.append(item, career[item]);
            }
        }

        const config = {
            headers: { 'content-type': 'multipart/form-data' },
        };

        axiosInstance
            .post('/api/career-cv', serializedPost, config)
            .then((response) => {
                //router.push({name: 'career'}) //disabled due to top gap
                // Reset the form values

                if (response.data.status == 'success') {
                    career.request_type = null;
                    career.area_of_interest = null;
                    career.surname = null;
                    career.email = null;
                    career.company_name = null;
                    career.business_type = null;
                    career.country = null;
                    career.request = null;
                    career.code = null;
                }

                swal({
                    icon: response.data.status,
                    title: response.data.message,
                    confirmButtonColor: '#363636',
                });
            })
            .catch((error) => {
                if (error.response?.data) {
                    swal({
                        icon: 'error',
                        title: 'Error occurred when trying to submit your request please try again',
                        confirmButtonColor: '#363636',
                    });
                    validationErrors.value = error.response.data.errors;
                }
            })
            .finally(() => (isLoading.value = false));
    };

    const deleteCareer = async (id) => {
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
                    .delete('/api/careers/' + id)
                    .then((response) => {
                        getCareers();
                        router.push({ name: 'careers.index' });
                        swal({
                            icon: 'success',
                            title: 'Career deleted successfully',
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

    const getCareerList = async () => {
        axiosInstance.get('/api/career-list').then((response) => {
            careerList.value = response.data.data;
        });
    };

    return {
        careerList,
        careers,
        career,
        getCareers,
        getCareerList,
        getCareer,
        storeCareer,
        deleteCareer,
        validationErrors,
        isLoading,
    };
}
