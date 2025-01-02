import { useState, useEffect } from 'react';
import axiosInstance from '../API/Api';

export function Home() {
  const [data, setData] = useState([]); // Estado para armazenar os dados da API
  const [loading, setLoading] = useState(true);

    const fetchData = async () => {
      try{
        let response=await axiosInstance.get('tasks/')
        console.log(response.data);
        setData(response.data)
      }catch(error){
        console.error("Erro:", error);
      }finally{
        setLoading(false)
      }
       } 
    useEffect(() => {
    fetchData(); // Chama a função para buscar os dados ao carregar o componente
  }, []);// O array vazio garante que o useEffect será executado apenas uma vez
if (loading){
  return <div>Carregando...</div>;
}
  return (
    <div>
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