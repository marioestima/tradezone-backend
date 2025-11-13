import { api } from "./api";

export interface Transaction {
  id: number;
  userId: number;
  type: "DEPOSIT" | "PROFIT" | "WITHDRAWAL";
  amount: number;
  fee: number;
  createdAt: string;
  note?: string;
}

export const transactionService = {
  getByUser: async (userId: number): Promise<Transaction[]> => {
    const response = await api.get(`/transactions/user/${userId}`);
    return response.data;
  },

  create: async (
    transaction: Omit<Transaction, "id" | "createdAt">
  ): Promise<Transaction> => {
    const response = await api.post("/transactions", transaction);
    return response.data;
  },
};
