import React from 'react';
import styles from '../styles/Comments.module.css';
import { useComments } from '../hooks/useComments';



interface CommentsProps {
    comments?: Comment[];
    postId: string;
}

const Comments: React.FC<CommentsProps> = ({ postId }) => {

    console.log("Entered Comments.tsx, postId: ",postId);
    const { comments, isLoading, error } = useComments(postId);

    if (isLoading) return <p>Loading comments...</p>;
    if (error) return <p>Error loading comments: {error}</p>;

    if (comments.length === 0) {
        return <p>No comments yet. Be the first to comment!</p>;
    }
   
    return (
        <div className={styles.comments}>
            <h3>Comments:</h3>
            {comments.map((comment) => (
                <div key={comment._id} className={styles.comment}>
                    <img
                        src={comment.userImg }
                        alt="User Avatar"
                        className={styles.avatar}
                    />
                    <div>
                        <span className={styles.userName}>{comment.username}</span>
                        <p className={styles.commentContent}>{comment.comment}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Comments;