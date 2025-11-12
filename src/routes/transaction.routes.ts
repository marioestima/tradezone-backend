import { Router } from "express";
import { TransactionController } from "../controllers/transaction-controller";
import { authMiddleware } from "../middlewares/auth-middleware";

const router = Router();
const transactionController = new TransactionController();

// Criar nova transação
router.post(
  "/",
  authMiddleware,
  transactionController.create.bind(transactionController)
);

// Pegar todas as transações de um usuário
router.get(
  "/user/:userId",
  authMiddleware,
  transactionController.getByUser.bind(transactionController)
);

// Pegar todas as transações de um usuário por tipo
router.get(
  "/user/:id/type/:type",
  authMiddleware,
  transactionController.getByUserAndType.bind(transactionController)
);

// Atualizar uma transação
router.put(
  "/:id",
  authMiddleware,
  transactionController.update.bind(transactionController)
);

// Deletar uma transação
router.delete(
  "/:id",
  authMiddleware,
  transactionController.delete.bind(transactionController)
);

export default router;
