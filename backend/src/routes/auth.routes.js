import express from "express";
import validate from '../middleware/validate.js';
import { registerSchema, loginSchema } from "../validators/auth.validator.js";
import { registerController, loginController, logoutController, refreshTokenController } from "../controller/auth.controller.js";
const router = express.Router();

router.post('/register', validate(registerSchema), registerController);
router.post('/login', validate(loginSchema), loginController)
router.post('/logout', logoutController);
router.post('/refresh', refreshTokenController)
export default router;    