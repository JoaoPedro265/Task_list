import { useState, useEffect } from "react";
import axiosInstance from "../API/Api";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./home.css";
//Material UI KIT
import { Container, CircularProgress } from "@mui/material";
//components
import HomeForm from "./components/HomeForm";
import ButtonField from "./components/ButtonField";

export function Home() {
  const [data, setData] = useState([]); // Estado para armazenar os dados da API
  const [loading, setLoading] = useState(null);
  const [nothing, setNothing] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setLoading(true);
      let response = await axiosInstance.get("tasks/");
      console.log(response.data.length);
      if (response.data.length === 0) {
        setNothing(true);
      }
      setData(response.data);
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Chama a função para buscar os dados ao carregar o componente
  }, []); // O array vazio garante que o useEffect será executado apenas uma vez

  async function deleteTable(e, taskID) {
    e.stopPropagation();
    try {
      await axiosInstance.delete(`task/view/${taskID}`);
      //atualizar o que foi deletado
      const updatedData = data.filter((item) => item.id !== taskID); //Em outras palavras, ele remove o item com o id igual ao taskID.
      if (updatedData.length === 0) {
        setNothing(true);
      }
      setData(updatedData);
    } catch (error) {
      console.error("Erro:", error);
    }
  }

  function viewTask(taskID) {
    console.log(`Você clicou no item com id: ${taskID}`);
    navigate(`/edit/task/${taskID}`);
    return;
  }

  function logout() {
    Cookies.remove("refresh_token", { path: "/" });
    Cookies.remove("access_token", { path: "/" });
    navigate("/");
    return;
  }

  return (
    <Container maxWidth="lg" sx={{ padding: 2 }}>
      <ButtonField onClick={logout} type={"button"}>
        Logout
      </ButtonField>
      <div sx={{ alignItems: "center" }}>
        <h1>HOME</h1>
        {nothing ? <h2>No table created. Create a new task.</h2> : ""}
        {loading ? (
          <div className="loading-Box">
            <CircularProgress />
          </div>
        ) : (
          data.map((item) => (
            <HomeForm
              {...{
                item,
                deleteTable,
                viewTask,
              }}
            ></HomeForm>
          ))
        )}
        <ButtonField
          onClick={() => navigate("/add/task/")}
          color={"success"}
          type={"button"}
        >
          Create Task
        </ButtonField>
      </div>
    </Container>
  );
}
