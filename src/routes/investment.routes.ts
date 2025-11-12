import { Router } from "express";
import { InvestmentController } from "../controllers/investement-controller";
import { authMiddleware } from "../middlewares/auth-middleware";

const router = Router();
const investmentController = new InvestmentController();

// Criar investimento
router.post(
  "/",
  authMiddleware,
  investmentController.create.bind(investmentController)
);

// Listar investimentos de um usuário
router.get(
  "/user/:userId",
  authMiddleware,
  investmentController.getByUser.bind(investmentController)
);

// Incrementar acumulado de um investimento
router.post(
  "/increment",
  authMiddleware,
  investmentController.increment.bind(investmentController)
);

export default router;
