import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListEmp from './Pages/ListEmp';
import AddEmp from './Pages/AddEmp';
import EditEmp from './Pages/EditEmp';
import ViewEmp from './Pages/ViewEmp';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {    

    return (
        <div className="container pt-3">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/list" element={<ListEmp />} />
                    <Route path="/addemp" element={<AddEmp />} />
                    <Route path="/editemp/:id" element={<EditEmp />} />
                    <Route path="/viewemp/:id" element={<ViewEmp />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
