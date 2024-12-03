import { notification } from 'ant-design-vue';

const showToast = (description, type = 'success', message = 'Success') => {
    type = type.toLowerCase();
    if (!message || message.length == 0 || type != 'success') {
        message = type.substring(0, 1).toUpperCase() + type.substring(1);
    }
    notification[type]({
        message,
        description,
        placement: 'topRight',
        duration: 3, // Duration in seconds
    });
};

export default showToast;
