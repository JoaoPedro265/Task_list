import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/Api";
import { useState } from "react";
//componentes
import CreateTaskField from "../components/CreateTaskField";

export function CreateTask() {
  const [taskName, setTaskName] = useState("");
  const [text, setText] = useState("");
  const [completed, setCompleted] = useState(false);
  const navigate = useNavigate();

  async function addTask(e) {
    e.preventDefault();
    if (!taskName || !text) {
      alert("Enter the Fields");
      return;
    }
    try {
      let response = await axiosInstance.post("tasks/", {
        taskName: taskName,
        text: text,
        completed: completed,
      });
      console.log(response.data);
      return navigate("/home/");
    } catch (error) {
      console.error("Erro:", error);
      return navigate("/home/");
    }
  }
  return (
    <CreateTaskField
      {...{
        addTask,
        taskName,
        setTaskName,
        text,
        setText,
        completed,
        setCompleted,
      }}
    ></CreateTaskField>
  );
}
