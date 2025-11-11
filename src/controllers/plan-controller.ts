import { Request, Response } from "express";
import { PrismaPlanRepository } from "../repositories/prisma/plan-repository";
import { PlanService } from "../services/plan-service";

const planRepository = new PrismaPlanRepository();
const planService = new PlanService(planRepository);

export class PlanController {
  async create(req: Request, res: Response) {
    try {
      const plan = await planService.createPlan(req.body);
      res.status(201).json(plan);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAll(req: Request, res: Response) {
    const plans = await planService.getAllPlans();
    res.json(plans);
  }

  async close(req: Request, res: Response) {
    const plan = await planService.closePlan(Number(req.params.id));
    res.json(plan);
  }
}
