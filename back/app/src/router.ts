import { Router } from 'express';
import { UserRepositoryImpl } from './repository/userRepository';
import { UserControllerImpl } from './controller/userController';
import supabase from './repository/supabase';

const router = Router();

const ur = new UserRepositoryImpl(supabase);
const uc = new UserControllerImpl(ur);

router.post('/login', uc.loginHandler);

export default router;