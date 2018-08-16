import express from 'express';

import { uploadImage } from '../controllers/mediaController';
import diskStorage from '../middlewares/diskStorage';
import authenticate from '../middlewares/authenticate';

const router = express.Router();

router.post('/content/image', authenticate, diskStorage, uploadImage); // '/api/v1' Never!!!!

export default router;
