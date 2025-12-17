import React from "react"
import {BrowserRouter,Routes,Route} from "react-router-dom"
import GetAllExpensesContainer from "./container/GetAllExpensesContainer";
import EditExpenseContainer from "./container/EditExpenseContainer";
import App from "./App";

const Routing : React.FC = ()=>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<GetAllExpensesContainer/>}></Route>
                <Route path="/create" element={<App/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Routing;