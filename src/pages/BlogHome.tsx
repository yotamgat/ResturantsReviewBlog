import React, { useState } from 'react';
import Header from '../components/Header';
import Posts from '../components/Posts';
import styles from '../styles/BlogHome.module.css';
import Footer from '../components/Footer';
import { usePosts } from '../hooks/usePosts';

const BlogHome: React.FC = () => {
    const [sortBy, setSortBy] = useState<'new' | 'likes'>('new'); // Default sorting by newest
    const { handleLike, posts } = usePosts(); // Get handleLike and posts



    return (
        <div className={styles.homePage}>
            <Header showNewPostButton={true} />
            <section className={styles.posts}>
                <h2>All Posts</h2>

                {/* Sorting Dropdown */}
                <div className={styles.sortContainer}>
                    <label htmlFor="sort">Sort by:</label>
                    <select 
                        id="sort" 
                        value={sortBy} 
                        onChange={(e) => setSortBy(e.target.value as 'new' | 'likes')}
                    >
                        <option value="new">Newest First</option>
                        <option value="likes">Most Liked</option>
                    </select>
                </div>

                {/* Pass the selected sort order to Posts component */}
                <Posts sortBy={sortBy} handleLike={handleLike} posts={posts} />
            </section>
            <Footer />
        </div>
    );
};

export default BlogHome;