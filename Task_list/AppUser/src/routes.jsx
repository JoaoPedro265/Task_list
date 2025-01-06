import {
    BrowserRouter as Router,
    Route,
    Routes
} from "react-router-dom";
import PrivateRoute from "../pages/PrivateRoute";
import { Login } from "../pages/login";
import { Home } from "../pages/home";
import { Edit} from "../pages/edit";
import { ViewTask } from "../pages/viewTask";
import { Error404 } from "../pages/error404";

export function AppRoutes() {
    return (
        <Router>
            <Routes>
                {/* Rota protegida: só acessível se o usuário estiver logado */}
                <Route element={<PrivateRoute />}>
                    <Route path='home/' element={<Home />} />
                    <Route path='view/task/:id' element={<ViewTask />} />
                    <Route path="edit/task/:taskID" element={<Edit/>}/>
                </Route>

                {/*Rota publica*/}
                <Route path='/' element={<Login />} />
                {/*Rota aleatoria*/}
                <Route path="*" element={<Error404 />} />
            </Routes>
        </Router>
    )
}