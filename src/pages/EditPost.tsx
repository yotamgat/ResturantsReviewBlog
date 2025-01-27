import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import { toast } from 'react-toastify';
import Footer from '../components/Footer';
import styles from '../styles/NewPost.module.css';
import { getPostById, editPost } from '../services/post-service';
import { useUserContext } from '../data/UserContext';

const EditPost: React.FC = () => {
    const { postId } = useParams<{ postId: string }>();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [photo, setPhoto] = useState<File | null>(null);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const { user } = useUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const post = await getPostById(postId as string);
                setTitle(post.title);
                setContent(post.content);
                setPhotoPreview(post.photo);
            } catch (error) {
                console.error('Error fetching post:', error);
                toast.error('Failed to fetch post data.');
            }
        };

        fetchPost();
    }, [postId]);

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setPhoto(file);
            setPhotoPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            console.log("Entered handleSubmit");

            await editPost(postId as string,title, content, user?.username || '',  photo,user?.avatarUrl || '');
            toast.success('Post updated successfully!');
            navigate('/');
        } catch (error) {
            toast.error('Failed to update post.');
            console.error('Error while updating post:', error);
        }
    };

    return (
        <div>
            <Header />
            <div className={styles.newPostContainer}>
                <h2 style={{ textAlign: 'center' }}>Edit Post</h2>
                <div className={styles.userInfo}>
                    <img src={user?.avatarUrl} alt="User Avatar" className={styles.avatar} />
                    <span className={styles.userName}>{user?.username}</span>
                </div>
                <form onSubmit={handleSubmit} className={styles.newPostForm}>
                    <div className={styles.formGroup}>
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="content">Content:</label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="photo">Upload Photo:</label>
                        <input
                            type="file"
                            id="photo"
                            accept="image/*"
                            onChange={handlePhotoUpload}
                        />
                    </div>
                    {photoPreview && (
                        <div className={styles.photoPreview}>
                            <img src={photoPreview} alt="Photo Preview" />
                        </div>
                    )}
                    <button type="submit" className={styles.submitButton}>Update</button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default EditPost;