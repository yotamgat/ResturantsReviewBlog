import apiClient from './api-service';

// Fetch all posts
export const fetchPosts = async () => {
    console.log("Enter Fetch Posts");
    const response = await apiClient.get("/posts");
    return response.data;
};
// Like a post
export const likePost = async (postId: string) => {
    const response = await apiClient.post(`/posts/${postId}/like`);
    return response.data;
};
//Get all posts of a user
export const getUserPosts = async (userId: string) => {
    console.log("Entered getUserPosts");
    console.log("getUserPosts UserId: ",userId);
    const token = localStorage.getItem('accessToken');
    const response = await apiClient.get(`/posts/get-all-posts/${userId}`,{
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        },
    });
    console.log("Response getUserPosts: ",response);
    return response.data;
};


// Create a new post
export const createPost = async (title: string, content: string,username:string, photo: File | null,userImg:string) => {
    const formData = new FormData();
    if (photo) {
        formData.append('photo', photo);
    }
    const token = localStorage.getItem('accessToken');
    const photoResponse = await apiClient.post('/posts/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        },
    });
    const photoUrl = photoResponse.data.url;
    const userId = localStorage.getItem('userId');
    const postData = { title, content, photo: photoUrl, _id: userId,userImg,username };
    console.log("PostData: ",postData);
  

    const response = await apiClient.post('/posts', postData, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    console.log("Finel Response: ",response);
    return response.data;
};

//Post edit update
export const editPost = async (postId: string,title: string, content: string,username:string, photo: File | null,userImg:string) => {
    const formData = new FormData();
    if (photo) {
        formData.append('photo', photo);
    }
    const token = localStorage.getItem('accessToken');
    const photoResponse = await apiClient.post('/posts/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        },
    });
    const photoUrl = photoResponse.data.url;
    const userId = localStorage.getItem('userId');
    const postData = { title, content, photo: photoUrl, _id: userId,userImg,username };
    console.log("PostData: ",postData);
  

    const response = await apiClient.put(`/posts/edit/${postId}`, postData, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    console.log("Finel Response: ",response);
    return response.data;
};
//Post update
export const updatePost = async (postData:any, postId: string) => {
    console.log("Entered updatePost");
    console.log("PostData: ",postData);
    const token = localStorage.getItem('accessToken');
    const response = await apiClient.put(`/posts/${postId}`, postData, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
    console.log("Response updatePost: ",response);
    return response.data;
};

//Get post by Id
export const getPostById = async (postId: string) => {
    const response = await apiClient.get(`/posts/${postId}`);
    return response.data;
};

//Delete post
export const deletePost = async (postId: string) => {
    const token = localStorage.getItem('accessToken');
    const response = await apiClient.delete(`/posts/${postId}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};