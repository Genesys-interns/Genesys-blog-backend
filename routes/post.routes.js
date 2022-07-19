/* eslint-disable import/extensions */
import express from 'express';
import PostController from '../controllers/post.controller.js';

const postRoute = express.Router();

postRoute.get('/:title', PostController.articleByTitle);
postRoute.patch('/:postid', PostController.updateArticle);

export default postRoute;
