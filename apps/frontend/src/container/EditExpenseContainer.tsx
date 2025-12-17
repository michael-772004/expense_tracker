import React, { useEffect, useState } from "react";
import { Expense } from "../component/EditExpenseComponent";
import EditExpenseComponent from "../component/EditExpenseComponent";
import { editExpenseResponse } from "../dto/expenseDto";
import { useNavigate } from "react-router-dom";

type EditExpenseContainerProp = {
    propData : Expense
}

const EditExpenseContainer : React.FC<EditExpenseContainerProp> = ({
    propData,
})=>{
    const navigate = useNavigate();
    const [loading,setloading] = useState<boolean>(false);
    const [err,seterr] = useState<string | null>(null);
    const [message,setmessage] = useState<string>("");
    const [data,setdata] = useState<Expense>({
        id:"",
        description : "",
        amount : 0,
        createdAt: ""
    });

    const prefunc = ()=>{
        console.log("edit 1");
        setdata(propData);
    }

    const handleChange =  (e: React.ChangeEvent<HTMLInputElement>) : void =>{
        setdata({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e : React.FormEvent) :Promise<void>=>{

        if(data.description === ""){
            setmessage("description should not be empty");
            return;
        }
        if(data.amount === 0){
            setmessage("amount should not be empty");
        }

        try{
            setloading(true);

            const backendapi = "http://localhost:4000"
            const api = await fetch(`${backendapi}/api/expenses/${propData.id}`,{
                method : "PATCH",
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify(data)
            })

            const response : editExpenseResponse  = await api.json();
            setmessage(response.message)
            navigate("/")
        }
        catch(error){
            if(error instanceof Error){
                seterr(error.message);
            }
            seterr("Unknown error data cannot be send..");
        }
        finally{
            setloading(false)
        }
    }
    

    
    return <EditExpenseComponent loading={loading} err={err} data={data} handleChange={handleChange} handleSubmit={handleSubmit}/>
}

export default EditExpenseContainer;
