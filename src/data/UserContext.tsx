// context/UserContext.tsx
import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { getUserInfo } from '../services/user-service';

interface User {
    username: string;
    avatarUrl: string;
}

interface UserContextProps {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    refreshUser: () => Promise<void>;
}

// Create the context
const UserContext = createContext<UserContextProps | undefined>(undefined);

// Create a custom hook to safely use the context
export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
};

// UserProvider component
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const refreshUser = async () => {
        try {
            const userId = localStorage.getItem('userId');
            if (userId) {
                const user = await getUserInfo(userId);
                setUser({
                    username: user.username,
                    avatarUrl: user.image,
                });
            }
        } catch (error) {
            console.error('Error refreshing user info:', error);
            setUser(null); // Reset user on error
        }
    };

    useEffect(() => {
        refreshUser(); // Fetch user info when the provider is mounted
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, refreshUser }}>
            {children}
        </UserContext.Provider>
    );
};
