import type { Expense, NewExpense } from '../types';
import { createExpenseRepository } from '../repositories/expenseRepository';

export async function createExpenseService(
  input: NewExpense
): Promise<Expense> {
  const trimmed: NewExpense = {
    description: input.description.trim(),
    amount: input.amount
  };

  return createExpenseRepository(trimmed);
}

