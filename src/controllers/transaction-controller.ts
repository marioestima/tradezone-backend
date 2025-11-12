import { Request, Response } from "express";
import { PrismaTransactionRepository } from "../repositories/prisma/transation-repository";
import { TransactionService } from "../services/transation-service";

const transactionRepo = new PrismaTransactionRepository();
const transactionService = new TransactionService(transactionRepo);

export class TransactionController {
  async create(req: Request, res: Response) {
    try {
      const transaction = await transactionService.createTransaction(req.body);
      res.status(201).json(transaction);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getByUser(req: Request, res: Response) {
    try {
      const userId = Number(req.params.userId);
      const transactions = await transactionService.getTransactionsByUser(
        userId
      );
      res.json(transactions);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getByUserAndType(req: Request, res: Response) {
    try {
      const userId = Number(req.params.userId);
      const type = req.params.type as "DEPOSIT" | "PROFIT" | "WITHDRAWAL";
      const transactions =
        await transactionService.getTransactionsByUserAndType(userId, type);
      res.json(transactions);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const transaction = await transactionService.updateTransaction(
        id,
        req.body
      );
      res.json(transaction);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await transactionService.deleteTransaction(id);
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
