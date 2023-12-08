import express from 'express';
import routerUser from './users/users-controller.js';
import routerComment from './comments/comments-controller.js';
import routerPost from './posts/posts-controller.js';

const app = express();
app.use(express.json());

const PORT = 3000;

app.use(routerUser);
app.use(routerComment);
app.use(routerPost);

