export interface NewExpense {
  description: string;
  amount: number;
}

export interface Expense extends NewExpense {
  id: string;
  createdAt: string;
}

export interface ErrorResponse {
  message: string;
}
