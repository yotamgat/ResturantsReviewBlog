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
        content: 'Sushi Zen’s Dragon Roll is a feast for both the eyes and the palate. The roll is beautifully plated, with vibrant slices of avocado and eel topping each piece like a crown. The combination of the smoky, tender eel and creamy avocado pairs wonderfully with the crisp cucumber and perfectly seasoned sushi rice. The sweet and savory glaze of eel sauce ties all the flavors together harmoniously. While the taste is spot on, the roll could have been a touch larger for the price. Highly recommended for sushi enthusiasts',
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
        content: 'The Red Velvet Cheesecake at Sweet Cravings Café is pure decadence. The vibrant red velvet layers are moist and fluffy, with a subtle cocoa flavor that’s perfectly complemented by the tangy, creamy cheesecake filling. The frosting is silky and not overly sweet, striking the ideal balance. The presentation is stunning, with a delicate dusting of powdered sugar and a single raspberry on top. The portion size was generous, making it great for sharing. This dessert is a must-try for anyone with a sweet tooth!',
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
        content: 'The Truffle Risotto at The Golden Fork is a masterpiece of culinary art. The creamy texture of the risotto perfectly complements the earthy, aromatic truffle shavings that are generously sprinkled on top. The balance of flavors is remarkable, with each bite delivering a rich yet not overpowering taste. The garnish of fresh parsley and a drizzle of truffle oil elevated the dish to perfection. My only critique would be the portion size—it left me wanting just a little more. Overall, a delightful experience for any truffle lover!',
        photo: uplodedPhoto3,
        numOfComments: 1,
        comments: [],
        numOfLikes: 11,
    },
];