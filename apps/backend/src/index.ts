import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import expenseRoutes from './routes/expenseRoutes';

const app = express();
const port = process.env.PORT || 4000;

const mongoUri =
  process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/expense_manager';

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Expense Manager API is running');
});

// Only create endpoint is implemented; no other routes are registered.
app.use('/api/expenses', expenseRoutes);

async function start() {
  try {
    await mongoose.connect(mongoUri);
    // eslint-disable-next-line no-console
    console.log('Connected to MongoDB');

    app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`Backend listening on http://localhost:${port}`);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  }
}

void start();
