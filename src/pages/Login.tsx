import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/Login.module.css'; // Assuming you have a CSS module for styles
import Header from '../components/Header';
import Footer from '../components/Footer';
import { toast } from 'react-toastify';
import LoggedUsersTest from '../data/LoggedUsersTest';
import {GoogleOAuthProvider,GoogleLogin } from '@react-oauth/google';


const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const user  = LoggedUsersTest.find(user => user.email === email && user.password === password);
        if (user) {
            // Redirect to BlogHome
            navigate('/');
        } else {
            toast.error('Invalid email or password');
            
           
        }
    };
    const handleGoogleLoginSuccess = (response: any) => {
        console.log('Google login success:', response);
        // Implement Google login functionality
    };

    const handleGoogleLoginError = () => {
        console.error('Google login failure:');
        // Handle Google login failure
    };

    return (
        <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
            <div>
                <Header />
                <div className={styles.loginContainer}>
                    <h2>Login</h2>
                    <form onSubmit={handleLogin} className={styles.loginForm}>
                        <div className={styles.formGroup}>
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className={styles.loginButton}>Login</button>
                    </form>
                    <div className={styles.googleLogin}>
                        <GoogleLogin
                            onSuccess={handleGoogleLoginSuccess}
                            onError={handleGoogleLoginError}
                        />
                    </div>
                    <p className={styles.registerPrompt}>
                        Don't have an account? <Link to="/register" className={styles.registerLink}>Register</Link>
                    </p>
                </div>
                <Footer />
            </div>
        </GoogleOAuthProvider>
    );
};

export default Login;