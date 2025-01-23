import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser, loginWithGoogle } from '../services/auth-service';

export const useLogin = () => {
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
            toast.success('Login successful!');
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);
            navigate('/');
        } catch (err: any) {
            setError(err.message || 'Login failed. Please try again.');
        }
    };

    const handleGoogleLoginSuccess = async (response: any) => {
        try {
            const googleResponse = await loginWithGoogle(response.credential);
            toast.success('Google login successful!');
            localStorage.setItem('accessToken', googleResponse.accessToken);
            localStorage.setItem('refreshToken', googleResponse.refreshToken);
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
