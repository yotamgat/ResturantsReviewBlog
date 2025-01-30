import React, { useState } from 'react';
import { usePosts } from '../hooks/usePosts';
import { useNavigate } from 'react-router-dom';
import { FaThumbsUp, FaComment, FaEdit, FaTrash } from 'react-icons/fa';
import styles from '../styles/Posts.module.css';
import Comments from '../pages/Comments';
import { Post } from '../hooks/usePosts';
import { useUserContext } from '../data/UserContext';
import DOMPurify from "dompurify";


export interface PostsProps {

    posts?: Post[];
    sortBy?: 'new' | 'likes'; // Accept sort order as a prop
    handleLike: (postId: string, userId: string) => void; // Accept handleLike prop

}

const Posts: React.FC<PostsProps> = ({posts, sortBy,handleLike}) => {
    const {posts: allPosts, loading, error, userId,handleDeletePost } = usePosts();
    const [showComments, setShowComments] = useState<{ [key: string]: boolean }>({});
    const [editingPostId] = useState<string | null>(null);
    const [newContent, setNewContent] = useState<string>('');
    const {user} = useUserContext();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1); // For pagination
    const postsPerPage = 3; // Number of posts to show per page

    // Determine posts to render
    const postsToRender = posts || allPosts; // Use the `posts` prop if passed, otherwise use `allPosts`

    // Sorting Logic
    const sortedPosts = [...postsToRender].sort((a, b) => {
        if (sortBy === 'likes') {
            return b.numOfLikes - a.numOfLikes; // Sort by likes (descending)
        }
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); // Sort by newest first
    });

    // Pagination Logic
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const currentPosts = sortedPosts.slice(startIndex, endIndex);
    // Calculate total pages
    const totalPages = Math.ceil(postsToRender.length / postsPerPage);
    

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
   
    const goToPage = (page: number) => {
        if (page > 0 && page <= totalPages) {
          setCurrentPage(page);
      
          // Scroll to the top of the page
          window.scrollTo({
            top: 0,
            behavior: 'smooth', // Smooth scrolling effect
          });
        }
      };
   

    if (loading) return <div>Loading posts...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className={styles.posts}>
          {/* Render current posts */}
          {currentPosts.map((post) => {
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
                  {post.photo && <img src={post.photo} alt="Post" className={styles.postPhoto} />}
                  {editingPostId === post._id ? (
                    <textarea
                      value={newContent}
                      onChange={(e) => setNewContent(e.target.value)}
                      className={styles.editTextarea}
                    />
                  ) : (
                    <div 
                        className={styles.postContent} 
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }} 
                    />
                  )}
                </div>
    
                {/* Post Footer */}
                <div className={styles.postFooter}>
                  <div className={styles.postFooterLeft}>
                    <button
                      onClick={() => handleLike(post._id, user?._id || '')}
                      className={styles.actionButton}
                      style={{
                        color: userHasLiked ? 'red' : 'black', // Toggle like button color
                      }}
                    >
                      <FaThumbsUp /> {post.numOfLikes}
                    </button>
                    <button onClick={() => handleComment(post._id)} className={styles.actionButton}>
                      <FaComment /> {post.numOfComments}
                    </button>
                  </div>
                  {user?._id === post.owner && (
                    <div className={styles.postActions}>
                      {editingPostId === post._id ? (
                        <button className={styles.actionButton}>Save</button>
                      ) : (
                        <button onClick={() => handleEditPost(post._id)} className={styles.actionButton}>
                          <FaEdit />
                        </button>
                      )}
                      <button onClick={() => handleDeletePost(post._id)} className={styles.actionButton}>
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
            {/* Pagination Controls */}
            <div className={styles.pagination}>
                {/* Previous Button */}
                <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                    key={index}
                    onClick={() => goToPage(index + 1)}
                    className={currentPage === index + 1 ? styles.activePage : ''}
                    >
                    {index + 1}
                    </button>
                ))}

                {/* Next Button */}
                <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Posts;
