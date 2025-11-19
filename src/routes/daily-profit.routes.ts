import { Router } from "express";
import { DailyProfitController } from "../controllers/profit-controller";
import { authMiddleware } from "../middlewares/auth-middleware";

const router = Router();
const controller = new DailyProfitController();

// Todas as rotas protegidas
router.get("/", authMiddleware, controller.getAll.bind(controller));
router.get("/summary", authMiddleware, controller.getSummary.bind(controller));

export default router;
