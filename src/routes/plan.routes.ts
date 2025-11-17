import { Router } from "express";
import { PlanController } from "../controllers/plan-controller";
 

const router = Router();
const planController = new PlanController();

// Criar plano
router.post("/", planController.create.bind(planController));

// Listar todos os planos
router.get("/", planController.getAll.bind(planController));

// Fechar plano
router.post(
  "/close/:id",
  planController.close.bind(planController)
);

export default router;
