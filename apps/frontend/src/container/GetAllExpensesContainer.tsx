import React , {useState,useEffect} from "react";
import { GetExpense , deleteExpenseResponse, getAllExpenseResponse } from "../dto/expenseDto";
import GetAllExpensesComponent from "../component/GetAllExpensesComponent";
import { useNavigate } from "react-router-dom";
import EditExpenseContainer from "./EditExpenseContainer";

const GetAllExpensesContainer : React.FC = ()=>{

    const navigate = useNavigate();

    const [loading,setloading] = useState<boolean>(false);
    const [err ,seterr] = useState<string|null>(null);
    const [message , setmessage ]= useState<string>("");
    const [currpage , setcurrpage] = useState<number>(1);
    const [data , setdata] = useState<GetExpense[]>([]);
    const [totalItems , settotalItems] = useState<number>(0);
    const limit : number = 5;

    const [tempdata , settempdata] = useState<GetExpense>({
        id : "",
        description : "",
        amount : 0,
        createdAt : ""
    })

    const handleEdit = (id : string,description: string,amount : number,createdAt : string) => {
        const data = {
            id,
            description,
            amount,
            createdAt
        }
        settempdata(data);
    }

    const handleDelete = async (id: string) : Promise<void> => {
        try{
            setloading(true);
            const backendapi : string = "http://localhost:4000/api/expenses";
            const apiRes= await fetch(`${backendapi}/${id}`,{
                method:"DELETE"
            })

            const result : deleteExpenseResponse = await apiRes.json();
            setmessage(result.message);
        }
        catch(err){
            if(err instanceof Error){
                seterr(err.message);
            }
            seterr("Unknown error occured in the delete operation..");
        }
        finally{
            setloading(false);
        }
    }

    const handleNext = ():void =>{
        let temp = currpage;
        temp++;
        if(temp > totalItems){
            return;
        }
        setcurrpage(temp);
    }

    const handlePrev = ():void =>{
        let temp = currpage;
        temp--;
        if(temp <= 0){
            return;
        }
        setcurrpage(temp);
    }

    const handleCreate= (): void=>{
        navigate("/create");
    }

    useEffect(()=>{

        const getfun = async(): Promise<void>=>{
            const backendapi = "http://localhost:4000/api/expenses"

            try{
                setloading(true);
                const apiRes = await fetch(`${backendapi}?start=1&limit=${limit}`,{
                    method:"GET"
                })
                const result : getAllExpenseResponse = await apiRes.json();
                setdata(result.data);
                setmessage(result.message);
                settotalItems(result.totalPages);
            }
            catch(error){
                if(error instanceof Error){
                    seterr(error.message)
                }
                seterr("Unknown error occured in data fetching..")
            }
            finally{
                setloading(false);
            }
        }
        
        getfun();
    },[])

    useEffect(()=>{

        const getfun = async(): Promise<void>=>{
            const backendapi = "http://localhost:4000/api/expenses"

            try{
                setloading(true);
                const apiRes = await fetch(`${backendapi}?start=${currpage}&limit=${limit}`,{
                    method:"GET"
                })
                const result : getAllExpenseResponse = await apiRes.json();
                setdata(result.data);
                setmessage(result.message);
                settotalItems(result.totalPages);
            }
            catch(error){
                if(error instanceof Error){
                    seterr(error.message)
                }
                seterr("Unknown error occured in data fetching..")
            }
            finally{
                setloading(false);
            }
        }
        
        getfun();
    },[currpage])

    return (
        <>
        { tempdata.id !== "" && (<EditExpenseContainer propData={tempdata} />)}
        { tempdata.id === "" && (<GetAllExpensesComponent loading={loading} err={err} message={message} currpage={currpage} data={data} totalItems={totalItems} handleNext={handleNext} handlePrev={handlePrev} handleCreate={handleCreate} handleEdit={handleEdit} handleDelete={handleDelete} />)}
        </>
    ) 
}

export default GetAllExpensesContainer;