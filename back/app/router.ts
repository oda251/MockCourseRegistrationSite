import { Router } from 'express';
import { UserController } from './srcs/controller/userController';

export const router = Router();

router.post('/login', UserController.loginHandler);