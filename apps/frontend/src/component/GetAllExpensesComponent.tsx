import React from "react";
import { GetExpense } from "../dto/expenseDto";

export type Expense = GetExpense;

type GetAllExpensesProp = {
    loading : boolean,
    currpage : number,
    totalItems : number,
    err : string | null,
    message : string,
    data: Expense[],
    handleNext : ()=> void,
    handlePrev : ()=> void,
    handleCreate : ()=> void
    handleEdit : (id : string , description: string,amount: number, createdAt:string) => void
    handleDelete : (id : string) => void

}

const GetAllExpensesComponent : React.FC<GetAllExpensesProp> = ({
    loading,
    currpage,
    totalItems,
    err,
    message,
    data,
    handleNext,
    handlePrev,
    handleCreate,
    handleEdit,
    handleDelete
})=>{
    return(
        <>
        <div>
            <h1>Expenses</h1>
            <button onClick={handleCreate}>Create</button>
            <p >{message}</p>

            <p>Pages {currpage} of {totalItems}</p>

            {loading && (<p>Loading...</p>)}
            {err !== null && (<p>err</p>)}
            {!loading && err === null && (
                <div>
                    {data.map((i)=>(
                        <div key={i.id} className="border-1 border-gray-200 p-4">
                            <p>Description : {i.description}</p>
                            <p>Amount : {i.amount}</p>
                            <p>CreatedAt : {i.createdAt}</p>
                            <div className="flex gap-4">
                                <button className="p-2 rounded-lg shadow bg-yellow-200 text-black" onClick={ ()=>handleEdit(i.id,i.description,i.amount,i.createdAt)}>Edit</button>
                            <   button className="p-2 rounded-lg shadow bg-red-600 text-white" onClick={()=> handleDelete(i.id)}>Delete</button>
                            </div>
                            
                        </div> 
                        
                    ))}
                </div>
            )}
            <div>
                <button type="button" onClick={handlePrev} className="p-2 rounded-lg border-1 border-gray-200">Prev</button>
                <button type="button" onClick={handleNext} className="p-2 rounded-lg border-1 border-gray-200">Next</button>
            </div>
            
            
        </div>
        </>
    )
}

export default GetAllExpensesComponent;