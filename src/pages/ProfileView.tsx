
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/ProfileView.module.css';
import userAvatar from '../assets/avatar.png'; // Adjust the path as needed
import { FaEdit} from 'react-icons/fa';
import Posts from '../components/Posts';
import { Post, posts as initialPosts } from '../data/PostsTest';



const ProfileView: React.FC = () => {
    const [posts] = useState<Post[]>(initialPosts);
    const userName = "Yotam Gat"; // Replace with actual user name
    const loggedOwnerId: number = 1; 
    const handleEdit = (postId: number) => {
        // Implement edit functionality
    };

    const userPosts = posts.filter(post => post.ownerId === loggedOwnerId);


    return (
        <div className={styles.profileView}>
            <Header />
            <div className={styles.profileContent}>
                <div className={styles.profileInfo}>
                    <img src={userAvatar} alt="User Avatar" className={styles.avatar} />
                    <h2 className={styles.userName}>{userName}</h2>
                    <button className={styles.editButton}>
                        <FaEdit /> Edit Profile
                    </button>
                </div>
                
                <div className={styles.userPosts}>
                    <h2>My Posts</h2>
                    <Posts posts={userPosts} />
                </div>
                
            </div>
            <Footer />
        </div>
    );
};



export default ProfileView;