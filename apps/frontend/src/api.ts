import type { ErrorResponse, Expense, NewExpense } from './types';

// Empty base URL because Vite dev server proxies `/api` to the backend
const API_BASE_URL = '';

export async function createExpense(input: NewExpense): Promise<Expense> {
  const response = await fetch(`${API_BASE_URL}/api/expenses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(input)
  });

  if (!response.ok) {
    let message = 'Failed to create expense';

    try {
      const errorBody = (await response.json()) as Partial<ErrorResponse>;
      if (errorBody?.message) {
        message = errorBody.message;
      }
    } catch {
      // ignore JSON parse errors and fall back to default message
    }

    throw new Error(message);
  }

  return (await response.json()) as Expense;
}

