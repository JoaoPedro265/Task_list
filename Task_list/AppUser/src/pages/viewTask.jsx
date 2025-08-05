import { useState, useEffect } from "react";
import axiosInstance from "../API/Api";
import { useNavigate, useParams } from "react-router-dom";
//Components
import ViewTaskField from "../components/ViewTaskField";

export function ViewTask() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); //id da tabela
  const navigate = useNavigate();
  // Função para obter um cookie pelo nome

  const fetchData = async () => {
    try {
      let response = await axiosInstance.get(`task/view/${id}`);
      setData(response.data); //add to data
    } catch (error) {
      console.error("Erro:", error);
      return navigate("/home/");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  if (loading) {
    return <div>loading...</div>;
  }

  async function deleteTask() {
    try {
      let response = await axiosInstance.delete(`task/view/${id}`);
      console.log(response.data);
      navigate("/home/");
    } catch (error) {
      console.error("Erro:", error);
      return navigate("/home/");
    }
  }
  function editTask() {
    navigate(`/edit/task/${data.id}`);
  }

  return (
    <ViewTaskField
      {...{
        data,
        deleteTask,
        editTask,
      }}
    ></ViewTaskField>
  );
}
