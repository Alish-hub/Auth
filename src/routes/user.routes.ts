import { Router } from "express";
import { login, sign_up } from "../controllers/user.controller";

const router = Router();

router.post('/signUp',sign_up)
router.post('/login',login)


export default router;