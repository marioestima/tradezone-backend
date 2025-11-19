import { Router } from "express";
import { PlanController } from "../controllers/plan-controller";
import { authMiddleware } from "../middlewares/auth-middleware";

const router = Router();
const planController = new PlanController();

// Criar plano → só usuário autenticado
router.post("/", authMiddleware, planController.create.bind(planController));

// Listar todos os planos → público (sem middleware) ou autenticado se preferir
router.get(
  "/",
  authMiddleware, // opcional
  planController.getAll.bind(planController)
);

// Fechar plano → apenas admin
router.post(
  "/close/:id",
  authMiddleware,

  planController.close.bind(planController)
);

export default router;
