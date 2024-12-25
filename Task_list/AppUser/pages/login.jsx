import { useState } from "react";
import { Navigate, useNavigate} from "react-router-dom";
import Cookies from 'js-cookie';//biblioteca para cookies//yarn add js-cookie

export function Login() {
  const [username, setUsername] = useState(''); // Corrigido para 'setUsername'
  const [password, setPassword] = useState(''); // Corrigido para 'setPassword'
  const navigate = useNavigate();
  
//BOTAO/fazer login
  async function buttonSend() {
    try {
      let response = await fetch('http://127.0.0.1:8000/api/login/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json', // Aceita resposta no formato JSON
          'Content-Type': 'application/json' // Informa que os dados enviados estão no formato JSON
        },
        body: JSON.stringify({
          username: username,
          password: password
        }),
      });

      const result = await response.json(); // Aguarda a resposta da API

      // se receber o acces e refresh token.../sauva no Cookes
      if (result.access && result.refresh) {
        // Salvando os tokens nos cookies
        Cookies.set('access_token',result.access,{expires: 1 / 1440,secure:true},);
        Cookies.set('refresh_token',result.refresh,{expires:6,secure:true},);
        navigate('home/')
        
      }else{
        alert('Usuário ou senha incorretos');
    }

    } catch (error) {
      console.error('Erro ao buscar dados:', error); // Trata erros na requisição
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)} // Corrigido para 'setUsername'
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} // Corrigido para 'setPassword'
      />
      <button onClick={buttonSend}>Submit</button>
    </div>
  );
}
