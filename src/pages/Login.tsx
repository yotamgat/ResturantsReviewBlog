import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Login.module.css'; // Assuming you have a CSS module for styles
import Header from '../components/Header';
import Footer from '../components/Footer';
//import { toast } from 'react-toastify';

import {GoogleLogin } from '@react-oauth/google';
import { useLogin } from '../hooks/useLogin';



const Login: React.FC = () => {
    const {
        email,
        password,
        handleInputChange,
        handleLogin,
        handleGoogleLoginSuccess,
        handleGoogleLoginError,
        error,
    } = useLogin();


    return (
        <div className={styles.loginPage}>
            <Header />
            <div className={styles.loginContainer}>
                <h2>Login</h2>
                <form onSubmit={handleLogin} className={styles.loginForm}>
                    {error && <p className={styles.error}>{error}</p>}
                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={handleInputChange}
                            name="email"
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={handleInputChange}
                            name="password"
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
                    Don't have an account?{' '}
                    <Link to="/register" className={styles.registerLink}>
                        Register
                    </Link>
                </p>
            </div>
            <Footer />
        </div>
    
    );
};

export default Login;