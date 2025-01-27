import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BlogHome from './pages/BlogHome';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProfileView from './pages/ProfileView';
import EditPost from './pages/EditPost'; 
import Login from './pages/Login';
import Register from './pages/Register';
import NewPost from './pages/NewPost';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/profile/:userId" element={<ProfileView />} />
                <Route path="/login" element={<Login />} />
                <Route path="/new-post" element={<NewPost />} />
                <Route path="/edit-post/:postId" element={<EditPost/>} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<BlogHome />} />
            </Routes>
            <ToastContainer />
        </Router>
    );
};

export default App;