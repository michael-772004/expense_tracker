import type { Request, Response } from 'express';
import { Router } from 'express';

import { createExpenseService } from '../services/expenseService';
import type { ErrorResponse, NewExpense } from '../types';

const router = Router();

router.post<unknown, ErrorResponse | unknown, NewExpense>(
  '/',
  async (req: Request, res: Response) => {
    const body = req.body;

    if (typeof body.description !== 'string' || body.description.trim() === '') {
      return res.status(400).json({ message: 'description is required' });
    }

    if (typeof body.amount !== 'number' || !Number.isFinite(body.amount)) {
      return res.status(400).json({ message: 'amount must be a valid number' });
    }

    try {
      const expense = await createExpenseService(body);
      return res.status(201).json(expense);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to create expense', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
);

export default router;

