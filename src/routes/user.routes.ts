import { Router } from "express";
import { UserController } from "../controllers/user-controller";
import { authMiddleware } from "../middlewares/auth-middleware";

const router = Router();
const userController = new UserController();

// Criar usuário (registro)
router.post("/register", userController.create.bind(userController));

// Login
router.post("/login", userController.login.bind(userController));

// Listar todos usuários (protegido)
router.get("/", authMiddleware, userController.getAll.bind(userController));

// Puxar usuário pelo ID (protegido)
router.get("/:id", authMiddleware, userController.getById.bind(userController));

export default router;
