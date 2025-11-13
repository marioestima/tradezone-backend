import { api } from "./api";

export interface Investment {
  id: number;
  userId: number;
  planId: number;
  amount: number;
  accumulated: number;
  active: boolean;
  startAt: string;
  updatedAt: string;
}

export const investmentService = {
  create: async (
    userId: number,
    planId: number,
    amount: number
  ): Promise<Investment> => {
    const response = await api.post("/investments", {
      userId,
      planId,
      amount,
    });
    return response.data;
  },

  getActiveByUser: async (userId: number): Promise<Investment[]> => {
    const response = await api.get(`/investments/active/${userId}`);
    return response.data;
  },  

  incrementAccumulated: async (
    id: number,
    value: number
  ): Promise<Investment> => {
    const response = await api.patch(`/investments/${id}/increment`, {
      value,
    });
    return response.data;
  },
};
