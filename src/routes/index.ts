import { Router } from "express";
import { authMiddleware } from "../middlewares/auth-middleware";
import userRoutes from "./user.routes";
import planRoutes from "./plan.routes";
import investmentRoutes from "./investment.routes";
import transactionRoutes from "./transaction.routes";

const router = Router();

// Rotas públicas
router.use("/", userRoutes);

// Rotas protegidas
router.use("/plans", planRoutes);
router.use("/investments", authMiddleware, investmentRoutes);
router.use("/transactions", authMiddleware, transactionRoutes);

// Caso tenha router de wallet futuramente:
// import walletRoutes from "./wallet.routes";
// router.use("/wallet", authMiddleware, walletRoutes);

export default router;
  