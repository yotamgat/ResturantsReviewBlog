import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useRegister } from '../hooks/useRegister';
import styles from '../styles/Register.module.css'; // Assuming you have a CSS module for styles

const Register: React.FC = () => {

    const { username, email, password, confirmPassword, handleInputChange, handleRegister, error, success } =
        useRegister();

    return (
        <div className={styles.registerPage}>
            <Header />
            <div className={styles.registerContainer}>
                <h2>Register</h2>
                <form onSubmit={handleRegister} className={styles.registerForm}>
                    {error && <p className={styles.error}>{error}</p>}
                    {success && <p className={styles.success}>{success}</p>}
                    <div className={styles.formGroup}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={handleInputChange}
                            name="username"
                            required
                        />
                    </div>
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
                    <div className={styles.formGroup}>
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={handleInputChange}
                            name="confirmPassword"
                            required
                        />
                    </div>
                    <button type="submit" className={styles.registerButton}>
                        Register
                    </button>
                </form>
                <p className={styles.loginPrompt}>
                    Already have an account? <Link to="/login" className={styles.loginLink}>Login</Link>
                </p>
            </div>
            <Footer />
        </div>
    );
};

export default Register;