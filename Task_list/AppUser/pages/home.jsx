import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { RenoveAccessAccToken } from '../Token/StatusToken';

export function Home() {
  const [data, setData] = useState([]); // Estado para armazenar os dados da API
  const [error, setError] = useState('')
  const navigate=useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      // OBS:verifica se o acces venceu
      let access_token = Cookies.get('access_token')
      // Se o access_token não estiver presente ou estiver expirado\
      if(!access_token){
        access_token=await RenoveAccessAccToken()// Tenta renovar o token de access do cookie
        if(!access_token){
          setError('Token de acesso expirado. Faça login novamente.')//OBS: aqui o Refrash expirou
          return
        }
      }
      //busca os dados do usuario tasks
      let response = await fetch('http://127.0.0.1:8000/api/tasks/', {
        method: 'GET',
        headers: {
          'Accept': 'application/json', // Tipo de resposta que esperamos
          'Authorization': `Bearer ${access_token}`,
        }
      })
      // Verifica se o token ainda é válido ou se expirou
      if (response.status === 401) {
        const newAccessToken= await RenoveAccessAccToken()
        if (!newAccessToken){
          setError('Token de acesso expirado. Faça login novamente.');
          return;
        }
      }
      const result = await response.json()
      setData(result)
    };

    fetchData(); // Chama a função para buscar os dados ao carregar o componente
  }, []);// O array vazio garante que o useEffect será executado apenas uma vez


  return (
    <div>
      <h1>{error}</h1>
      <h1>Dados da API</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}> {/* Usando o item.id como chave */}
            <strong>Texto:</strong> {item.text} <br />
            <strong>Data:</strong> {item.data} <br />
            <strong>Completo:</strong> {item.completed ? 'Sim' : 'Não'} <br />
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
}