import express from 'express';

import index from '../controllers/indexController';
import authenticate from '../middlewares/authenticate';

const router = express.Router();

router.get('/', authenticate, index); // '/api/v1' Never!!!!

export default router;
