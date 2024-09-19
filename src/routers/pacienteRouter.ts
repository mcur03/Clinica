import { Router } from "express";
import PacienteController from "../Controller/pacienteController";
import { validateToken, validaUserExiste, verifyRole } from "../Middleware/userMiddleware";

const router = Router();

router.post('/create', validateToken, verifyRole('doctor'), validaUserExiste, PacienteController.create);
router.get('/allPacientes', validateToken, verifyRole('doctor'), PacienteController.getPacientes);

export default router;