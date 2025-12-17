import { CustomHttpError } from "../http/CustomHttpError";
import { ExpenseModel, ExpenseClass } from "../models/expense.model";
import type { EditExpense, Expense, NewExpense } from "../types";
import { DocumentType } from "@typegoose/typegoose";
import { GetAllExpenseRepo } from "../types";
import { GetExpense } from "../dto/expense.dto";

export async function createExpenseRepository(
  input: NewExpense
): Promise<Expense> {
  const doc = await ExpenseModel.create({
    description: input.description,
    amount: input.amount,
  });

  return {
    id: doc._id.toString(),
    description: doc.description,
    amount: doc.amount,
    createdAt: doc.createdAt.toISOString(),
  };
}

export async function getAllExpenseRepositry(
  start: number,
  limit: number
): Promise<GetAllExpenseRepo> {
  const startIndex : number = (start -1 )*limit;
  try {
    const result: DocumentType<ExpenseClass>[] = await ExpenseModel.find()
      .skip(startIndex)
      .limit(limit);
    const totalDocuments : number = await ExpenseModel.countDocuments({});
    if (result.length === 0) {
      throw new CustomHttpError(
        400,
        "no data found",
        "There is no data in this page"
      );
    }
    let totalPages = 0 ;
    if((totalDocuments % limit ) !== 0 ){
      totalPages = Math.floor(totalDocuments / limit)+1;
    }
    else{
      totalPages = Math.floor(totalDocuments / limit);
    }
    const answer : GetAllExpenseRepo = {
      data : result,
      totalDocuments : totalPages
    }
    return answer;
  } catch (err) {
    if (err instanceof CustomHttpError) {
      throw err;
    }
    throw new CustomHttpError(
      500,
      "Internal Server Error",
      "Unknown error in repo layer"
    );
  }
}

export const editExpenseRepositry = async( id : string , data : EditExpense ) :Promise<DocumentType<ExpenseClass>> =>{
  try{
    const result : DocumentType<ExpenseClass> | null = await ExpenseModel.findByIdAndUpdate(id,{$set : data},{new:true});
    if(result === null){
      throw new CustomHttpError(400,"Data not found",`There is no data in this id :${id} to update`);
    }
    return result;
  }
  catch(err){
    if(err instanceof CustomHttpError){
      throw err;
    }
    throw new CustomHttpError(
      500,
      "Internal Server Error",
      "Unknown error in repo layer"
    );
  }
}

export const deleteExpenseRepositry = async(id : string) : Promise<DocumentType<ExpenseClass>> =>{
  try{
    const result : DocumentType<ExpenseClass> | null = await ExpenseModel.findByIdAndDelete(id);
    if(result === null){
      throw new CustomHttpError(400,"Data not found",`There is no data in this id : ${id} to delete`);
    }
    return result;
  }
  catch(err){
    if(err instanceof CustomHttpError){
      throw err;
    }
    throw new CustomHttpError(
      500,
      "Internal Server Error",
      "Unknown error in repo layer"
    );
  }
}