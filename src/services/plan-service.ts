import { IPlanRepository } from "../repositories/interfaces/IPlanRepository";
import { CreatePlanDTO, UpdatePlanDTO } from "../dtos/PlanDTOs";
import { Plan } from "@prisma/client";

export class PlanService {
  constructor(private planRepository: IPlanRepository) {}

  async createPlan(data: CreatePlanDTO): Promise<Plan> {
    return this.planRepository.create(data);
  }

  async getPlanById(id: number): Promise<Plan | null> {
    return this.planRepository.findById(id);
  }

  async getAllPlans(status?: "OPEN" | "CLOSED"): Promise<Plan[]> {
    return this.planRepository.findAll(status);
  } 

  async updatePlan(id: number, data: UpdatePlanDTO): Promise<Plan> {
    return this.planRepository.update(id, data);
  }

  async closePlan(id: number): Promise<Plan> {
    return this.planRepository.closePlan(id);
  }

  async deletePlan(id: number): Promise<void> {
    await this.planRepository.delete(id);
  }
}
