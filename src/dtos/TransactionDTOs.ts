 
export interface CreateTransactionDTO {
  userId: number;
  type: "DEPOSIT" | "PROFIT" | "WITHDRAWAL";
  amount: number;
  fee?: number;
  note?: string;
}

export interface UpdateTransactionDTO {
  fee?: number;
  note?: string;
}
