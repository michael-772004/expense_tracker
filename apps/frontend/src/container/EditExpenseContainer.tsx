import React, { useEffect, useState } from "react";
import { Expense } from "../component/EditExpenseComponent";
import EditExpenseComponent from "../component/EditExpenseComponent";
import { editExpenseResponse } from "../dto/expenseDto";

type EditExpenseContainerProp = {
    propData : Expense
}

const EditExpenseContainer : React.FC<EditExpenseContainerProp> = ({
    propData,
})=>{
    const [loading,setloading] = useState<boolean>(false);
    const [err,seterr] = useState<string | null>(null);
    const [message,setmessage] = useState<string>("");
    const [data,setdata] = useState<Expense>({
        id:"",
        description : "",
        amount : 0,
        createdAt: ""
    });

    const prefunc = () : void =>{
        setdata(propData);
    }

    const handleChange =  (e: React.ChangeEvent<HTMLInputElement>) : void =>{
        setdata({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e : React.FormEvent) :Promise<void>=>{
        e.preventDefault();

        if(data.description === ""){
            setmessage("description should not be empty");
            return;
        }
        if(data.amount === 0){
            setmessage("amount should not be empty");
            return;
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
            console.log("response : ",response);
            setmessage(response.message)
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
    
    useEffect(()=>{
        console.log("hi")
        prefunc();
    },[])

    
    return <EditExpenseComponent loading={loading} err={err} data={data} message={message} handleChange={handleChange} handleSubmit={handleSubmit}/>
}

export default EditExpenseContainer;
