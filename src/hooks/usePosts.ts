import { useState, useEffect } from 'react';
import { fetchPosts } from '../services/post-service';
import apiClient from '../services/api-service';
import { useUserContext } from '../data/UserContext';
import { deletePost } from '../services/post-service';


export interface Post {
    _id: string;
    userAvatar: string;
    username: string;
    photo: string;
    title: string;
    content: string;
    numOfLikes: number;
    numOfComments: number;
    owner: string;
    userImg:string;
    likedBy: string[];
}

export const usePosts = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const {user} = useUserContext();
    const userId = user?._id 
    console.log("UserId TEST: ",userId);
   
    

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

      // Handle the like functionality
      const handleLike = async (postId: string,userId:string) => {
        try {
            
            console.log("Entered handleLike");
            console.log("handleLike PostId: ",postId);
            console.log("handleLike UserId: ",userId);
            const token = localStorage.getItem('accessToken');
            //Fix the userId transfer
            const response = await apiClient.put(`/posts/like/${postId}`, {userId}, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                console.log("Response handleLike: ",response);
               // const { numOfLikes, likedBy } = response.data;
                const numOfLikes = response.data.post.numOfLikes;
                const likedBy = response.data.post.likedBy;
                console.log("response.data.likedBy: ",response.data.post.likedBy);
                console.log("response.data.numOfLikes",response.data.post.numOfLikes)
             

                setPosts((prevPosts) =>
                    prevPosts.map((post) =>
                        post._id === postId
                            ? {
                                  ...post,
                                  numOfLikes,
                                  likedBy, // Update likedBy array
                              }
                            : post
                    )
                );
            } else {
                console.error('Failed to like/unlike the post.');
            }
        } catch (error) {
            console.error('Error liking/unliking post:', error);
        }
    };


  

    const handleDeletePost = async (postId: string) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this post?');
        if (!confirmDelete) return;
        try {
            await deletePost(postId);
            setPosts(prevPosts => prevPosts.filter(post => post._id !== postId));
        } catch (error) {
            console.error('Error deleting post:', error);
            setError('Failed to delete post');
        }
    };

    return { posts, loading, error, handleLike, userId,handleDeletePost,setPosts };
};

