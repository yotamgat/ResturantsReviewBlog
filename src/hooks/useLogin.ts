import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser, loginWithGoogle } from '../services/auth-service';

import { useUserContext } from '../data/UserContext';

export const useLogin = () => {
    const { refreshUser } = useUserContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'email') setEmail(value);
        if (name === 'password') setPassword(value);
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await loginUser({ email, password });
            
            // Store user information in localStorage
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);
            localStorage.setItem('username', response.username);
            localStorage.setItem('userId', response._id);

            // Refresh user info in the context
            await refreshUser();

            toast.success('Login successful!');
            
            navigate('/');
        } catch (err: any) {
            setError(err.message || 'Login failed. Please try again.');
        }
    };

    const handleGoogleLoginSuccess = async (response: any) => {
        try {
            const googleResponse = await loginWithGoogle(response.credential);
            
            // Store user information in localStorage
            localStorage.setItem('accessToken', googleResponse.accessToken);
            localStorage.setItem('refreshToken', googleResponse.refreshToken);
            localStorage.setItem('username', googleResponse.username);
            localStorage.setItem('userId', googleResponse._id);

            // Refresh user info in the context
            await refreshUser();

            toast.success('Google login successful!');
            navigate('/');
        } catch (err: any) {
            setError(err.message || 'Google login failed.');
        }
    };

    const handleGoogleLoginError = () => {
        toast.error('Google login failed.');
    };

    return {
        email,
        password,
        handleInputChange,
        handleLogin,
        handleGoogleLoginSuccess,
        handleGoogleLoginError,
        error,
    };
};
