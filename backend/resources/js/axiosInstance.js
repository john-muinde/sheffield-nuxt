import axios from 'axios';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// Configure NProgress
NProgress.configure({
    showSpinner: false,
    minimum: 0.1,
    easing: 'ease',
    speed: 500,
    trickleSpeed: 200,
});

// Custom styles for the progress bar and loading indicator
const styles = `
    /* Progress bar styles */
    #nprogress .bar {
        background: #c02434 !important;
        height: 3px !important;
        z-index: 9999 !important;
        box-shadow: 0 0 10px rgba(192, 36, 52, 0.7);
        background-image: linear-gradient(to right, #000000, #c02434, #ffffff) !important;
        background-size: 200% !important;
        animation: gradientMove 2s linear infinite !important;
    }

    #nprogress .peg {
        box-shadow: 0 0 10px #c02434, 0 0 5px #c02434 !important;
    }

    /* Custom spinner */
    #nprogress .spinner {
        display: block;
        position: fixed;
        z-index: 9999;
        top: 15px;
        right: 15px;
        width: 70px;
        height: 70px;
    }

    #nprogress .spinner-icon {
        width: 30px !important;
        height: 30px !important;
        border: solid 3px transparent !important;
        border-top-color: #c02434 !important;
        border-left-color: #c02434 !important;
        border-radius: 50% !important;
        animation: loading-bar-spinner 400ms linear infinite !important;
    }

    /* Loading overlay for requests */
    .request-loading-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(2px);
        z-index: 9998;
        display: none;
        justify-content: center;
        align-items: center;
    }

    .request-loading-overlay.active {
        display: flex;
    }

    .loading-pulse {
        width: 40px;
        height: 40px;
        background: #c02434;
        border-radius: 50%;
        animation: pulse 1s ease-in-out infinite;
    }

    /* Animations */
    @keyframes gradientMove {
        0% { background-position: 100% 0; }
        100% { background-position: -100% 0; }
    }

    @keyframes pulse {
        0% { transform: scale(0.8); opacity: 0.5; }
        50% { transform: scale(1.2); opacity: 0.8; }
        100% { transform: scale(0.8); opacity: 0.5; }
    }

    @keyframes loading-bar-spinner {
        0%   { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

// Add styles to head
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

// Create loading overlay element
const createLoadingOverlay = () => {
    const overlay = document.createElement('div');
    overlay.className = 'request-loading-overlay';
    const pulse = document.createElement('div');
    pulse.className = 'loading-pulse';
    overlay.appendChild(pulse);
    document.body.appendChild(overlay);
    return overlay;
};

const loadingOverlay = createLoadingOverlay();

// Request counter to handle multiple concurrent requests
let activeRequests = 0;

const showLoading = () => {
    activeRequests++;
    loadingOverlay.classList.add('active');
};

const hideLoading = () => {
    activeRequests--;
    if (activeRequests <= 0) {
        activeRequests = 0;
        loadingOverlay.classList.remove('active');
    }
};

// Create axios instance
const axiosInstance = axios.create({
    baseURL: '/',
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        if (!config.headers?.['x-no-loader']) {
            NProgress.start();
            // showLoading();
        }

        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        if (!config.headers['Content-Type']) {
            config.headers['Content-Type'] = 'application/json';
        }

        return config;
    },
    (error) => {
        // hideLoading();
        NProgress.done();
        return Promise.reject(error);
    },
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        if (!response.config.headers?.['x-no-loader']) {
            hideLoading();
            NProgress.done();
        }
        return response;
    },
    (error) => {
        hideLoading();
        NProgress.done();
        return Promise.reject(error);
    },
);

// Router navigation guard for page transitions
export const setupRouterProgress = (router) => {
    router.beforeEach((to, from, next) => {
        NProgress.start();
        next();
    });

    router.afterEach(() => {
        NProgress.done();
    });

    router.onError(() => {
        NProgress.done();
    });
};

export default axiosInstance;
