import express from "express";
import { register, login } from "../controllers/auth.controller";
import { loginUserValidation, registerUserValidation } from "../Validation/auth.validation";

const router = express.Router();

router.post("/register", registerUserValidation, register);

router.post("/login", loginUserValidation, login);

export { router as authRoutes };