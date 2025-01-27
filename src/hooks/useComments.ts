import { useState, useEffect, useCallback } from "react";
import { fetchComments} from "../services/comment-service";
import { deleteComment } from "../services/comment-service";



export interface Comment {
    _id?: string
    comment: string;
    postId: string;
    userImg: string;
    username: string;
    owner: string;
}

export const useComments = (postId: string) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const loadComments = useCallback(async () => {
        try {
            setIsLoading(true);
            console.log("Entered loadComments, postId: ", postId);
            const fetchedComments = await fetchComments(postId);
            setComments(fetchedComments);
        } catch (err) {
            setError('Failed to fetch comments.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [postId]);

    useEffect(() => {
        loadComments();
    }, [loadComments]);

    // Handle deleting a comment
    const handleDeleteComment = async (commentId: string) => {
        window.confirm('Are you sure you want to delete this comment?');
        try {
            await deleteComment(commentId);
            // Remove the deleted comment from the state
            setComments(prevComments => prevComments.filter(comment => comment._id !== commentId));
            console.log(`Comment with ID ${commentId} deleted successfully.`);
        } catch (error) {
            console.error('Error deleting comment:', error);
            alert('Failed to delete comment. Please try again.');
        }
    };

    return { comments,setComments, isLoading, error, refetchComments: loadComments,handleDeleteComment };
};
