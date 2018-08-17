import express from 'express';

import { uploadImage, addPost } from '../controllers/mediaController';
import diskStorage from '../middlewares/diskStorage';
import authenticate from '../middlewares/authenticate';
import asyncMiddleware from '../middlewares/asyncMiddlewares';
import { getAllPosts, getPostById } from '../models/PostModel';

const router = express.Router();

router.post('/content/image', authenticate, diskStorage, uploadImage, asyncMiddleware(uploadImage)); // '/api/v1' Never!!!!
router.post('/media', authenticate, asyncMiddleware(addPost));
router.post('/media', authenticate, asyncMiddleware(getAllPosts));
router.post('/media/:id', authenticate, asyncMiddleware(getPostById));

export default router;
