import axios from 'axios';

const adminAxios = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json'
    }
});
adminAxios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('adminToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);
adminAxios.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            try {
                const refreshToken = localStorage.getItem('adminRefreshToken');
                if (!refreshToken) {
                    throw new Error('No refresh token');
                }

                // Get new access token
                const response = await axios.post(
                    `${import.meta.env.VITE_BACKEND_URL}/api/token/refresh/`,
                    { refresh: refreshToken }
                );

                // Store new token
                localStorage.setItem('adminToken', response.data.access);

                // Retry original request
                error.config.headers.Authorization = `Bearer ${response.data.access}`;
                return adminAxios(error.config);

            } catch (refreshError) {
                // Clear tokens and redirect to login
                localStorage.removeItem('adminToken');
                localStorage.removeItem('adminRefreshToken');
                window.location.href = '/admin/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default adminAxios;