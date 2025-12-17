import type { Expense, GetAllExpenseRepo, NewExpense ,EditExpense} from '../types';
import { createExpenseRepository ,deleteExpenseRepositry,editExpenseRepositry,getAllExpenseRepositry } from '../repositories/expenseRepository';
import { CustomHttpError } from '../http/CustomHttpError';
import { editExpenseResponseTranformer,deleteExpenseResponseTranformer, getAllExpenseTransformer } from '../transformer/expenseTransformer';
import { EditAndDeleteExpenseResponse, GetExpense, GetExpenseResponse } from '../dto/expense.dto';
import { DocumentType } from '@typegoose/typegoose';
import { ExpenseClass } from '../models/expense.model';


export async function createExpenseService(
  input: NewExpense
): Promise<Expense> {
  const trimmed: NewExpense = {
    description: input.description.trim(),
    amount: input.amount
  };

  return createExpenseRepository(trimmed);
}

export async function getAllExpenseService(start : number,limit:number):Promise<GetExpenseResponse> {
  try{
    const result : GetAllExpenseRepo = await getAllExpenseRepositry(start,limit);
    const answer : GetExpenseResponse = getAllExpenseTransformer(result);
    return answer;
  }
  catch (err) {
      throw err;
    }
}

export async function editExpenseService(id:string , data : EditExpense ) : Promise<EditAndDeleteExpenseResponse>{
  try{
    if(data.description === "" || data.amount === 0){
      throw new CustomHttpError(400,"Empty data","No data send to update");
    }
    const result : DocumentType<ExpenseClass> = await editExpenseRepositry(id,data);
    const answer : EditAndDeleteExpenseResponse = editExpenseResponseTranformer(result);
    return answer;
  }
  catch (err) {
      throw err;
    }
}

export async function deleteExpenseService(id:string): Promise<EditAndDeleteExpenseResponse>{
  try{
    if(id === ""){
      throw new CustomHttpError(400,"No id","Id is not given in this request");
    }
    const result : DocumentType<ExpenseClass> = await deleteExpenseRepositry(id);
    const answer : EditAndDeleteExpenseResponse = deleteExpenseResponseTranformer(result);
    return answer;
  }
  catch(err){
    throw err;
  }
}