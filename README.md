# Expense Manager Monorepo

Simple monorepo with:
- Backend: Node + Express + TypeScript
- Frontend: React + TypeScript (Vite)
- One `POST /api/expenses` endpoint
- OpenAPI spec in YAML under the backend
- MongoDB persistence configured via environment variable
- Backend domain layers: routes → services → repositories → Typegoose models

## To be implemented

- Add support to edit existing expenses (backend + frontend).
- Add support to delete expenses (backend + frontend).
- Extend expenses to support multiple currencies (e.g. INR, USD).
- Integrate multi-currency handling and edit/delete flows into the frontend UI.

## Structure

- `apps/backend` – REST API with a single create-expense endpoint
- `apps/frontend` – React UI with a simple create-expense form using Tailwind utility classes
  - Backend layers:
    - `src/routes/expenseRoutes.ts` – HTTP route for creating an expense
    - `src/services/expenseService.ts` – business logic for creating expenses
    - `src/repositories/expenseRepository.ts` – Mongo persistence using Typegoose
    - `src/models/expense.model.ts` – Typegoose model definition

## Getting started

From the repo root:

```bash
npm install
```

Then in one terminal:

```bash
npm run dev:backend
```

And in another:

```bash
npm run dev:frontend --workspace frontend
```

The frontend dev server will run on `http://localhost:5173` and proxies `/api/*` to the backend on `http://localhost:4000`.

## MongoDB configuration

The backend connects to MongoDB using the `MONGO_URI` environment variable.

- Default (if `MONGO_URI` is not set): `mongodb://127.0.0.1:27017/expense_manager`
- To point at a different Mongo instance, export `MONGO_URI` before starting the backend, for example:

```bash
export MONGO_URI="mongodb://127.0.0.1:27017/expense_manager"
npm run dev:backend
```
