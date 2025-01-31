import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { toast } from 'react-toastify';
import Footer from '../components/Footer';
import styles from '../styles/NewPost.module.css';
import { createPost } from '../services/post-service';
import { useUserContext } from '../data/UserContext';
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactQuill from 'react-quill';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../utils/cropImage'; // Helper function to crop image


const genAI = new GoogleGenerativeAI(import.meta.env.VITE_AI_API_KEY as string);

const NewPost: React.FC = () => {
    interface CroppedArea {
        x: number;
        y: number;
        width: number;
        height: number;
      }
    
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [photo, setPhoto] = useState<File | null>(null);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const { user } = useUserContext();
    const navigate = useNavigate();
    // Cropping State
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedArea, setCroppedArea] = useState<CroppedArea>({ x: 0, y: 0, width: 0, height: 0 });
    const [showCropper, setShowCropper] = useState(false);
    const [croppedImage, setCroppedImage] = useState<string | null>(null);

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setPhoto(file);
            setPhotoPreview(URL.createObjectURL(file));
            setShowCropper(true); // Show cropper when photo is uploaded
        }
    };
     // Save Cropped Area
     const onCropComplete = useCallback((_: any, croppedAreaPixels: any) => {
        setCroppedArea(croppedAreaPixels);
    }, []);

    // Convert File to Base64
    const convertFileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    };

    // Apply Cropping
    const handleCrop = async () => {
        if (!photoPreview || !croppedArea) return;
        
        try {
            const croppedFile = await getCroppedImg(photoPreview, croppedArea);
            const base64Image = await convertFileToBase64(croppedFile); // Convert to Base64
            setCroppedImage(base64Image);
            setShowCropper(false);
        } catch (error) {
            console.error('Error cropping image:', error);
            toast.error('Failed to crop image.');
        }
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
    
        try {
            const imageFile = croppedImage ? await fetch(croppedImage).then(res => res.blob()).then(blob => new File([blob], "croppedImage.png", { type: "image/png" })) : photo;
            await createPost(title, content, user?.username || '', imageFile, user?.avatarUrl || '');
            toast.success('Post created successfully!');
            navigate('/');
        } catch (error) {
            toast.error('Failed to create post.');
            console.error('Error while creating post:', error);
        }
    };
    const generateContent = async () => {
        if (!title.trim()) {
          toast.error("Please enter a title first!");
          return;
        }
        setLoading(true);
        try {
          console.log("Using API Key:", import.meta.env.VITE_AI_API_KEY); // Debugging
          
          const model = genAI.getGenerativeModel({ model: "gemini-pro" });
          const prompt = `Generate a concise blog post based on the title: "${title}". Keep it under 70 words.`;
          const result = await model.generateContent(prompt);
          const response = await result.response;
          const generatedText = response.text();
    
          setContent(generatedText || "No content generated.");
        } catch (error) {
          console.error("Error generating content:", error);
          toast.error("Failed to generate content.");
        } finally {
          setLoading(false);
        }
      };


      return (
        <div className={styles.newPostPage} >
            <Header />
            <div className={styles.newPostContainer}>
                <h2 style={{ textAlign: "center" }}>Create New Post</h2>
                <div className={styles.userInfo}>
                    <img src={user?.avatarUrl} alt="User Avatar" className={styles.avatar} />
                    <span className={styles.userName}>{user?.username}</span>
                </div>
                <form onSubmit={handleSubmit} className={styles.newPostForm}>
                    <div className={styles.formGroup}>
                        <label htmlFor="title">Title:</label>
                        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="content">Content:</label>
                        <ReactQuill theme="snow" value={content} onChange={setContent} placeholder="Write your post here..." className={styles.quillEditor} />
                        <button type="button" className={`${styles.generateButton} ${loading ? styles.loading : ""}`} onClick={generateContent} disabled={loading}>
                            {loading ? "Generating..." : "Generate a post based on your title"}
                        </button>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="photo">Upload Photo:</label>
                        <input type="file" id="photo" accept="image/*" onChange={handlePhotoUpload} />
                    </div>

                    {/* Show Cropper If Needed */}
                    {showCropper && photoPreview && (
                        <div className={styles.cropContainer}>
                            <Cropper
                                image={photoPreview}
                                crop={crop}
                                zoom={zoom}
                                aspect={7 / 2} // Adjust aspect ratio as needed
                                onCropChange={setCrop}
                                onZoomChange={setZoom}
                                onCropComplete={onCropComplete}
                            />
                            <button type="button" onClick={handleCrop} className={styles.cropButton}>
                                Crop Image
                            </button>
                        </div>
                    )}

                    {/* Show Cropped Image Preview */}
                    {croppedImage && (
                        <div className={styles.photoPreview}>
                            <img src={croppedImage} alt="Cropped Preview" />
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