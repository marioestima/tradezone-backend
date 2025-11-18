import { Router } from "express";
import { UserController } from "../controllers/user-controller";
import { authMiddleware } from "../middlewares/auth-middleware";

const router = Router();
const userController = new UserController();

// Criar usuário (registro)
router.post("/register", userController.create.bind(userController));

// Login
router.post("/login", userController.login.bind(userController));

// ----------------------
// Rotas protegidas 👇
// ----------------------
router.get("/me", authMiddleware, userController.getMe.bind(userController));

router.get("/", authMiddleware, userController.getAll.bind(userController));

router.get("/:id", authMiddleware, userController.getById.bind(userController));

export default router;
