import { useState, useEffect } from "react";
import { fetchComments} from "../services/comment-service";


export interface Comment {
    _id: string
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

    useEffect(() => {
        const loadComments = async () => {
            try {
                setIsLoading(true);
                console.log("Entered loadComments, postId: ",postId);   
                const fetchedComments = await fetchComments(postId);
                setComments(fetchedComments);
            } catch (err) {
                setError('Failed to fetch comments.');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        loadComments();
    }, [postId]);

 

    return { comments, isLoading, error };
};
