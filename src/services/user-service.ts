import apiClient from './api-service';

export const getUserInfo = async (userId: string) => {
    const token = localStorage.getItem('accessToken');
    console.log("Enterd User ID: ",userId);
    console.log("Enterd Token: ",token);
    const response = await apiClient.get(`/auth/user`,{
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        },
    });
    console.log("Response: ",response.data);
    return response.data;
};

