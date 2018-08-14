import express from 'express';

import index from '../controllers/indexController';

const router = express.Router();

router.get('/', index); // '/api/v1' Never!!!!

export default router;
