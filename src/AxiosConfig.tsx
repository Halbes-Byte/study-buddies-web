import axios from 'axios';
/*import keycloak from "./Keycloak";*/

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
});

/*axiosInstance.interceptors.request.use(
    async (config) => {
        const token = keycloak.token;
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        console.log(token);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);*/

export default axiosInstance;