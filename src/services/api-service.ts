import axios from 'axios';
export const baseURL = 'http://localhost:3000';

// Create an Axios instance
const apiClient = axios.create({
    baseURL: `${baseURL}`, // Replace with your actual backend URL
    
    //timeout: 10000, // Timeout in milliseconds
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add Authorization dynamically for authenticated requests
apiClient.interceptors.request.use(
    config => {
        // Add authorization token if available
        const token = localStorage.getItem('accessToken'); // Example: Retrieve token from localStorage
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