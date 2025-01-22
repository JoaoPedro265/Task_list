import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../API/Api";

//UI KIT
import { Button, Container } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import EditForm from "./components/EditForm";

export function Edit() {
  const [loading, setLoading] = useState(true);
  const { taskID } = useParams();
  const [userID, setUserID] = useState(null);

  const [taskName, setTaskName] = useState("");
  const [text, setText] = useState("");
  const [completed, setCompleted] = useState(false);
  const navigate = useNavigate();

  const fetchDataTask = async () => {
    try {
      let response = await axiosInstance.get(`task/view/${taskID}`);
      const result = response.data;
      setTaskName(result.taskName);
      setText(result.text);
      setCompleted(result.completed);
      setUserID(result.user);
      return;
    } catch (error) {
      console.error("Erro:", error);
      navigate(`/error404`);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDataTask();
  }, []);

  async function editTask(e) {
    e.preventDefault();
    console.log("editando.......");
    if (!taskName || !text) {
      alert("Enter the Fields");
      return;
    }
    try {
      let response = await axiosInstance.put(`task/view/${taskID}`, {
        taskName: taskName,
        text: text,
        completed: completed,
        user: userID,
      });
      console.log(response.data);
      return navigate("/home/");
    } catch (error) {
      console.error("Erro receba:", error);
      return navigate("/home/");
    }
  }

  async function deleteTask() {
    try {
      let response = await axiosInstance.delete(`task/view/${taskID}`);
      console.log(response.data);
      return navigate("/home/");
    } catch (error) {
      console.error("Erro:", error);
      return navigate("/home/");
    }
  }

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <Container maxWidth="lg" sx={{ padding: 2 }}>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIosNewIcon />}
        onClick={() => navigate("/home/")}
        sx={{ marginTop: 2 }}
      >
        Back to home
      </Button>
      <EditForm
        {...{
          setCompleted,
          setTaskName,
          setText,
          editTask,
          taskName,
          text,
          completed,
          deleteTask,
        }}
      />
    </Container>
  );
}

//console.log(Object.prototype.toString.call(obj));
