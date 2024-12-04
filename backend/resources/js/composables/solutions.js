import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { apiRequest } from '../utils/api';
import { Modal } from 'ant-design-vue';

export default function useSolutions() {
    const solutions = ref([]);
    const solutionList = ref([]);
    const solution = ref({
        name: '',
        parent_id: '',
        description: '',
        is_published: '',
    });

    const router = useRouter();
    const validationErrors = ref({});
    const isLoading = ref(false);

    const getSolutions = async (
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
                `/api/solutions?page=${page}&search_id=${search_id}&search_title=${search_title}&search_parent_id=${search_parent_id}&search_global=${search_global}&order_column=${order_column}&order_direction=${order_direction}`,
            );
            solutions.value = response;
        } catch (errors) {
            validationErrors.value = errors;
        }
    };

    const getSolution = async (id) => {
        try {
            const response = await apiRequest('get', `/api/solutions/${id}`);
            solution.value = response;
        } catch (errors) {
            validationErrors.value = errors;
        }
    };

    const storeSolution = async (solution, files) => {
        if (isLoading.value) return;

        isLoading.value = true;
        validationErrors.value = {};

        let serializedPost = new FormData();
        const categoryIds = solution.categories.map((category) => category.id);

        serializedPost.append('categories', categoryIds);

        for (let item in solution) {
            if (solution.hasOwnProperty(item) && item !== 'categories') {
                serializedPost.append(item, solution[item]);
            }
        }

        const config = {
            headers: { 'content-type': 'multipart/form-data' },
        };

        try {
            await apiRequest('post', '/api/solutions', serializedPost, config);
            router.push({ name: 'solutions.index' });
            // Reset the form values
            solution.name = null;
            solution.solution_category = null;
            solution.description = null;
            solution.is_published = null;
            solution.main_image = null;

            showToast('Solution saved successfully', 'success');
        } catch (errors) {
            validationErrors.value = errors;
        } finally {
            isLoading.value = false;
        }
    };

    const updateSolution = async (solution, files) => {
        if (isLoading.value) return;

        isLoading.value = true;
        validationErrors.value = {};

        let serializedPost = new FormData();
        const categoryIds = solution.categories.map((category) => category.id);

        serializedPost.append('categories', categoryIds);

        for (let item in solution) {
            if (solution.hasOwnProperty(item) && item !== 'categories') {
                serializedPost.append(item, solution[item]);
            }
        }

        const config = {
            headers: { 'Content-Type': 'multipart/form-data' },
        };

        serializedPost.append('_method', 'put');

        try {
            await apiRequest(
                'post',
                `/api/solutions/${solution.id}`,
                serializedPost,
                config,
            );
            router.push({ name: 'solutions.index' });
            showToast('Solution updated successfully', 'success');
        } catch (errors) {
            validationErrors.value = errors;
        } finally {
            isLoading.value = false;
        }
    };

    const deleteSolution = async (id) => {
        Modal.confirm({
            title: 'Are you sure?',
            content: 'You won\'t be able to revert this action!',
            okText: 'Yes, delete it!',
            okType: 'danger',
            cancelText: 'No, cancel',
            onOk() {
                apiRequest('delete', `/api/solutions/${id}`).then(() => {
                    getSolutions();
                    router.push({ name: 'solutions.index' });
                    showToast('Solution deleted successfully', 'success');
                });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const deleteSolutionImage = async (id) => {
        Modal.confirm({
            title: 'Are you sure?',
            content: 'You won\'t be able to revert this action!',
            okText: 'Yes, delete it!',
            okType: 'danger',
            cancelText: 'No, cancel',
            onOk() {
                apiRequest('delete', `/api/solution-images/${id}`).then(() => {
                    getSolutions();
                    router.go(0);
                    showToast('Image deleted successfully', 'success');
                });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const getSolutionList = async () => {
        try {
            const response = await apiRequest('get', '/api/solution-list');
            solutionList.value = response;
        } catch (errors) {
            validationErrors.value = errors;
        }
    };

    return {
        solutionList,
        solutions,
        solution,
        getSolutions,
        getSolutionList,
        getSolution,
        storeSolution,
        updateSolution,
        deleteSolution,
        deleteSolutionImage,
        validationErrors,
        isLoading,
    };
}
