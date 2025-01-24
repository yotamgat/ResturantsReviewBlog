import React, { useState } from 'react';
import { usePosts } from '../hooks/usePosts';
import { FaThumbsUp, FaComment, FaEdit, FaTrash } from 'react-icons/fa';
import styles from '../styles/Posts.module.css';
import Comments from '../pages/Comments';
import { useUserContext } from '../data/UserContext';

const Posts: React.FC = () => {
    const { posts, loading, error, handleLike, handleEdit } = usePosts();
    const loggedOwnerId = 1; // Replace with actual logged-in user ID
    const [showComments, setShowComments] = useState<{ [key: number]: boolean }>({});
    const [editingPostId, setEditingPostId] = useState<number | null>(null);
    const [newContent, setNewContent] = useState<string>('');
    

    const handleComment = (id: number) => {
        setShowComments(prevState => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    const handleSaveEdit = async (postId: number) => {
        await handleEdit(postId, newContent);
        setEditingPostId(null); // Exit edit mode
    };

    if (loading) return <div>Loading posts...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className={styles.posts}>
            {posts.map(post => (
                <div key={post.postId} className={styles.post}>
                    {/* Post Header */}
                    <div className={styles.postHeader}>
                        <img src={post.userImg} alt="User Avatar" className={styles.avatar} />
                        <span className={styles.userName}>{post.username}</span>
                    </div>

                    {/* Post Body */}
                    <div className={styles.postBody}>
                        {/* Display photo if it exists */}
                        {post.photo && (
                            <img src={post.photo} alt="Post" className={styles.postPhoto} />
                        )}
                        {editingPostId === post.postId ? (
                            <textarea
                                value={newContent}
                                onChange={e => setNewContent(e.target.value)}
                                className={styles.editTextarea}
                            />
                        ) : (
                            <p className={styles.postContent}>{post.content}</p>
                        )}
                    </div>

                    {/* Post Footer */}
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
                                {editingPostId === post.postId ? (
                                    <button onClick={() => handleSaveEdit(post.postId)} className={styles.actionButton}>
                                        Save
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => {
                                            setEditingPostId(post.postId);
                                            setNewContent(post.content);
                                        }}
                                        className={styles.actionButton}
                                    >
                                        <FaEdit />
                                    </button>
                                )}
                                <button className={styles.actionButton}>
                                    <FaTrash />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Comments Section */}
                    {showComments[post.postId] && <Comments postId={post.postId} />}
                </div>
            ))}
        </div>
    );
};

export default Posts;
