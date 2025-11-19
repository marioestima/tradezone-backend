import { Request, Response } from "express";
import { DailyProfitService } from "../services/daily-profit-service";

const service = new DailyProfitService();

export class DailyProfitController {
  async getAll(req: Request, res: Response) {
    try {
      const id = req.user?.id;
      console.log(id);

      if (!id) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const profits = await service.getUserDailyProfits(id);
      console.log(profits);
      res.json(profits);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getSummary(req: Request, res: Response) {
    try {
      const id = req.user?.id;

      if (!id) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const total = await service.getTotalDailyProfit(id);
      const last7 = await service.getLast7DaysProfit(id);

      res.json({
        total,
        last7Days: last7,
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
