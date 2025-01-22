import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/NewPost.module.css';
import userAvatar from '../assets/avatar.png';

const NewPost: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [photo, setPhoto] = useState<File | null>(null);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const navigate = useNavigate();

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setPhoto(file);
            setPhotoPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Implement post creation functionality
        console.log({ title, content, photo });
        navigate('/');
    };

    return (
        <div>
            <Header />
            <div className={styles.newPostContainer}>
                <h2 style={{ textAlign: 'center' }}>Create New Post</h2>
                <div className={styles.userInfo}>
                    <img src={userAvatar} alt="User Avatar" className={styles.avatar} />
                    <span className={styles.userName}>Yotam Gat</span> {/* Replace with actual user name */}
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
                    <button type="submit" className={styles.submitButton}>Submit</button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default NewPost;