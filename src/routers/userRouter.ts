import { Router } from "express";
import { validaUserExiste } from "../Middleware/userMiddleware";
import UserController from "../Controller/userController";

const router = Router();

router.post('/register', validaUserExiste, UserController.register);
router.post('/verify-email', UserController.verifyEmail);
router.post('/login', UserController.login);

export default router;