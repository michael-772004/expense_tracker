export type GetExpense = {
    id : string,
    description : string,
    amount : number,
    createdAt : string
}

export type GetExpenseRequest = {
    start : number,
    limit : number
}

export type GetExpenseResponse = {
    data : GetExpense[],
    message : string,
    totalPages : number
}

export type EditExpenseRequest = {
    description?: string,
    amount?:number
}

export type EditAndDeleteExpenseResponse = {
    data : GetExpense,
    message : string
}

