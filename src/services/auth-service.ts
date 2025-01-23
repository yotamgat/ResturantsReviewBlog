export interface RegisterData {
    username: string;
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