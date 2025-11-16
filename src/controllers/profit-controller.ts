// controllers/daily-profit-controller.ts
import { Request, Response } from "express";
import { DailyProfitService } from "../services/daily-profit-service";

const service = new DailyProfitService();

export class DailyProfitController {
  async getAll(req: Request, res: Response) {
    try {
      const profits = await service.getUserDailyProfits(req.user?.userId);
      res.json(profits);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getSummary(req: Request, res: Response) {
    try {
      const total = await service.getTotalDailyProfit(req.user?.userId);
      const last7 = await service.getLast7DaysProfit(req.user?.userId);
      res.json({
        total,
        last7Days: last7,
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
