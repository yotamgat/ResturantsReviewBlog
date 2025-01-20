
import userAvatar from '../assets/avatar.png';

export interface Comment {
    ownerId: number;
    postId: number;
    userName: string;
    userAvatar: string;
    content: string;
}

export const posts: Comment[] = [
    
    {
        ownerId: 10,
        postId: 1,
        userName: 'Yotam Gat',
        userAvatar: userAvatar,
        content: "This is a comment2222"
       
    },
    {
        ownerId: 100,
        postId: 1,
        userName: 'John Doe',
        userAvatar: userAvatar,
        content: "This is a comment 2"
    },
    {
        ownerId: 100,
        postId: 2,
        userName: 'John Doe',
        userAvatar: userAvatar,
        content: "This is a comment 2"
    },
    {
        ownerId: 11,
        postId: 3,
        userName: 'Dir Le',
        userAvatar: userAvatar,
        content: "This is a comment 3"
       
       
    }
];