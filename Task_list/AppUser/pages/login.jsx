import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; //biblioteca para cookies//yarn add js-cookie
import axios from "axios";
//UI KIT
import { TextField, Button, Box } from "@mui/material";
//component
import LoginField from "./components/LoginField";

export function Login() {
  const [username, setUsername] = useState(""); // Corrigido para 'setUsername'
  const [password, setPassword] = useState(""); // Corrigido para 'setPassword'
  const navigate = useNavigate();

  //BOTAO/fazer login
  async function buttonSend(e) {
    e.preventDefault();
    try {
      let response = await axios.post("http://127.0.0.1:8000/api/login/", {
        username: username,
        password: password,
      });
      const result = response.data;

      // se receber o acces e refresh token.../sauva no Cookes
      if (result.access && result.refresh) {
        // Salvando os tokens nos cookies
        Cookies.set("access_token", result.access, {
          expires: 3 / 86400,
          secure: true,
        }); // Expira após 3 segundos
        Cookies.set("refresh_token", result.refresh, {
          expires: 6,
          secure: true,
        }); // Expira após 7 dias
        navigate("/home/");
      } else {
        alert("Usuário ou senha incorretos");
      }
    } catch (error) {
      console.error("Erro ao buscar dados:", error); // Trata erros na requisição
    }
  }

  return (
    <LoginField
      {...{ buttonSend, setUsername, setPassword, username, password }}
    ></LoginField>
  );
}
