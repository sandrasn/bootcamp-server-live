import express from 'express';
import asyncMiddleware from '../middlewares/asyncMiddlewares';
import { register, logIn } from '../controllers/userController';

const router = express.Router();

router.post('/users', asyncMiddleware(register)); // Izveido jaunu lietotaju
router.post('/session', asyncMiddleware(logIn));

export default router;
