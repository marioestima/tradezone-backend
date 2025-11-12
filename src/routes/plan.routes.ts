import { Router } from "express";
import { PlanController } from "../controllers/plan-controller";
import { authMiddleware } from "../middlewares/auth-middleware";

const router = Router();
const planController = new PlanController();

// Criar plano
router.post("/", authMiddleware, planController.create.bind(planController));

// Listar todos os planos
router.get("/", authMiddleware, planController.getAll.bind(planController));

// Fechar plano
router.post(
  "/close/:id",
  authMiddleware,
  planController.close.bind(planController)
);

export default router;
