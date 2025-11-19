import { Router } from "express";
import userRoutes from "./user.routes";
import planRoutes from "./plan.routes";
import investmentRoutes from "./investment.routes";
import transactionRoutes from "./transaction.routes";
import depositRoutes from "./deposit.routes";
import dailyProfitRoutes from "./daily-profit.routes";
import { authMiddleware } from "../middlewares/auth-middleware";

const router = Router();

// Rotas públicas (auth)
router.use("/auth", userRoutes);

// A partir daqui, todas são protegidas (opcional)
router.use("/plans", authMiddleware, planRoutes);
router.use("/investments", authMiddleware, investmentRoutes);
router.use("/transactions", authMiddleware, transactionRoutes);
router.use("/deposits", authMiddleware, depositRoutes);
router.use("/daily-profit", authMiddleware, dailyProfitRoutes);

export default router;
