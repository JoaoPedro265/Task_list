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
    } catch(error){
      console.error('Erro:', error);
      return navigate('/home/')
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

async function deleteTask(){
  try{
    let response = await axiosInstance.delete(`task/view/${id}`)
    console.log(response.data)
    navigate('/home/')
  }catch(error){
    console.error("Erro:", error)
    return navigate('/home/')
  }
}


function editTask(){
navigate(`/edit/task/${data.id}`)
}
  return (
    <div>
      <a href="/home/">Back to Home</a>
      <ul>
        <h1>Dados da API</h1>
        <div>
          <strong>Task Name:</strong>{data.taskName}<br />
          <strong>Text:</strong>{data.text}<br />
          <strong>Data:</strong>{data.data.replace('T', ' ').replace('Z', '').replace('-', '/').replace('-', '/')}<br />
          <strong>Completed:</strong>{data.completed ? 'Yes' : 'No'}<br />
        </div>
        <button onClick={editTask}>Edit</button>
        <button onClick={deleteTask}>Delete</button>
      </ul>

    </div>
  )
}
export default ViewTask;