import apiClient from './api-service';

// Fetch all posts
export const fetchPosts = async () => {
    const response = await apiClient.get('/posts');
    return response.data;
};

// Like a post
export const likePost = async (postId: number) => {
    const response = await apiClient.post(`/posts/${postId}/like`);
    return response.data;
};

// Edit a post
export const editPost = async (postId: number, updatedContent: string) => {
    const response = await apiClient.put(`/posts/${postId}`, { content: updatedContent });
    return response.data;
};
