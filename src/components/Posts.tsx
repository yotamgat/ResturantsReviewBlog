import React, { useState } from 'react';
import { FaEdit, FaTrash, FaThumbsUp, FaComment } from 'react-icons/fa';
import styles from '../styles/Posts.module.css';
import userAvatar from '../assets/avatar.png'; // Adjust the path as needed
import uplodedPhoto1 from '../assets/food.png'; 
import uplodedPhoto2 from '../assets/food 2.jpeg'; 
import uplodedPhoto3 from '../assets/food 3.jpeg'; 

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

const Posts: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([
        {
            id: 1,
            userName: 'Yotam Gat',
            userAvatar: userAvatar,
            content: 'The Margherita Pizza at Bella Italia is simplicity at its finest. The thin, wood-fired crust is perfectly crisp on the outside and soft in the middle. Topped with rich San Marzano tomato sauce, creamy mozzarella, and fresh basil leaves, every bite feels like a trip to Naples. The balance of flavors is spot on—no ingredient overpowers the other. My only critique? A drizzle of olive oil could have elevated it to perfection.',
            photo: uplodedPhoto1,
            comments: [
                {
                    id: 1,
                    userName: 'Ido Amar',
                    userAvatar: userAvatar,
                    content: 'I totally agree! The pizza is amazing.'
                },
                {
                    id: 1,
                    userName: 'Israel Israeli',
                    userAvatar: userAvatar,
                    content: 'I didnt understand.'
                }
            ],
            likes: 10,
        },
        {
            id: 2,
            userName: 'John Doe',
            userAvatar: userAvatar,
            content: 'The Spicy Tuna Roll at Sushi Zen is good but doesnt quite hit the mark. The tuna is fresh, and the rice is well-seasoned, but the spice level is underwhelming. I expected more of a kick! Presentation was beautiful, with a sprinkle of sesame seeds and a wasabi garnish. While the roll was tasty, it felt a bit safe for something labeled "spicy."',
            photo: uplodedPhoto2,
            comments: [
                {
                id: 1,
                userName: 'Yari Meri',
                userAvatar: userAvatar,
                content: 'I didnt like this food.'
                },
            ],
            likes: 2,
        },
        {
            id: 3,
            userName: 'Dir Le',
            userAvatar: userAvatar,
            content: 'Wow. The Chocolate Lava Cake at Sweet Cravings Café is pure indulgence! The outer cake is soft and warm, but once you cut in, rich molten chocolate flows out like a dream. Its served with a scoop of vanilla bean ice cream that perfectly balances the decadence. The slight dusting of powdered sugar on top adds a delicate touch.',
            photo: uplodedPhoto3,
            comments: [],
            likes: 5,
        }
    ]);
    const [showComments, setShowComments] = useState<{ [key: number]: boolean }>({});

    const handleDelete = (id: number) => {
        setPosts(posts.filter(post => post.id !== id));
    };

    const handleLike = (id: number) => {
        // Implement like functionality
    };

    const handleEdit = (id: number) => {
        // Implement edit functionality
    };

  
    const handleComment = (id: number) => {
        setShowComments(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    return (
        <div className={styles.posts}>
            {posts.map(post => (
                <div key={post.id} className={styles.post}>
                    <div className={styles.postHeader}>
                        <img src={post.userAvatar} alt="User Avatar" className={styles.avatar} />
                        <span className={styles.userName}>{post.userName}</span>
                        <div className={styles.postActions}>
                            <button onClick={() => handleEdit(post.id)} className={styles.actionButton}>
                                <FaEdit />
                            </button>
                            <button onClick={() => handleDelete(post.id)} className={styles.actionButton}>
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                    <div className={styles.postBody}>
                        <img src={post.photo} alt="Post" className={styles.postPhoto} />
                        <p className={styles.postContent}>{post.content}</p>
                    </div>
                    <div className={styles.postFooter}>
                        <div className={styles.postFooterLeft}>
                            <button onClick={() => handleLike(post.id)} className={styles.actionButton}>
                                <FaThumbsUp /> {post.likes}
                            </button>
                            <button onClick={() => handleComment(post.id)} className={styles.actionButton}>
                                <FaComment /> {post.comments.length}
                            </button>
                        </div>
                    </div>
                    {showComments[post.id] && (
                        <div className={styles.comments}>
                            <h3>Comments:</h3>
                            {post.comments.map(comment => (
                                <div key={comment.id} className={styles.comment}>
                                    <img src={comment.userAvatar} alt="User Avatar" className={styles.avatar} />
                                    <div>
                                        <span className={styles.userName}>{comment.userName}</span>
                                        <p className={styles.commentContent}>{comment.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Posts;