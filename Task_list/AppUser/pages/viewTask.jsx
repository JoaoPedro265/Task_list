import { useState, useEffect } from "react";
import axiosInstance from "../API/Api";
import { useNavigate, useParams } from "react-router-dom";
//UI KIT
import { Button, Box, Container, Card, Switch } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CheckIcon from "@mui/icons-material/Check";
import { Divider } from "@mui/material";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";

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
    return <div>Carregando...</div>;
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
    <Container maxWidth="lg" sx={{ padding: 2 }}>
      <Button
        variant="outlined"
        onClick={() => navigate("/home/")}
        startIcon={<ArrowBackIosNewIcon />}
      >
        Back to Home
      </Button>

      <h1>TASK</h1>
      <Box className="viewTask-box">
        <span>Task Name:</span>
        <Card variant="outlined" className="taskName-card">
          {data.taskName}
        </Card>
        <span>Text:</span>
        <Card variant="outlined" className="text-card">
          {data.text}
        </Card>
        <span>Date:</span>
        {data.data
          .replace("T", " ")
          .replace("Z", "")
          .replace("-", "/")
          .replace("-", "/")}
        <br />

        <div>
          <span>Completed:</span>
          <Switch disabled color="success" checked={data.completed}></Switch>
        </div>
        <Button
          variant="contained"
          className="button"
          sx={{ backgroundColor: "orange" }}
          onClick={editTask}
        >
          Edit Task
        </Button>
        <Button variant="contained" color="error" onClick={deleteTask}>
          Delete Task
        </Button>
      </Box>
    </Container>
  );
}
export default ViewTask;
