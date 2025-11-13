import { Request, Response } from "express";
import { PrismaInvestmentRepository } from "../repositories/prisma/investement-repository";
import { PrismaWalletRepository } from "../repositories/prisma/prismawallet-repository";
import { InvestmentService } from "../services/investement-service";

const investmentRepository = new PrismaInvestmentRepository();
const walletRepository = new PrismaWalletRepository();
const investmentService = new InvestmentService(
  investmentRepository,
  walletRepository
);

export class InvestmentController {
  async create(req: Request, res: Response) {
    try {
      const userId = req.user?.userId;
      const { planId, amount } = req.body;

      if (!userId) return res.status(401).json({ message: "Não autenticado." });

      const investment = await investmentService.createInvestment({
        userId,
        planId,
        amount,
        accumulated: 0, // valor inicial
        active: true, // investimento começa ativo
      });

      res.status(201).json(investment);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getByUser(req: Request, res: Response) {
    const investments = await investmentService.getInvestmentsByUser(
      Number(req.params.userId)
    );
    res.json(investments);
  }

  async increment(req: Request, res: Response) {
    const investment = await investmentService.incrementAccumulated(req.body);
    res.json(investment);
  }
}
