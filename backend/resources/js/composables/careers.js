import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';
import axiosInstance from '../axiosInstance';
export default function useCareers() {
    const careers = ref([]);
    const careerList = ref([]);
    const career = ref({
        title: '',
        department: '',
        location: '',
        education: '',
        education: '',
        experience: '',
        deadline: '',
        description: '',
        responsibilities: '',
        requirements: '',
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
        console.log(career);
        if (isLoading.value) return;

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

        console.log(serializedPost);

        axiosInstance
            .post('/api/careers', serializedPost, config)
            .then((response) => {
                router.push({ name: 'careers.create' });
                // Reset the form values
                career.title = null;
                career.department = null;
                career.location = null;
                career.education = null;
                career.experience = null;
                career.deadline = null;
                career.description = null;
                career.responsibilities = null;
                career.requirements = null;
                career.is_published = null;
                swal({
                    icon: 'success',
                    title: 'Career saved successfully',
                });
            })
            .catch((error) => {
                if (error.response?.data) {
                    validationErrors.value = error.response.data.errors;
                }
            })
            .finally(() => (isLoading.value = false));
    };

    const updateCareer = async (career) => {
        console.log(career);
        if (isLoading.value) return;

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

        console.log(serializedPost);

        axiosInstance
            .put('/api/careers/' + career.id, career)
            .then((response) => {
                router.push({ name: 'careers.index' });
                swal({
                    icon: 'success',
                    title: 'Career updated successfully',
                });
            })
            .catch((error) => {
                if (error.response?.data) {
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
        updateCareer,
        deleteCareer,
        validationErrors,
        isLoading,
    };
}
