import { Router } from "express";
import { authMiddleware } from "../middlewares/auth-middleware";
import userRoutes from "./user.routes";
import planRoutes from "./plan.routes";
import investmentRoutes from "./investment.routes";
import transactionRoutes from "./transaction.routes";

const router = Router();

// Rotas públicas podem ir aqui (ex: login, register)
router.use("/", userRoutes);

router.use("/plans", planRoutes);
router.use("/investments", authMiddleware, investmentRoutes);
router.use("/transactions", authMiddleware, transactionRoutes);
router.use("/wallet");

export default router;
