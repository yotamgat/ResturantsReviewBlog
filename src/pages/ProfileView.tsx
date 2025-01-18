import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/ProfileView.module.css';
import userAvatar from '../assets/avatar.png'; // Adjust the path as needed
import { FaEdit, FaThumbsUp, FaComment, FaTrash } from 'react-icons/fa';
import uplodedPhoto1 from '../assets/food.png'; 
import uplodedPhoto2 from '../assets/food 2.jpeg'; 


interface Comment {
    id: number;
    userName: string;
    userAvatar: string;
    content: string;
}

interface Post {
    id: number;
    userName: string;
    userAvatar: string;
    content: string;
    photo: string;
    comments: Comment[];
    likes: number;
}

const ProfileView: React.FC = () => {
    useParams<{ userId: string }>();
    const userName = "Yotam Gat"; // Replace with actual user name
    const userPosts: Post[] = [
        {
            id: 1,
            userName: "",
            userAvatar: "",
            content: 'The Margherita Pizza at Bella Italia is simplicity at its finest. The thin, wood-fired crust is perfectly crisp on the outside and soft in the middle. Topped with rich San Marzano tomato sauce, creamy mozzarella, and fresh basil leaves, every bite feels like a trip to Naples. The balance of flavors is spot on—no ingredient overpowers the other. My only critique? A drizzle of olive oil could have elevated it to perfection.',
            photo: uplodedPhoto1,
            comments: [
                {
                    id: 1,
                    userName: 'Doctor Sho',
                    userAvatar: userAvatar,
                    content: 'I totally agree! The post is amazing.'
                },
                {
                    id: 1,
                    userName: 'Shilo Amar',
                    userAvatar: userAvatar,
                    content: 'I totally agree! The post is amazing.'
                }
            ],
            likes: 10
        },
        {
            id: 1,
            userName: 'John Doe',
            userAvatar: userAvatar,
            content: 'This is a sample post content.',
            photo: uplodedPhoto2,
            comments: [
                {
                    id: 1,
                    userName: 'Doctor Sho',
                    userAvatar: userAvatar,
                    content: 'I totally agree! The post is amazing.'
                },
                {
                    id: 1,
                    userName: 'Shilo Amar',
                    userAvatar: userAvatar,
                    content: 'I totally agree! The post is amazing.'
                }
            ],
            likes: 10
        },
       
    ];

    const [showComments, setShowComments] = useState<{ [key: number]: boolean }>({});

    const handleCommentToggle = (postId: number) => {
        setShowComments(prevState => ({
            ...prevState,
            [postId]: !prevState[postId]
        }));
        
    };
    const handleEdit = (postId: number) => {
        // Implement edit functionality
    };

    const handleDelete = (postId: number) => {
        // Implement delete functionality
    };

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
                    {userPosts.map(post => (
                        <div key={post.id} className={styles.post}>
                            <div className={styles.postActions}>
                                <button onClick={() => handleEdit(post.id)} className={styles.actionButton}>
                                    <FaEdit />
                                </button>
                                <button onClick={() => handleDelete(post.id)} className={styles.actionButton}>
                                    <FaTrash />
                                </button>
                            </div>
                            <div className={styles.postBody}>
                                <img src={post.photo} alt="Post" className={styles.postPhoto} />
                                <p className={styles.postContent}>{post.content}</p>
                            </div>
                            <div className={styles.postFooter}>
                                <div className={styles.postFooterLeft}>
                                    <button className={styles.actionButton}>
                                        <FaThumbsUp /> {post.likes}
                                    </button>
                                    <button 
                                        className={styles.actionButton} 
                                        onClick={() => handleCommentToggle(post.id)}
                                    >
                                        <FaComment /> {post.comments.length}
                                    </button>
                                </div>
                            </div>
                            {showComments[post.id] && (
                                <div className={styles.comments}>
                                    <h3>Comments:</h3>
                                    {post.comments.map(comment => (
                                        <div key={comment.id} className={styles.comment}>
                                            <img src={comment.userAvatar} alt="User Avatar" className={styles.commentAvatar} />
                                            <div>
                                                <span className={styles.commentUserName}>{comment.userName}</span>
                                                <p className={styles.commentContent}>{comment.content}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};



export default ProfileView;