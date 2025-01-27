import React, { useState } from 'react';
import styles from '../styles/Comments.module.css';
import { useComments } from '../hooks/useComments';
import { postComment, updateComment } from '../services/comment-service';
import { useUserContext } from '../data/UserContext';
import { FaEdit,FaTrash } from 'react-icons/fa';



interface CommentsProps {
    comments?: Comment[];
    postId: string;
}

const Comments: React.FC<CommentsProps> = ({ postId }) => {
    console.log("Entered Comments.tsx, postId: ",postId);

    const { comments, setComments, isLoading, error,handleDeleteComment } = useComments(postId);
    const [newComment, setNewComment] = useState<string>(''); // State for the new comment
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // Submission loading state
    const { user } = useUserContext();
    const [editingCommentId, setEditingCommentId] = useState<string | null>(null); // State for editing comment
    const [editingText, setEditingText] = useState<string>(''); // State for the updated comment text


    const handleAddComment = async () => {
        if (!newComment.trim()) {
            alert('Comment cannot be empty!');
            return;
        }

        try {
            setIsSubmitting(true);

            // Create the new comment payload
            const userId = user?._id
            const username = user?.username
            const userImg = user?.avatarUrl

            const commentPayload = {
                postId,
                comment: newComment,
                owner: userId || '',
                username: username || 'Anonymous',
                userImg: userImg || '',
            };
            console.log("CommentPayload: ",commentPayload);

            const addedComment = await postComment(commentPayload); // Call the backend to add the comment

            // Update the comments state to include the new comment
            setComments((prevComments) => [...prevComments, addedComment]);

            
            setNewComment(''); // Clear the input
        } catch (error) {
            console.error('Error adding comment:', error);
            alert('Failed to add comment. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

        // Handle editing a comment
    const handleEditComment = async (commentId: string) => {
        if (!editingText.trim()) {
            alert('Comment cannot be empty!');
            return;
        }

        try {
            setIsSubmitting(true);

            // Create the payload for updating the comment
            const commentData = {
                 _id: commentId,
                 comment: editingText,
                 postId: postId,
                 ownerId: user?._id,
                 userImg: user?.avatarUrl,
                 username: user?.username,
                 

            };

            // Call the backend to update the comment
            const updatedComment = await updateComment(commentData, commentId);

            // Update the comments state with the updated comment
            setComments((prevComments) =>
                prevComments.map((comment) =>
                    comment._id === commentId ? { ...comment, comment: updatedComment.comment } : comment
                )
            );

            setEditingCommentId(null); // Exit editing mode
            setEditingText(''); // Clear editing text
        } catch (error) {
            console.error('Error updating comment:', error);
            alert('Failed to update comment. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };
    
    
    const handleCancelEdit = () => {
        setEditingCommentId(null); // Exit editing mode
        setEditingText(''); // Clear editing text
    };

    if (isLoading) return <p>Loading comments...</p>;
    if (error) return <p>Error loading comments: {error}</p>;
   
    return (
        <div className={styles.comments}>
            <h3>Comments:</h3>

            {/* Display comments */}
            {comments.length > 0 ? (
                comments.map((comment) => (
                    <div key={comment._id} className={styles.comment}>
                        <img
                            src={comment.userImg}
                            alt="User Avatar"
                            className={styles.avatar}
                        />
                        <div className={styles.commentContentWrapper}>
                            <div>
                                <span className={styles.userName}>{comment.username}</span>
                                {editingCommentId === comment._id ? (
                                    // Edit mode for the comment
                                    <textarea
                                        value={editingText}
                                        onChange={(e) => setEditingText(e.target.value)}
                                        className={styles.editInput}
                                    />
                                ) : (
                                    <p className={styles.commentContent}>{comment.comment}</p>
                                )}
                            </div>

                            {/* Edit button for the owner */}
                            {user?._id === comment.owner && (
                                <div className={styles.commentActions}>
                                    {editingCommentId === comment._id ? (
                                       <>
                                            <button
                                                onClick={() => handleEditComment(comment._id as string)}
                                                disabled={isSubmitting}
                                                className={styles.saveButton}
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={handleCancelEdit}
                                                className={styles.cancelButton}
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        // Edit button to enable editing mode
                                        <>
                                            <FaEdit
                                                onClick={() => {
                                                    setEditingCommentId(comment._id as string);
                                                    setEditingText(comment.comment); // Prefill the existing comment text
                                                }}
                                                className={styles.editIcon}
                                            />
                                            <FaTrash
                                                onClick={() => handleDeleteComment(comment._id as string)}
                                                className={styles.deleteIcon}
                                            />
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                ))
            ) : (
                <p>No comments yet. Be the first to comment!</p>
            )}

            {/* Add new comment section */}
            <div className={styles.addComment}>
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    className={styles.commentInput}
                />
                <button
                    onClick={handleAddComment}
                    disabled={isSubmitting}
                    className={styles.submitButton}
                >
                    {isSubmitting ? 'Adding...' : 'Add Comment'}
                </button>
            </div>
        </div>
    );
};

export default Comments;