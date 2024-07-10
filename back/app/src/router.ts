import { Router } from "express";
import { UserRepositoryImpl } from "./repository/userRepository";
import { ClassRepositoryImpl } from "./repository/classRepository";
import { UserControllerImpl } from "./controller/userController";
import { ClassControllerImpl } from "./controller/classController";
import supabase from "./repository/supabase";

const router = Router();

const ur = new UserRepositoryImpl(supabase);
const cr = new ClassRepositoryImpl(supabase);

const uc = new UserControllerImpl(ur);
const cc = new ClassControllerImpl(cr);

router.post("/login", uc.login);

const classRouter = Router();
classRouter.get("/list", cc.fetchClasses);
classRouter.get("/list-registered", cc.fetchRegistratedClasses);
classRouter.post("/register", cc.registerClass);
classRouter.post("/unregister", cc.unregisterClass);

router.use("/class", classRouter);

export default router;
