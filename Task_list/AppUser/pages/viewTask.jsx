import { useState, useEffect } from "react";
import axiosInstance from "../API/Api";
import { useNavigate, useParams } from "react-router-dom";

export function ViewTask() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true);
  const { id } = useParams()//id da tabela
  const navigate=useNavigate()
  // Função para obter um cookie pelo nome


  const fetchData = async () => {
    try {
      let response = await axiosInstance.get(`task/view/${id}`)
      setData(response.data)//add to data
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  if (loading) {
    return <div>Carregando...</div>;
  }

function edit(){
navigate(`/edit/task/${data.id}`)
}
  return (
    <div>
      <a href="/home/">Back to Home</a>
      <ul>
        <h1>Dados da API</h1>
        <div>
          <strong>descrition:</strong>{data.descrition}<br />
          <strong>Text:</strong>{data.text}<br />
          <strong>data:</strong>{data.data.replace('T', ' ').replace('Z', '').replace('-', '/').replace('-', '/')}<br />
          <strong>completed:</strong>{data.completed ? 'Yes' : 'No'}<br />
          <strong>IDuser:</strong>{data.user}
        </div>
        <button onClick={edit}>cick</button>
      </ul>

    </div>
  )
}
export default ViewTask;