import React, { useState } from 'react';
import userAvatar from '../assets/avatar.png';
import styles from '../styles/Comments.module.css';
import { Comment, posts as initialComments } from '../data/CommentsTest';


interface CommentsProps {
    postId: number;
}

const Comments: React.FC<CommentsProps> = ({ postId }) => {

    // Initialize state with imported comments data
    const [comments, setComments] = useState<Comment[]>(initialComments);

    // Filter comments for the given postId
    const filteredComments = comments.filter(comment => comment.postId === postId);
   
    return (
        <>
            {filteredComments.length > 0 && (
                <div className={styles.comments}>
                    <h3>Comments:</h3>
                    {filteredComments.map((comment: Comment) => (
                        <div key={comment.ownerId} className={styles.comment}>
                            <img src={comment.userAvatar} alt="User Avatar" className={styles.avatar} />
                            <div>
                                <span className={styles.userName}>{comment.userName}</span>
                                <p className={styles.commentContent}>{comment.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default Comments;