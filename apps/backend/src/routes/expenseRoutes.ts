import type { Request, Response } from "express";
import { Router } from "express";
import { ZodError } from "zod";

import {
  createExpenseService,
  getAllExpenseService,
  editExpenseService,
  deleteExpenseService
} from "../services/expenseService";
import type { ErrorResponse, NewExpense } from "../types";
import { CustomHttpError } from "../http/CustomHttpError";
import { GetExpense, GetExpenseResponse , EditExpenseRequest, EditAndDeleteExpenseResponse } from "../dto/expense.dto";
import { getAllExpensesResponseValidator, getAllExpenseRequestValidator, editExpenseResponseValidator } from "../vaidator/expenseValidator";

const router = Router();

router.post(
  "/",
  async (req: Request, res: Response) => {
    const body = req.body;

    if (
      typeof body.description !== "string" ||
      body.description.trim() === ""
    ) {
      return res.status(400).json({ message: "description is required" });
    }

    if (typeof body.amount !== "number" || !Number.isFinite(body.amount)) {
      return res.status(400).json({ message: "amount must be a valid number" });
    }

    try {
      const expense = await createExpenseService(body);
      return res.status(201).json(expense);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Failed to create expense", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

router.get("/", async (req: Request, res: Response) => {
  const start: number = Number(req.query.start);
  const limit: number = Number(req.query.limit);
  
  try {
    getAllExpenseRequestValidator.parse({start,limit});
    const result: GetExpenseResponse = await getAllExpenseService(
      start,
      limit
    );
    getAllExpensesResponseValidator.parse(result);
    return res.status(200).json(result);
  } catch (err) {
    if (err instanceof CustomHttpError) {
      return res
        .status(err.status)
        .json({ error: err.error, message: err.message });
    }
    if(err instanceof ZodError){
      return res.status(400).json({error : "Zod Validation Error" ,message : err.message})
    }
    return res
      .status(500)
      .json({ error: "Internal Server Error", message: "Error in backend.." });
  }
});

router.patch("/:id",async(req:Request,res:Response)=>{
  const id = req.params.id;
  const data : EditExpenseRequest = req.body;
  try{
    //request validate
    const result : EditAndDeleteExpenseResponse = await editExpenseService(id,data);
    editExpenseResponseValidator.parse(result)
    res.status(200).json(result);

  }
  catch (err) {
    if (err instanceof CustomHttpError) {
      return res
        .status(err.status)
        .json({ error: err.error, message: err.message });
    }
    if(err instanceof ZodError){
      return res.status(400).json({error : "Zod Validation Error" ,message : err.message})
    }
    return res
      .status(500)
      .json({ error: "Internal Server Error", message: "Error in backend.." });
  }
})

router.delete("/:id",async(req:Request,res:Response) =>{
  const id : string = req.params.id;
  try{
    const result : EditAndDeleteExpenseResponse = await deleteExpenseService(id);
    editExpenseResponseValidator.parse(result);
    res.status(200).json(result);
  }
  catch (err) {
    if (err instanceof CustomHttpError) {
      return res
        .status(err.status)
        .json({ error: err.error, message: err.message });
    }
    if(err instanceof ZodError){
      return res.status(400).json({error : "Zod Validation Error" ,message : err.message})
    }
    return res
      .status(500)
      .json({ error: "Internal Server Error", message: "Error in backend.." });
  }
})
export default router;
