import {
    BrowserRouter as Router,
    Route,
    Routes
} from "react-router-dom";
import PrivateRoute from "../pages/PrivateRoute";
import { Login } from "../pages/Login";
import { Home } from "../pages/home";
import { ViewTask } from "../pages/viewTask";
import { Edit } from "../pages/edit";

export function AppRoutes(){
    return(
        <Router>
            <Routes>
                {/* Rota protegida: só acessível se o usuário estiver logado */}
                <Route element={<PrivateRoute/>}>
                    <Route path='home/' element={<Home />} />
                    <Route path='edit/' element={<Edit />} />
                </Route>

                {/*Rota publica*/}
                <Route path='/' element={<Login />} />
                <Route path='view/' element={<ViewTask />} />
            </Routes>
        </Router>
    )
}