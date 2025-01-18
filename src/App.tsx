import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BlogHome from './pages/BlogHome';
import ProfileView from './pages/ProfileView';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/profile/:userId" element={<ProfileView />} />
                <Route path="/" element={<BlogHome />} />
            </Routes>
        </Router>
    );
};

export default App;