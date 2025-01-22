
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
    const [isEditing, setIsEditing] = useState(false);
    //const userName = "Yotam Gat"; // Replace with actual user name
    const [userName, setUserName] = useState('Yotam Gat'); // Replace with actual user name
    const loggedOwnerId: number = 1; 
    const [avatar, setAvatar] = useState(userAvatar);
    const handleEdit = (postId: number) => {
        // Implement edit functionality
    };
   

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setAvatar(URL.createObjectURL(file));
        }
    };

    const handleSaveProfile = () => {
        // Implement save profile functionality
        setIsEditing(false);
    };
    const handleCancelEdit = () => {
        // Reset the state and exit edit mode
        setUserName('Yotam Gat'); // Reset to original user name
        setAvatar(userAvatar); // Reset to original avatar
        setIsEditing(false);
    };
    

    const userPosts = posts.filter(post => post.ownerId === loggedOwnerId);


    return (
        <div className={styles.profileView}>
            <Header />
            <div className={styles.profileContent}>
                <div className={styles.profileInfo}>
                    <img src={avatar} alt="User Avatar" className={styles.avatar} />
                    {isEditing ? (
                        <>
                            <input
                                type="text"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                className={styles.userNameInput}
                            />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleAvatarChange}
                                className={styles.avatarInput}
                            />
                             <div className={styles.editButtons}>
                                <button onClick={handleSaveProfile} className={styles.saveButton}>
                                    Save
                                </button>
                                <button onClick={handleCancelEdit} className={styles.cancelButton}>
                                    Cancel
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <h2 className={styles.userName}>{userName}</h2>
                            <button onClick={() => setIsEditing(true)} className={styles.editButton}>
                                <FaEdit /> Edit Profile
                            </button>
                        </>
                    )}
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