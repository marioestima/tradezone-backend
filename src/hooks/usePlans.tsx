import { useState, useEffect } from "react";
import { planService, type Plan as ApiPlan } from "../services/planService";

// Tipo que vamos usar no frontend
export type Plan = {
  id: number;
  amount: number;
  returnAmount: number;
  profitRate: number;
};

export const usePlans = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPlans = async () => {
      try {
        setLoading(true);
        const allPlans: ApiPlan[] = await planService.getAll();

        const mapped = allPlans.map((p) => ({
          id: p.id,
          amount: p.value,
          returnAmount: p.value + (p.value * p.dailyProfitPct * 60) / 100,
          profitRate: p.dailyProfitPct,
        }));

        setPlans(mapped);
      } catch (err: any) {
        console.error("Erro ao carregar planos:", err);
        setError(err.message || "Erro ao carregar planos");
      } finally {
        setLoading(false);
      }
    };

    loadPlans();
  }, []);

  return { plans, loading, error };
};
