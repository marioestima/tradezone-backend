import { Router } from "express";
import { UserController } from "../controllers/user-controller";
import { authMiddleware } from "../middlewares/auth-middleware";

const router = Router();
const userController = new UserController();

// Criar usuário (registro)
router.post("/register", userController.create.bind(userController));

// Login
router.post("/login", userController.login.bind(userController));

 
router.get("/me", userController.getMe.bind(userController));

// Listar todos usuários (protegido)
router.get("/", userController.getAll.bind(userController));

// Puxar usuário pelo ID (protegido)
router.get("/:id", userController.getById.bind(userController));

export default router;
