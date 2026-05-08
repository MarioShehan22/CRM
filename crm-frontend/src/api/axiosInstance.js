import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api",
});

axiosInstance.interceptors.request.use(
    (config) => {
        const tokenCookie = document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="));

        if (tokenCookie) {
            const tokenValue = tokenCookie.split("=")[1];

            config.headers.Authorization = `Bearer ${tokenValue}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;