import React, { useState, useEffect } from 'react';
import apiClient,{baseURL} from '../services/api-service';
import { toast } from 'react-toastify';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/ProfileView.module.css';
import { FaEdit } from 'react-icons/fa';
import Posts from '../components/Posts';
import { Post } from '../hooks/usePosts';
import { Comment } from '../hooks/useComments';
import { useUserContext } from '../data/UserContext';
import { getUserPosts } from '../services/post-service';
import { updateUser } from '../services/auth-service';
import { updateComment } from '../services/comment-service';
import { updatePost } from '../services/post-service';



const ProfileView: React.FC = () => {
    const { user, setUser } = useUserContext(); // Get logged-in user from context
    const [userPosts, setUserPosts] = useState<Post[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [userName, setUserName] = useState(user?.username || '');
    const [avatar, setAvatar] = useState<File | string>(user?.avatarUrl || '');
    const [previewImage, setPreviewImage] = useState<string>(baseURL + user?.avatarUrl || '');
    const [comments, setComments] = useState<Comment[]>([]); // State for storing comments
    const [newName, setNewName] = useState(userName);
    const [newImage, setNewImage] = useState<File | string |null>(avatar);
    

    

    // Fetch user posts when the component mounts
    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                if (user) {
                    const userId = localStorage.getItem('userId');
                    if (userId) {
                        const posts = await getUserPosts(userId);
                        setUserPosts(posts);
                    } else {
                        console.error('User ID is null');
                    }
                }
            } catch (error) {
                console.error('Error fetching user posts:', error);
            }
        };

        fetchUserPosts();
    }, [user]);

    // Set previewImage to the user's existing avatar URL when the component loads
  

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setNewImage(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };


    const handleSaveProfile = async () => {
        const image= user?.avatarUrl;
        if (newName.trim() === '') {
            toast.error('Name cannot be empty!');
            return;
        }
        let photoUrl: string ;
        try {
            const formData = new FormData();
            if (newImage === image && userName === newName) {
                toast.info('No changes made to the profile.');
                return;
            }

            if (newImage === image) {
                const userData = {
                    _id: user?._id || '',
                    username: newName,
                    userImg: image,
                };
                console.log("UserData.Id: ",userData._id);
                console.log("UserData.UserName: ",userData.username);
                console.log("UserData.UserImg- Didnt change img: ",userData.userImg);
                await updateUser(userData);
                toast.success('Profile updated successfully!');
            } else {
                if (newImage) {
                   
                    formData.append('photo', newImage);
                }
                const token = localStorage.getItem('accessToken');
                const photoResponse = await apiClient.post('/posts/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    },
                });
                photoUrl = photoResponse.data.url.toString();
                const userData = {
                    _id: user?._id || '',
                    username: newName,
                    userImg: photoUrl,
                };
                console.log("UserData.Id: ",userData._id);
                console.log("UserData.UserName: ",userData.username);
                console.log("UserData.UserImg- new image: ",userData.userImg);
                await updateUser(userData);
                toast.success('Profile updated successfully!');
            }
             // Update posts
            userPosts.forEach(async (post) => {
                const postData = {
                    title: post.title,
                    content: post.content,
                    username: newName ? newName : user?.username,
                    _id: post._id,
                    numOfLikes: post.numOfLikes,
                    numOfComments: post.numOfComments,
                    postImg: post.photo,
                    userAvatar: photoUrl ? photoUrl : user?.avatarUrl,
                    owner: post.owner,
                };
               

               await updatePost(postData, post._id);
                
            });
            // Update comments
            comments.forEach(async (comment) => {
                const commentData = {
                    _id: comment._id,
                    content: comment.comment,
                    postId: comment.postId,
                    ownerId: comment.owner,
                    userImg: photoUrl ? photoUrl : user?.avatarUrl,
                    username: newName ? newName : user?.username,
                };
                if(comment.owner === user?._id){
                    await updateComment(commentData, comment._id);
                }
            });
        } catch (error) {
            console.error('Error uploading profile image:', error);
            toast.error('Failed to upload profile image');
        }
  
        //setIsEditing(false);
    };

    const handleCancelEdit = () => {
        if (user) {
            setNewName(user.username);
            setAvatar(user.avatarUrl);
            setPreviewImage(user.avatarUrl);
        }
        setIsEditing(false);
    };

    return (
        <div className={styles.profileView}>
            <Header />
            <div className={styles.profileContent}>
                <div className={styles.profileInfo}>
                    <img src={user?.avatarUrl} alt="User Avatar" className={styles.avatar} />
                    {isEditing ? (
                        <>
                            <input
                                type="text"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                className={styles.userNameInput}
                            />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleAvatarChange}
                                className={styles.avatarInput}
                            />
                            <div className={styles.editButtons}>
                                <button onClick={handleSaveProfile} className={styles.saveButton}>
                                    Save
                                </button>
                                <button onClick={handleCancelEdit} className={styles.cancelButton}>
                                    Cancel
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <h2 className={styles.userName}>{userName}</h2>
                            <button onClick={() => setIsEditing(true)} className={styles.editButton}>
                                <FaEdit /> Edit Profile
                            </button>
                        </>
                    )}
                </div>
                <div className={styles.userPosts}>
                    <h2>My Posts</h2>
                    {userPosts.length > 0 ? (
                        <Posts posts={userPosts} />
                    ) : (
                        <p>No posts to display.</p>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ProfileView;
