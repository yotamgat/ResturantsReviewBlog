
import userAvatar from '../assets/avatar.png';

export interface User {
    userId: number;
    userName: string;
    userPassword: string;
    userAvatar: string;
    numOfPosts: number;
   
}

export const users: User[] = [
    {
        userId: 1,
        userName: 'Yotam Gat',
        userPassword: '1234',
        userAvatar: userAvatar,
        numOfPosts: 1,
    },
]