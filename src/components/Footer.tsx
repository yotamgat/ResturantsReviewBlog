import React from 'react';
import styles from '../styles/Footer.module.css';

const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <p className={styles.text}>
                    Made by Yotam Gat
                </p>
                <p className={styles.text}>
                    Copyright ©{' '}
                    <a>
                        Yotam Gat
                    </a>{' '}
                    {new Date().getFullYear()}
                    {'.'}
                </p>
            </div>
        </footer>
    );
};

export default Footer;

