export type GetExpense = {
    id : string,
    description : string,
    amount : number,
    createdAt : string
}

export type getAllExpenseResponse = {
    data : GetExpense[],
    message : string,
    totalPages : number
}

export type editExpenseResponse = {
    data : GetExpense,
    message : string
}

export type deleteExpenseResponse = {
    data : GetExpense,
    message : string
}