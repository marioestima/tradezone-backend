import { Router } from "express";
import { authMiddleware } from "../middlewares/auth-middleware";

import userRoutes from "./user.routes";
import planRoutes from "./plan.routes";
import investmentRoutes from "./investment.routes";
import transactionRoutes from "./transaction.routes";
import depositRoutes from "./deposit.routes";
import dailyProfitRoutes from "./daily-profit.routes";

const router = Router();

// Rotas públicas
router.use("/auth", userRoutes);

// Rotas protegidas
router.use("/plans", planRoutes);
router.use("/investments", authMiddleware, investmentRoutes);
router.use("/transactions", authMiddleware, transactionRoutes);
router.use("/deposits", authMiddleware, depositRoutes);
router.use("/daily-profit", authMiddleware, dailyProfitRoutes);

export default router;
