import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Para redirecionamento

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState('');

  const navigate = useNavigate(); // Hook para redirecionamento

  async function buttonSend() {
    try {
      // Primeira requisição para fazer login e obter o token
      const response = await fetch('http://127.0.0.1:8000/api/login/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
        }),
      });

      const result = await response.json();
      setData(result);

      // Salvar os tokens no localStorage
      if (result.access) {
        localStorage.setItem('access_token', result.access); // Armazena o token de acesso
        localStorage.setItem('refresh_token', result.refresh); // Armazena o token de atualização
      }
      // Redirecionar para a página Home
      //navigate("home/");
      console.log(result);

    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  }

  async function refreshToken() {
    try {
      const refresh_token = localStorage.getItem('refresh_token');
      
      // Verifica se há um token de atualização
      if (refresh_token) {
        const response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ refresh: refresh_token })
        });

        const result = await response.json();
        if (result.access) {
          // Atualiza o token de acesso
          localStorage.setItem('access_token', result.access);
          console.log('Token de acesso atualizado');
        }
      }
    } catch (error) {
      console.error('Erro ao atualizar o token:', error);
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={buttonSend}>Submit</button>
    </div>
  );
}