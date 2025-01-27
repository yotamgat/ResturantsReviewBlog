import apiClient from "./api-service";

export interface RegisterData {
    username: string;
    email: string;
    password: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export const registerUser = async (data: RegisterData) => {
    const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to register user');
    }

    return response.json();
};

export const loginUser = async (data: LoginData) => {
    const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Wrong username or password ');
    }

    return response.json();
};

export const loginWithGoogle = async (credential: string) => {
    const response = await fetch('http://localhost:3000/auth/googlelogin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Google login failed');
    }

    return response.json();
};

//Update user
export const updateUser = async (userData:any) => {
    console.log("Entered updateUser");
    console.log("UserData: ",userData);
    const token = localStorage.getItem('accessToken');
    const response = await apiClient.post(`/auth/user/update`, userData, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
    console.log("Finel Response: ",response);
    return response.data;
};