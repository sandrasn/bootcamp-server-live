import express from 'express';
import asyncMiddleware from '../middlewares/asyncMiddlewares';
import { register } from '../controllers/userController';

const router = express.Router();

router.post('/users', asyncMiddleware(register)); // Izveido jaunu lietotaju

export default router;
