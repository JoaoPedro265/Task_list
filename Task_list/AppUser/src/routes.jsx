import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./pages/PrivateRoute";
import { Login } from "./pages/login";
import { Home } from "./pages/home";
import { Edit } from "./pages/edit";
import { Error404 } from "./pages/error404";
import { CreateTask } from "./pages/createTask";
import { Register } from "./pages/register";

export function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Rota protegida: só acessível se o usuário estiver logado */}
        <Route element={<PrivateRoute />}>
          <Route path="home/" element={<Home />} />
          <Route path="edit/task/:taskID" element={<Edit />} />
          <Route path="add/task/" element={<CreateTask />} />
        </Route>

        {/*Rota publica*/}
        <Route path="/" element={<Login />} />
        <Route path="register/" element={<Register />} />
        {/*Rota aleatoria*/}
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Router>
  );
}
