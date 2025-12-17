
import { ExpenseClass } from "./models/expense.model";
import { DocumentType } from "@typegoose/typegoose";
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

export type GetAllExpenseRepo = {
  data : DocumentType<ExpenseClass>[],
  totalDocuments : number
}

export type EditExpense = {
  description ?: string,
  amount ?:number
}

