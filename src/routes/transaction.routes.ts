import { Router } from "express";
import { TransactionController } from "../controllers/transaction-controller";
import { authMiddleware } from "../middlewares/auth-middleware";

const router = Router();
const transactionController = new TransactionController();

// Criar nova transação (autenticado)
router.post(
  "/",
  authMiddleware,
  transactionController.create.bind(transactionController)
);

// Pegar todas as transações de um usuário (autenticado)
router.get(
  "/user/:userId",
  authMiddleware,
  transactionController.getByUser.bind(transactionController)
);

// Pegar todas as transações de um usuário por tipo (autenticado)
router.get(
  "/user/:id/type/:type",
  authMiddleware,
  transactionController.getByUserAndType.bind(transactionController)
);

// Atualizar uma transação (autenticado)
router.put(
  "/:id",
  authMiddleware,
  transactionController.update.bind(transactionController)
);

// Deletar uma transação (autenticado)
router.delete(
  "/:id",
  authMiddleware,
  transactionController.delete.bind(transactionController)
);

export default router;
