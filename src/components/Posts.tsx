import React, { useState } from 'react';
import { usePosts } from '../hooks/usePosts';
import { useNavigate } from 'react-router-dom';
import { FaThumbsUp, FaComment, FaEdit, FaTrash } from 'react-icons/fa';
import styles from '../styles/Posts.module.css';
import Comments from '../pages/Comments';
import { Post } from '../hooks/usePosts';
import { useUserContext } from '../data/UserContext';


export interface PostsProps {

    posts?: Post[];

}

const Posts: React.FC<PostsProps> = ({posts}) => {
    const {posts: allPosts, loading, error, handleLike, userId,handleDeletePost, setPosts } = usePosts();
    const [showComments, setShowComments] = useState<{ [key: string]: boolean }>({});
    const [editingPostId, setEditingPostId] = useState<string | null>(null);
    const [newContent, setNewContent] = useState<string>('');
    const {user} = useUserContext();
    const navigate = useNavigate();
    

    const handleComment = (id: string) => {
        console.log("Toggling comments for postId: ", id);
        setShowComments(prevState => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    const handleEditPost = (postId: string) => {
        navigate(`/edit-post/${postId}`);
    };
    const handleSaveEdit = async () => {
        //implament
    }
    const postsToRender = posts || allPosts; // Use the `posts` prop if passed, otherwise use `allPosts`

    if (loading) return <div>Loading posts...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className={styles.posts}>
            {postsToRender.map((post) => {
                const userHasLiked = post.likedBy.includes(userId || '');
                return (
                <div key={post._id} className={styles.post}>
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
                        {editingPostId === post._id ? (
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
                            <button onClick={() => handleLike(post._id,user?._id || '')} className={styles.actionButton}
                                style={{
                                    color: userHasLiked ? 'red' : 'black', // Toggle like button color
                                }}>
                                <FaThumbsUp /> {post.numOfLikes}
                            </button>
                            <button onClick={() => handleComment(post._id)} className={styles.actionButton}>
                                <FaComment /> {post.numOfComments}
                            </button>
                        </div>
                        {user?._id === post.owner && (
                            <div className={styles.postActions}>
                                {editingPostId === post._id ? (
                                    <button onClick={() => handleSaveEdit()} className={styles.actionButton}>
                                        Save
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => {handleEditPost(post._id);}}
                                        className={styles.actionButton}
                                    >
                                        <FaEdit />
                                    </button>
                                )}
                                <button
                                 onClick={() => handleDeletePost(post._id)}
                                 className={styles.actionButton}>
                                    <FaTrash />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Comments Section */}
                   
                    {showComments[post._id] && <Comments postId={post._id} />}
                </div>
              );
            })}
        </div>
    );
};

export default Posts;
