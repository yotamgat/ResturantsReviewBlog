
import axios from 'axios';

// Create an Axios instance
const apiClient = axios.create({
    baseURL: "http://localhost:3000", // Replace with your actual backend URL
    
    //timeout: 10000, // Timeout in milliseconds
    //headers: {
    //    'Content-Type': 'application/json',
    //},
});

// Add a request interceptor (e.g., add auth token)
apiClient.interceptors.request.use(
    config => {
        // Add authorization token if available
        const token = localStorage.getItem('authToken'); // Example: Retrieve token from localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Add a response interceptor (optional)
apiClient.interceptors.response.use(
    response => response,
    error => {
        console.error('API Error:', error);
        return Promise.reject(error);
    }
);

export default apiClient;