import { Request, Response } from "express";
import { PrismaInvestmentRepository } from "../repositories/prisma/investement-repository";
import { InvestmentService } from "../services/investement-service  ";

const investmentRepository = new PrismaInvestmentRepository();
const investmentService = new InvestmentService(investmentRepository);

export class InvestmentController {
  async create(req: Request, res: Response) {
    try {
      const investment = await investmentService.createInvestment(req.body);
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
