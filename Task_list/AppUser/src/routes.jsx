import {
    BrowserRouter as Router,
    Route,
    Routes
} from "react-router-dom";
import PrivateRoute from "../pages/PrivateRoute";
import { Login } from "../pages/login";
import { Home } from "../pages/home";
import { ViewTask } from "../pages/viewTask";
import { Edit } from "../pages/edit";
import { Error404 } from "../pages/error404";

export function AppRoutes() {
    return (
        <Router>
            <Routes>
                {/* Rota protegida: só acessível se o usuário estiver logado */}
                    <Route path='home/' element={<Home />} />
                <Route element={<PrivateRoute />}>
                    <Route path='edit/' element={<Edit />} />
                </Route>

                {/*Rota publica*/}
                <Route path='/' element={<Login />} />
                <Route path='view/' element={<ViewTask />} />
                {/*Rota aleatoria*/}
                <Route path="*" element={<Error404 />} />
            </Routes>
        </Router>
    )
}