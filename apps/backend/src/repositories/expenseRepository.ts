import { ExpenseModel } from '../models/expense.model';
import type { Expense, NewExpense } from '../types';

export async function createExpenseRepository(
  input: NewExpense
): Promise<Expense> {
  const doc = await ExpenseModel.create({
    description: input.description,
    amount: input.amount
  });

  return {
    id: doc._id.toString(),
    description: doc.description,
    amount: doc.amount,
    createdAt: doc.createdAt.toISOString()
  };
}

