import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import styles from '../styles/Header.module.css';
import userAvatar from '../assets/avatar.png';

const Header: React.FC = () => {
    const userLoggedIn = true; // Change this based on your authentication logic
    const userName = "Yotam Gat"; // Replace with actual user name
    const userId = "1"; // Replace with actual user ID

    return (
        <header className={styles.header}>
            <div className={styles.left}>
                <h1>Res Blog</h1>
            </div>
            <div className={styles.right}>
                <Link to="/" className={styles.homeButton}>
                    <FaHome />
                </Link>
                {userLoggedIn ? (
                    <>
                        <Link to={`/profile/${userId}`} className={styles.userLink}>
                            <span className={styles.userName}>{userName}</span>
                            <img src={userAvatar} alt="User Avatar" className={styles.avatar} />
                        </Link>
                        <button className={styles.logoutButton}>Logout</button>
                    </>
                ) : (
                    
                    <Link to="/login" >
                        <button className={styles.loginButton}>Login</button>
                    </Link>
                    
                )}
            </div>
        </header>
    );
};

export default Header;