import { Plan } from "@prisma/client";

export interface IPlanRepository {
  
  create(data: { name: string; value: number; dailyProfitPct: number }): Promise<Plan>;
 
  findById(id: number): Promise<Plan | null>;

  // Retorna todos os planos (abertos ou fechados)
  findAll(status?: "OPEN" | "CLOSED"): Promise<Plan[]>;

  // Atualiza informações de um plano
  update(id: number, data: { name?: string; value?: number; dailyProfitPct?: number; status?: "OPEN" | "CLOSED" }): Promise<Plan>;

  // Fecha um plano (muda status para CLOSED)
  closePlan(id: number): Promise<Plan>;

  // Deleta um plano
  delete(id: number): Promise<void>;
}
