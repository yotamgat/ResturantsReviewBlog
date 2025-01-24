import React from 'react';
import ReactDOM from 'react-dom/client'; // Use the correct import for React 18
import 'bootstrap/dist/css/bootstrap.css';
import App from './App.tsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { UserProvider } from './data/UserContext';

const clientId ='419321215873-gta8asanva2i59gd177miubjdsa4t9bm.apps.googleusercontent.com';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <GoogleOAuthProvider clientId={clientId}>
        <React.StrictMode>
            <UserProvider>
                <App />
            </UserProvider>
        </React.StrictMode>
    </GoogleOAuthProvider>
);