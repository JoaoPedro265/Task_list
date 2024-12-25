import React, { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { RenoveAccessAccToken } from "../Token/StatusToken"; // Importa a função para renovar o token

function PrivateRoute() {
    const navigate = useNavigate();

    useEffect(() => {
        const checkToken = async () => {
            let token = Cookies.get('access_token');
            
            // Se o token não existir, tenta renová-lo
            if (!token) {
                const newToken = await RenoveAccessAccToken(); // Tenta renovar o token
                if (!newToken) {
                    navigate('/', { replace: true }); // Redireciona para login se a renovação falhar
                    return;
                }
                token = newToken; // Atualiza o token com o novo valor
                Cookies.set('access_token', token); // Armazena o novo token no cookie
            }
        };

        checkToken();
    }, [navigate]); // O useEffect será reexecutado quando o navigate mudar

    return <Outlet />; // Renderiza as rotas filhas (Outlets) quando o token é válido
}

export default PrivateRoute;
