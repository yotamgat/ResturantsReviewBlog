import { useState, useEffect } from 'react';
import { fetchPosts, likePost, editPost } from '../services/post-service';

export interface Post {
    postId: number;
    userAvatar: string;
    userName: string;
    photo: string;
    content: string;
    numOfLikes: number;
    numOfComments: number;
    ownerId: number;
}

export const usePosts = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadPosts = async () => {
            try {
                setLoading(true);
                const fetchedPosts = await fetchPosts();
                setPosts(fetchedPosts);
            } catch (err) {
                setError('Failed to fetch posts.');
                console.error( err)
            } finally {
                setLoading(false);
            }
        };
        loadPosts();
    }, []);

    const handleLike = async (postId: number) => {
        try {
            const updatedPost = await likePost(postId);
            setPosts(prevPosts =>
                prevPosts.map(post =>
                    post.postId === postId ? { ...post, numOfLikes: updatedPost.numOfLikes } : post
                )
            );
        } catch (err) {
            console.error('Failed to like post:', err);
        }
    };

    const handleEdit = async (postId: number, updatedContent: string) => {
        try {
            const updatedPost = await editPost(postId, updatedContent);
            setPosts(prevPosts =>
                prevPosts.map(post =>
                    post.postId === postId ? { ...post, content: updatedPost.content } : post
                )
            );
        } catch (err) {
            console.error('Failed to edit post:', err);
        }
    };

    return { posts, loading, error, handleLike, handleEdit };
};
