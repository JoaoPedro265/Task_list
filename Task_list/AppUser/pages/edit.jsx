import { useState, useEffect } from "react";
import Cookies from 'js-cookie'

export function Edit() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true);
  // Função para obter um cookie pelo nome

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/')
        if (!response.ok) { throw new Error("Erro na requisição") }
        const data = await response.json()//converte pra json
        setData(data)//add to data
        console.log(data)
        console.log(Cookies.get('access_token'))
      } catch (error) {
        console.error("Erro:", error);
      }finally{
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  
  if (loading){
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h1>Dados da API</h1>
      <ul>
        {JSON.stringify(data)}
        {data.map((item) => (
          <li key={item.id}>{item.username}</li>
        ))}
      </ul>
    </div>

  )
}
export default Edit;