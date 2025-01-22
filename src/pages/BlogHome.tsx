import React from 'react';

import Header from '../components/Header';
import Posts from '../components/Posts';
import styles from '../styles/BlogHome.module.css';
import Footer from '../components/Footer';

const BlogHome: React.FC = () => {
    return (
        <div className={styles.homePage}>
            <Header showNewPostButton={true}/>
            <section className={styles.posts}>
                <h2>All Posts</h2>
                <Posts />
            </section>
            <Footer />
        </div>
    );
};

export default BlogHome;