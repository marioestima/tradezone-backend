import { Router } from "express";
 
import { adminMiddleware } from "../middlewares/admin-middleware";
import { upload } from "../middlewares/upload";
import { DepositController } from "../controllers/deposit-controller";
import { DepositService } from "../services/desposit-service";
import { PrismaDepositRepository } from "../repositories/prisma/deposit-respository";
import { PrismaWalletRepository } from "../repositories/prisma/prismawallet-repository";

const router = Router();

// Instanciando repositórios e service
const depositRepo = new PrismaDepositRepository();
const walletRepo = new PrismaWalletRepository();
const depositService = new DepositService(depositRepo, walletRepo);
const depositController = new DepositController(depositService);

// Criar depósito (com upload para Drive)
router.post(
  "/",
  upload.single("receipt"),
  depositController.create.bind(depositController)
);

// Aprovar depósito (admin)
router.patch(
  "/:id/approve",
  adminMiddleware,
  depositController.approve.bind(depositController)
);

// Rejeitar depósito (admin)
router.patch(
  "/:id/reject",
  adminMiddleware,
  depositController.reject.bind(depositController)
);

export default router;
