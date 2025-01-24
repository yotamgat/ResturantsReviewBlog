import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaHome } from 'react-icons/fa';
import styles from '../styles/Header.module.css';
import { useUserContext } from '../data/UserContext';

interface HeaderProps {
    showNewPostButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showNewPostButton })=> {
    
    const { user, setUser } = useUserContext();
    const navigate = useNavigate();
    const isLogIn = !!localStorage.getItem('accessToken'); // Check if user is logged in based on token
  
    // Handle logout
    const handleLogout = async () => {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
            toast.error('No refresh token found.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refreshToken }),
            });

            if (response.ok) {
                // Clear local storage and navigate to login
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('username');
                localStorage.removeItem('userId');
                setUser(null);
                toast.success('Logged out successfully!');
                navigate('/');
            } else {
                const errorData = await response.json();
                toast.error(errorData.message || 'Logout failed.');
            }
        } catch (error) {
            toast.error('An error occurred while logging out.');
            console.error('Logout error:', error);
        }
    };

    return (
        <header className={styles.header}>
            <div className={styles.left}>
                <h1>Res Blog</h1>
            </div>
            <div className={styles.right}>
                <Link to="/" className={styles.homeButton}>
                    <FaHome />
                </Link>
                {isLogIn && user ? (
                    <>
                        <Link to={`/profile/${user.username}`} className={styles.userLink}>
                            <span className={styles.userName}>{user.username}</span>
                            <img src={user.avatarUrl} alt="User Avatar" className={styles.avatar} />
                        </Link>
                        {showNewPostButton && (
                            <Link to="/new-post" className={styles.newPostButton}>
                                New Post
                            </Link>
                        )}
                        <button onClick={handleLogout} className={styles.logoutButton}>
                            Logout
                        </button>
                    </>
                ) : (
                    <Link to="/login">
                        <button className={styles.loginButton}>Login</button>
                    </Link>
                )}
            </div>
        </header>
    );
};

export default Header;