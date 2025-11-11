// src/dtos/PlanDTOs.ts

export interface CreatePlanDTO {
  name: string;
  value: number;
  dailyProfitPct: number;
}

export interface UpdatePlanDTO {
  name?: string;
  value?: number;
  dailyProfitPct?: number;
  status?: "OPEN" | "CLOSED";
}

export interface ClosePlanDTO {
  planId: number;
}
