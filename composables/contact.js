import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';

export default function useContacts() {
    const contacts = ref([]);
    const contactList = ref([]);
    const contact = ref({
        name: '',
        parent_id: '',
        description: '',
        is_published: '',
    });

    const router = useRouter();
    const validationErrors = ref({});
    const isLoading = ref(false);
    const swal = inject('$swal');

    const getContacts = async (
        page = 1,
        search_id = '',
        search_title = '',
        search_parent_id = '',
        search_global = '',
        order_column = 'created_at',
        order_direction = 'desc',
    ) => {
        axios.get('/api/contacts?page=' + page +
            '&search_id=' + search_id +
            '&search_title=' + search_title +
            '&search_parent_id=' + search_parent_id +
            '&search_global=' + search_global +
            '&order_column=' + order_column +
            '&order_direction=' + order_direction)
            .then(response => {
                contacts.value = response.data;
            });
    };

    const getContact = async (id) => {
        axios.get('/api/contacts/' + id)
            .then(response => {
                contact.value = response.data.data;
            });
    };

    const storeContact = async (contact) => {
        if (isLoading.value) return;

        console.log(contact);

        isLoading.value = true;
        validationErrors.value = {};

        let serializedPost = new FormData();

        for (let item in contact) {
          if (contact.hasOwnProperty(item)) {
            serializedPost.append(item, contact[item]);
          }
        }

        const config = {
            headers: { 'content-type': 'multipart/form-data' },
        };

        axios.post('/api/contacts', serializedPost, config)
            .then(response => {
                //router.push({name: 'contact'}) //disabled due to top gap
                // Reset the form values

               if(response.data.status == 'success'){
              
                    contact.request_type = null;
                    contact.area_of_interest = null;
                    contact.surname = null;
                    contact.email = null;
                    contact.company_name = null;
                    contact.business_type = null;
                    contact.country = null;
                    contact.request = null;
                    contact.code = null;

               }

                swal({
                    icon: response.data.status,
                    title: response.data.message,
                    confirmButtonColor: '#363636',
                });
            })
            .catch(error => {
                if (error.response?.data) {
                    swal({
                        icon: 'error',
                        title: 'Error occurred when trying to submit your request please try again',
                        confirmButtonColor: '#363636',
                    });
                    validationErrors.value = error.response.data.errors;
                }
            })
            .finally(() => isLoading.value = false);
    };

   


    

    const deleteContact = async (id) => {
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
        })
            .then(result => {
                if (result.isConfirmed) {
                    axios.delete('/api/contacts/' + id)
                        .then(response => {
                            getContacts();
                            router.push({name: 'contacts.index'});
                            swal({
                                icon: 'success',
                                title: 'Contact deleted successfully',
                            });
                        })
                        .catch(error => {
                            swal({
                                icon: 'error',
                                title: 'Something went wrong',
                            });
                        });
                }
            });
    };

    
    

    const getContactList = async () => {
        axios.get('/api/contact-list')
            .then(response => {
                contactList.value = response.data.data;
            });
    };

    return {
        contactList,
        contacts,
        contact,
        getContacts,
        getContactList,
        getContact,
        storeContact,
        deleteContact,
        validationErrors,
        isLoading,
    };
}
