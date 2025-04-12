import axios from "axios";
import Cookies from "js-cookie";

const baseURL = "http://127.0.0.1:8000/api/"; // http://127.0.0.1:8000/api/   //https://task-list-back-3h78.onrender.com/api/
let token = Cookies.get("access_token", { path: "/" });

//criando instance/cabeçalho inicial de Authorization que utiliza o token de acesso (access_token) obtido do cookie.
const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: { Authorization: `Bearer ${token}` },
});
axiosInstance.interceptors.request.use(async (req) => {
  //pega o access e refrash mais recente
  let access = Cookies.get("access_token", { path: "/" });
  let refresh = Cookies.get("refresh_token", { path: "/" });
  //verifica se o access existe/se expirou
  if (!access) {
    //renova
    console.log("renovando..");
    const response = await axios.post(`${baseURL}token/refresh/`, {
      refresh: refresh,
    });
    let datatoken = response.data.access;
    Cookies.set("access_token", datatoken, { expires: 8 / 1440, secure: true }); // Expira após 8 minutos
    req.headers.Authorization = `Bearer ${datatoken}`;
    console.log("renovado");
    return req;
  }
  //verifica se o refrash existe/se expirou
  if (!refresh) {
    Cookies.remove("access_token", { path: "/" });
    Cookies.remove("refresh_token", { path: "/" });
    return req;
  }
  //se nenhum expirou retorna normalmente
  req.headers.Authorization = `Bearer ${access}`;
  return req;
});
//criando interceptador

export default axiosInstance;
