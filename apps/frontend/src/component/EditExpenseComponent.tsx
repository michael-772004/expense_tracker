import React, { FormEvent } from "react"
import { GetExpense } from "../dto/expenseDto"

export type Expense = GetExpense

type EditExpenseProp = {
    loading : boolean,
    err : string | null,
    data : Expense,
    message : string,
    handleChange : (e: React.ChangeEvent<HTMLInputElement>)=>void,
    handleSubmit : (e:FormEvent)=> void
}

const EditExpenseComponent : React.FC<EditExpenseProp> = ({
    loading,
    err,
    data,
    message,
    handleChange,
    handleSubmit
})=>{

    return(
        <>
            <div>
                <h1>Edit expense</h1>
                

                {loading && (<p>Loading...</p>)}

                {err !== null && (<p>{err}</p>)}

                <p>Message : {message}</p>

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
                        type="number"
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