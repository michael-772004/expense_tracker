import React, { useState } from 'react';
import { createExpense } from './api';
import type { Expense } from './types';
import { useNavigate } from 'react-router-dom';

const App: React.FC = () => {
  const navigate = useNavigate();
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastCreated, setLastCreated] = useState<Expense | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setError(null);
    setLastCreated(null);

    const parsedAmount = parseFloat(amount);
    if (Number.isNaN(parsedAmount)) {
      setError('Amount must be a number');
      return;
    }

    setLoading(true);

    try {
      const expense = await createExpense({
        description: description.trim(),
        amount: parsedAmount
      });

      setLastCreated(expense);
      setDescription('');
      setAmount('');
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-semibold text-slate-900 mb-4">
          Create Expense
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              placeholder="e.g. Coffee with client"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Amount
            </label>
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              placeholder="e.g. 12.50"
              required
            />
          </div>

          {error && (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Saving...' : 'Create Expense'}
          </button>
        </form>

        {lastCreated && (
          <div className="mt-6 rounded-md border border-slate-200 bg-slate-50 p-4 text-sm">
            <h2 className="font-medium text-slate-900 mb-1">
              Last created expense
            </h2>
            <p className="text-slate-700">
              <span className="font-semibold">{lastCreated.description}</span>{' '}
              — ${lastCreated.amount.toFixed(2)}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              ID: {lastCreated.id} · Created at:{' '}
              {new Date(lastCreated.createdAt).toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

