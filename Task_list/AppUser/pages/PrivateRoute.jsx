import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

function PrivateRoute() {
    const accessToken = Cookies.get('access_token');
    const refreshToken = Cookies.get('refresh_token');

    // Redireciona para login se os tokens ACCESS E REFRESH "não existirem"
    if (!accessToken && !refreshToken) {
        return <Navigate to="/" replace />
    }

    return <Outlet />; // Renderiza as rotas filhas protegidas
}

export default PrivateRoute;
