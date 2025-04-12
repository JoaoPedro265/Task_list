import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie"; //biblioteca para cookies//yarn add js-cookie
import axios from "axios";
//component
import LoginField from "./components/LoginField";

export function Login() {
  const [loading, setLoading] = useState(null);
  const [username, setUsername] = useState(""); // Corrigido para 'setUsername'
  const [password, setPassword] = useState(""); // Corrigido para 'setPassword'
  const [alert, setAlert] = useState(false);
  const location = useLocation(); // Acessa o estado enviado pela navegação
  const success = location.state?.success || false;
  const navigate = useNavigate();

  //BOTAO/fazer login
  async function buttonSend(e) {
    e.preventDefault();
    try {
      setLoading(true);
      let response = await axios.post(
        "http://127.0.0.1:8000/api/login/", //http://127.0.0.1:8000/api/login/  //https://task-list-back-3h78.onrender.com/api/login/
        {
          username: username,
          password: password,
        }
      );
      const result = response.data;
      // se receber o acces e refresh token.../sauva no Cookes
      if (result.access && result.refresh) {
        // Salvando os tokens nos cookies
        Cookies.set("access_token", result.access, {
          expires: 8 / 1440, // Expira após 8 minutos
          secure: true,
        }); // Expira após 3 segundos
        Cookies.set("refresh_token", result.refresh, {
          expires: 6, // Expira após 6 dias
          secure: true,
        }); // Expira após 7 dias
        navigate("/home/");
      } else {
        alert("Usuário ou senha incorretos");
      }
    } catch (error) {
      setLoading(false);
      setAlert(true);
      console.error("Erro ao buscar dados:", error); // Trata erros na requisição
    }
  }

  return (
    <LoginField
      {...{
        buttonSend,
        setUsername,
        setPassword,
        username,
        password,
        alert,
        success,
        loading,
      }}
    ></LoginField>
  );
}
