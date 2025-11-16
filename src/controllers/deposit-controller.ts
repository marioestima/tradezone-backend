import { Request, Response } from "express";
import { DepositService } from "../services/desposit-service";

export class DepositController {
  constructor(private depositService: DepositService) {}

  async create(req: Request, res: Response) {
    try {
      const { amount } = req.body;
      const receiptUrl = req.file?.path;
      const userId = req.user?.userId;

      if (!userId) return res.status(401).json({ message: "Unauthorized" });

      const deposit = await this.depositService.requestDeposit(userId, amount, receiptUrl);

      res.status(201).json(deposit);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async approve(req: Request, res: Response) {
    const deposit = await this.depositService.approveDeposit(Number(req.params.id));
    res.json(deposit);
  }

  async reject(req: Request, res: Response) {
    const deposit = await this.depositService.rejectDeposit(Number(req.params.id));
    res.json(deposit);
  }
}
