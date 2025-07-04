import axios from 'axios';
import keycloak from "./Keycloak";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

let isInitialized = false;

keycloak.onReady = () => {
    isInitialized = true;
};

axiosInstance.interceptors.request.use(
    async (config) => {
        if (!keycloak.token) {
            await new Promise<void>((resolve) => {
                const interval = setInterval(() => {
                    if (keycloak.token) {
                        clearInterval(interval);
                        resolve();
                    }
                }, 100);
            });
        }
        if (keycloak.token) {
            config.headers['Authorization'] = `Bearer ${keycloak.token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;