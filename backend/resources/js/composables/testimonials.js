import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';
import axiosInstance from '../axiosInstance';

export default function useTestimonials() {
    const testimonials = ref([]);
    const testimonialList = ref([]);
    const testimonial = ref({
        name: '',
        // main_image: "",
        is_published: '',
        description: '',
    });

    const router = useRouter();
    const validationErrors = ref({});
    const isLoading = ref(false);
    const swal = inject('$swal');

    const getTestimonials = async (
        page = 1,
        search_id = '',
        search_title = '',
        search_global = '',
        order_column = 'created_at',
        order_direction = 'desc',
    ) => {
        axiosInstance
            .get(
                '/api/testimonials?page=' +
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
                testimonials.value = response.data;
            });
    };

    const getTestimonial = async (id) => {
        axiosInstance.get('/api/testimonials/' + id).then((response) => {
            testimonial.value = response.data.data;
        });
    };

    const storeTestimonial = async (testimonial) => {
        console.log(testimonial);
        if (isLoading.value) return;

        isLoading.value = true;
        validationErrors.value = {};

        let serializedPost = new FormData();

        for (let item in testimonial) {
            if (testimonial.hasOwnProperty(item)) {
                serializedPost.append(item, testimonial[item]);
            }
        }

        const config = {
            headers: { 'content-type': 'multipart/form-data' },
        };

        console.log(serializedPost);

        axiosInstance
            .post('/api/testimonials', serializedPost, config)
            .then((response) => {
                router.push({ name: 'testimonials.create' });
                // Reset the form values
                testimonial.name = null;
                testimonial.website = null;
                testimonial.person = null;
                testimonial.email = null;
                testimonial.description = null;
                testimonial.main_image = null;
                testimonial.is_published = null;
                swal({
                    icon: 'success',
                    title: 'Testimonial saved successfully',
                });
            })
            .catch((error) => {
                if (error.response?.data) {
                    validationErrors.value = error.response.data.errors;
                }
            })
            .finally(() => (isLoading.value = false));
    };

    const updateTestimonial = async (testimonial) => {
        console.log(testimonial);
        if (isLoading.value) return;

        isLoading.value = true;
        validationErrors.value = {};

        let serializedPost = new FormData();

        for (let item in testimonial) {
            if (testimonial.hasOwnProperty(item)) {
                serializedPost.append(item, testimonial[item]);
            }
        }

        const config = {
            headers: { 'content-type': 'multipart/form-data' },
        };

        console.log(serializedPost);

        axiosInstance
            .put('/api/testimonials/' + testimonial.id, testimonial)
            .then((response) => {
                router.push({ name: 'testimonials.index' });
                swal({
                    icon: 'success',
                    title: 'Testimonial updated successfully',
                });
            })
            .catch((error) => {
                if (error.response?.data) {
                    validationErrors.value = error.response.data.errors;
                }
            })
            .finally(() => (isLoading.value = false));
    };

    const deleteTestimonial = async (id) => {
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
                    .delete('/api/testimonials/' + id)
                    .then((response) => {
                        getTestimonials();
                        router.push({ name: 'testimonials.index' });
                        swal({
                            icon: 'success',
                            title: 'Testimonial deleted successfully',
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

    const getTestimonialList = async () => {
        axiosInstance.get('/api/testimonial-list').then((response) => {
            testimonialList.value = response.data.data;
        });
    };

    return {
        testimonialList,
        testimonials,
        testimonial,
        getTestimonials,
        getTestimonialList,
        getTestimonial,
        storeTestimonial,
        updateTestimonial,
        deleteTestimonial,
        validationErrors,
        isLoading,
    };
}
