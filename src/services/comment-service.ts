import apiClient from './api-service';
import { Comment } from '../hooks/useComments';

// Fetch all comments for a post
export const fetchComments = async (postId: string) => {
    console.log("Entered fetchComments");
    console.log("fetchComments PostId: ",postId);
    const token = localStorage.getItem('accessToken');
    const response = await apiClient.get(`/comments/get-all-comments/${postId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    console.log("Response fetchComments: ",response);
    return response.data;
};

// Post a new comment with middleware
export const postComment = async (comment: Comment) => {
    console.log("Entered postComment");
    console.log("PostComment: ",comment);
    const token = localStorage.getItem('accessToken');
    const response = await apiClient.post('/comments', comment, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
};

//Update a comment
export const updateComment = async (commentData:any, commentId: string) => {
    console.log("Entered updateComment");
    const token = localStorage.getItem('accessToken');
    const response = await apiClient.put(`/comments/${commentId}`, commentData, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
};

// Delete a comment
export const deleteComment = async (commentId: string) => {
    console.log("Entered deleteComment");
    const token = localStorage.getItem('accessToken');
    const response = await apiClient.delete(`/comments/${commentId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
};