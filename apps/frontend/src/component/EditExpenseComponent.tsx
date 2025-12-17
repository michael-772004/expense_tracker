import React, { FormEvent } from "react"
import { GetExpense } from "../dto/expenseDto"

export type Expense = GetExpense

type EditExpenseProp = {
    loading : boolean,
    err : string | null,
    data : Expense,
    handleChange : (e: React.ChangeEvent<HTMLInputElement>)=>void,
    handleSubmit : (e:FormEvent)=> void
}

const EditExpenseComponent : React.FC<EditExpenseProp> = ({
    loading,
    err,
    data,
    handleChange,
    handleSubmit
})=>{

    return(
        <>
            <div>
                <h1>Edit expense</h1>
                
                <form onSubmit={handleSubmit}>
                    <label htmlFor="">Description</label>
                    <input 
                        type="text"
                        name="description"
                        value={data.description}
                        onChange={handleChange}     
                    />

                    <label htmlFor="">Amount</label>
                    <input 
                        type="text"
                        name="amount"
                        value={data.amount}
                        onChange={handleChange}

                    />
                    <button type="submit">Apply</button>
                </form>
            </div>
        </>
    )

}

export default EditExpenseComponent