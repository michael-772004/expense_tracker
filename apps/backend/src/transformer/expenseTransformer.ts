import {  EditAndDeleteExpenseResponse, GetExpense , GetExpenseResponse } from "../dto/expense.dto";
import { ExpenseClass } from "../models/expense.model";
import { GetAllExpenseRepo } from "../types";
import { DocumentType } from "@typegoose/typegoose";

export const getAllExpenseTransformer = (data : GetAllExpenseRepo) : GetExpenseResponse=>{
    const result : GetExpense[] = data.data.map(({_id,description,amount,createdAt}) => (
        {
        id : _id.toString(),
        description : description,
        amount : amount,
        createdAt : createdAt.toISOString()
    }
    ))

    const answer : GetExpenseResponse = {
        data : result,
        totalPages : data.totalDocuments,
        message : "successfully fetched"
    }

    return answer;
}

export const editExpenseResponseTranformer = (data : DocumentType<ExpenseClass>) : EditAndDeleteExpenseResponse =>{
    const result : GetExpense = {
        id : data._id.toString(),
        description: data.description,
        amount: data.amount,
        createdAt : data.createdAt.toISOString()
    }

    const answer : EditAndDeleteExpenseResponse = {
        data : result,
        message : "Updated Successfully.."
    }
    return answer;

}

export const deleteExpenseResponseTranformer = (data : DocumentType<ExpenseClass>) : EditAndDeleteExpenseResponse =>{
    const result : GetExpense = {
        id : data._id.toString(),
        description: data.description,
        amount: data.amount,
        createdAt : data.createdAt.toISOString()
    }

    const answer : EditAndDeleteExpenseResponse = {
        data : result,
        message : "Deleted successfully.."
    }
    return answer;

}
