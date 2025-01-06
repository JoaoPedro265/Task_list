import { useState, useEffect } from 'react';
import axiosInstance from '../API/Api';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'

export function Home() {
  const [data, setData] = useState([]); // Estado para armazenar os dados da API
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  const fetchData = async () => {
    try {
      let response = await axiosInstance.get('tasks/')
      setData(response.data)
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchData(); // Chama a função para buscar os dados ao carregar o componente
  }, []);// O array vazio garante que o useEffect será executado apenas uma vez
  if (loading) {
    return <div>Carregando...</div>;
  }


  function viewTask(taskID) {
    console.log(`Você clicou no item com id: ${taskID}`);
    navigate(`/view/task/${taskID}`)
    // Aqui você pode redirecionar, mostrar mais informações, etc.
  };


  function logout() {
    Cookies.remove('refresh_token', { path: '/' });
    Cookies.remove('access_token', { path: '/' })
    return
  }



  return (
    <div>
      <a href="" onClick={logout}>Logout</a>
      <h1>Dados da API</h1>
      <ul>
        {data.map((item) => (
          <div
            key={item.id}
            onClick={() => ((viewTask(item.id)))}
            style={{
              cursor: 'pointer',   // Muda o cursor para a mãozinha
              border: '2px solid black',  // Borda preta de 2px
              padding: '10px',     // Adiciona um pouco de espaçamento
              marginBottom: '10px' // Adiciona um espaço entre os itens
            }}> {/* Usando o item.id como chave */}
            <strong>Texto:</strong> {item.text} <br />
            <strong>Data:</strong> {item.data.replace('T', ' ').replace('Z', '').replace('-','/').replace('-','/')} <br />
            <strong>Completo:</strong> {item.completed ? 'Sim' : 'Não'} <br />
            <br />
          </div>
        ))}
      </ul>
    </div>
  );
}
