import userAvatar from '../assets/avatar.png'; // Adjust the path as needed
import uplodedPhoto1 from '../assets/food.png'; 
import uplodedPhoto2 from '../assets/food 2.jpeg'; 
import uplodedPhoto3 from '../assets/food 3.jpeg'; 



export interface Post {
    ownerId: number;
    postId: number;
    userName: string;
    userAvatar: string;
    title: string;
    content: string;
    photo: string;
    numOfComments: number;
    comments: Comment[];
    numOfLikes: number;
}

export const posts: Post[] = [
    
    {
        ownerId: 1,
        postId: 1,
        userName: 'Yotam Gat',
        userAvatar: userAvatar,
        title: 'Margherita Pizza',
        content: 'The Margherita Pizza at Bella Italia is simplicity at its finest...',
        photo: uplodedPhoto1,
        numOfComments: 5,
        comments: [],
        numOfLikes: 15,
    },
    {
        ownerId: 3,
        postId: 2,
        userName: 'John Doe',
        userAvatar: userAvatar,
        title: 'Spicy Tuna Roll',
        content: 'The Spicy Tuna Roll at Sushi Zen is good but doesn’t quite hit the mark...',
        photo: uplodedPhoto2,
        numOfComments: 1,
        comments: [],
        numOfLikes: 11,
    },
    {
        ownerId: 1,
        postId: 3,
        userName: 'Dir Le',
        userAvatar: userAvatar,
        title: 'Chocolate Lava Cake',
        content: 'Wow. The Chocolate Lava Cake at Sweet Cravings Café is pure indulgence...',
        photo: uplodedPhoto3,
        numOfComments: 1,
        comments: [],
        numOfLikes: 11,
    },
];