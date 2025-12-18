import * as z from "zod";

export const getAllExpenseRequestValidator = z.object({
  start: z.number(),
  limit: z.number(),
});


export const getAllExpensesResponseValidator = z.object({
    data : z.array(z.object(
        {
            id : z.string(),
            description : z.string(),
            amount : z.number(),
            createdAt : z.string()
        }
        )),
    message : z.string(),
    totalPages : z.number()
})


export const editExpenseResponseValidator = z.object({
    data : z.object({
        id : z.string(),
        description :z.string(),
        amount : z.number(),
        createdAt : z.string()
    }),
    message : z.string()
})