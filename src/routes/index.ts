import { Router } from "express";
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
router.use("/investments", investmentRoutes);
router.use("/transactions", transactionRoutes);
router.use("/deposits", depositRoutes);
router.use("/daily-profit", dailyProfitRoutes);

export default router;
