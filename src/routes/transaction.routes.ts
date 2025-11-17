import { Router } from "express";
import { TransactionController } from "../controllers/transaction-controller";
 

const router = Router();
const transactionController = new TransactionController();

// Criar nova transação
router.post(
  "/",
  transactionController.create.bind(transactionController)
);

// Pegar todas as transações de um usuário
router.get(
  "/user/:userId",
  transactionController.getByUser.bind(transactionController)
);

// Pegar todas as transações de um usuário por tipo
router.get(
  "/user/:id/type/:type",
  transactionController.getByUserAndType.bind(transactionController)
);

// Atualizar uma transação
router.put(
  "/:id",
  transactionController.update.bind(transactionController)
);

// Deletar uma transação
router.delete(
  "/:id",
  transactionController.delete.bind(transactionController)
);

export default router;
