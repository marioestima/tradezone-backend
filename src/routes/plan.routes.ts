import { Router } from "express";
import { PlanController } from "../controllers/plan-controller";
import { authMiddleware } from "../middlewares/auth-middleware";
// import { requireRole } from "../middlewares/role-middleware";

const router = Router();
const planController = new PlanController();

// Criar plano → requer autenticação
router.post("/", authMiddleware, planController.create.bind(planController));

// Listar todos os planos → opcionalmente protegido (aqui deixei protegido)
router.get("/", authMiddleware, planController.getAll.bind(planController));

// Fechar plano → apenas admin
router.post(
  "/close/:id",
  authMiddleware,
  planController.close.bind(planController)
);

export default router;
