import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { apiRequest } from '../utils/api';
import { Modal } from 'ant-design-vue';

export default function useProjects() {
    const projects = ref([]);
    const projectList = ref([]);
    const project = ref({
        name: '',
        parent_id: '',
        description: '',
        is_published: '',
    });

    const router = useRouter();
    const validationErrors = ref({});
    const isLoading = ref(false);

    const getProjects = async (
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
                `/api/projects?page=${page}&search_id=${search_id}&search_title=${search_title}&search_parent_id=${search_parent_id}&search_global=${search_global}&order_column=${order_column}&order_direction=${order_direction}`,
            );
            projects.value = response;
            console.log(response);
        } catch (errors) {
            validationErrors.value = errors;
        }
    };

    const getProject = async (id) => {
        try {
            const response = await apiRequest('get', `/api/projects/${id}`);
            project.value = response;
        } catch (errors) {
            validationErrors.value = errors;
        }
    };

    const storeProject = async (project, files) => {
        if (isLoading.value) return;

        isLoading.value = true;
        validationErrors.value = {};

        let serializedPost = new FormData();

        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            serializedPost.append('project_gallery[' + i + ']', file);
        }

        for (let item in project) {
            if (project.hasOwnProperty(item)) {
                serializedPost.append(item, project[item]);
            }
        }

        const config = {
            headers: { 'Content-Type': 'multipart/form-data' },
        };

        try {
            await apiRequest('post', '/api/projects', serializedPost, config);
            router.push({ name: 'projects.index' });
            project.value = {
                name: '',
                parent_id: '',
                description: '',
                is_published: '',
            };
            showToast('Project saved successfully', 'success');
        } catch (errors) {
            if (errors.response?.data) {
                validationErrors.value = errors.response.data.errors;
            }
        } finally {
            isLoading.value = false;
        }
    };

    const updateProject = async (project, files) => {
        if (isLoading.value) return;

        isLoading.value = true;
        validationErrors.value = {};

        let serializedPost = new FormData();

        if (files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                let file = files[i];
                serializedPost.append('project_gallery[' + i + ']', file);
            }
        }

        for (let item in project) {
            if (project.hasOwnProperty(item) && item !== 'clients') {
                let value = project[item];
                if (
                    value === null &&
                    [
                        'weight',
                        'length',
                        'height',
                        'width',
                        'quantity',
                        'cost_price',
                        'retail_price',
                    ].includes(item)
                ) {
                    value = 0;
                }
                serializedPost.append(item, value);
            }
        }

        const config = {
            headers: { 'Content-Type': 'multipart/form-data' },
        };

        try {
            await apiRequest(
                'put',
                `/api/projects/${project.id}`,
                serializedPost,
                config,
            );
            router.push({ name: 'projects.index' });
            showToast('Project updated successfully', 'success');
        } catch (errors) {
            validationErrors.value = errors;
        } finally {
            isLoading.value = false;
        }
    };

    const deleteProject = async (id) => {
        Modal.confirm({
            title: 'Are you sure?',
            content: 'You won\'t be able to revert this action!',
            okText: 'Yes, delete it!',
            okType: 'danger',
            cancelText: 'No, cancel',
            onOk: async () => {
                apiRequest('delete', `/api/projects/${id}`);
                getProjects();
                router.push({ name: 'projects.index' });
                showToast('Project deleted successfully', 'success');
            },
        });
    };

    const deleteProjectImage = async (id) => {
        Modal.confirm({
            title: 'Are you sure?',
            content: 'You won\'t be able to revert this action!',
            okText: 'Yes, delete it!',
            okType: 'danger',
            cancelText: 'No, cancel',
            onOk: async () => {
                await apiRequest('delete', `/api/project-images/${id}`);
                getProjects();
                router.go(0);
                showToast('Image deleted successfully', 'success');
            },
        });
    };

    const getProjectList = async () => {
        try {
            const response = await apiRequest('get', '/api/project-list');
            projectList.value = response;
        } catch (errors) {
            validationErrors.value = errors;
        }
    };

    return {
        projectList,
        projects,
        project,
        getProjects,
        getProjectList,
        getProject,
        storeProject,
        updateProject,
        deleteProject,
        deleteProjectImage,
        validationErrors,
        isLoading,
    };
}
