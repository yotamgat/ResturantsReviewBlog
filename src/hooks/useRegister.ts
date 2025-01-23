import { useState } from 'react';
import { toast } from 'react-toastify';
import { registerUser } from '../services/auth-service';
import { useNavigate } from 'react-router-dom';

export const useRegister = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        switch (name) {
            case 'username':
                setUsername(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
            case 'confirmPassword':
                setConfirmPassword(value);
                break;
            default:
                break;
        }
    };
  

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await registerUser({ username, email, password }); // Get the response
            setSuccess(response.message || 'Registration successful!'); // Use the message from the backend if provided
            setError('');
            setUsername('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            toast.success(response.message || 'Registration successful!');
            navigate('/login');
        } catch (err:any) {
            toast.error(err.message || 'Registration failed. Please try again.');
            setSuccess('');
        }
        
    };

    return {
        username,
        email,
        password,
        confirmPassword,
        handleInputChange,
        handleRegister,
        error,
        success,
    };
};
