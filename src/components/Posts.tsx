import React, { useState } from 'react';
import { FaThumbsUp, FaComment,FaEdit,FaTrash } from 'react-icons/fa';
import styles from '../styles/Posts.module.css';
import Comments from '../pages/Comments';
import { Post, posts as initialPosts } from '../data/PostsTest';

interface PostsProps {
    posts?: Post[]; // Optional posts array
}

const Posts: React.FC<PostsProps> = ({ posts }) => {
  
    const [allPosts] = useState<Post[]>(initialPosts);
    const displayedPosts = posts || allPosts;
    const loggedOwnerId: number = 1; // Replace with actual logged in user ID
    const [showComments, setShowComments] = useState<{ [key: number]: boolean }>({});

    const handleDelete = (id: number) => {
       // setPosts(posts.filter(post => post.postId !== id));
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
        {displayedPosts.map(post => (
            <div key={post.postId} className={styles.post}>
                <div className={styles.postHeader}>
                    <img src={post.userAvatar} alt="User Avatar" className={styles.avatar} />
                    <span className={styles.userName}>{post.userName}</span>
                </div>
                <div className={styles.postBody}>
                    <img src={post.photo} alt="Post" className={styles.postPhoto} />
                    <p className={styles.postContent}>{post.content}</p>
                </div>
                <div className={styles.postFooter}>
                    <div className={styles.postFooterLeft}>
                        <button onClick={() => handleLike(post.postId)} className={styles.actionButton}>
                            <FaThumbsUp /> {post.numOfLikes}
                        </button>
                        <button onClick={() => handleComment(post.postId)} className={styles.actionButton}>
                            <FaComment /> {post.numOfComments}
                        </button>
                    </div>
                    {loggedOwnerId === post.ownerId && (
                        <div className={styles.postActions}>
                            <button onClick={() => handleEdit(post.postId)} className={styles.actionButton}>
                                <FaEdit />
                            </button>
                            <button onClick={() => handleDelete(post.postId)} className={styles.actionButton}>
                                <FaTrash />
                            </button>
                        </div>
                    )}
                </div>
                {showComments[post.postId] && (
                    <Comments postId={post.postId} />
                )}
            </div>
        ))}
    </div>
);
};


export default Posts;