import React from "react";
import EditExpenseContainer from "../container/EditExpenseContainer";

const Check : React.FC = ()=>{
    const temp = {
        id : "69424f08ddf0cce947dac3bd",
        description : "food",
        amount : 500,
        createdAt : "12/12/2025"
    }
    return (
        <>
            <EditExpenseContainer propData={temp} />
        </>
    )
}

export default Check