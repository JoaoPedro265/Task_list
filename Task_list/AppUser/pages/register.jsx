import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//componente
import RegisterField from "./components/RegisterField";
//UI KIt
import { Container, Button } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

export function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [alert, setAlert] = useState(false); //verifica se deu algum erro na hora da escrita
  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post("http://127.0.0.1:8000/api/register/", {
        username: name,
        email: email,
        password: password,
      });
      console.log(response.data);
      setAlert(false);
      navigate("/", { state: { success: true } });
      return;
    } catch (error) {
      setAlert(true);
      console.error("Error:", error);
      return;
    }
  };

  return (
    <Container>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIosNewIcon />}
        className="buttonRegister"
        onClick={() => navigate("/home/")}
      >
        Back to Home
      </Button>
      <RegisterField
        {...{
          name,
          email,
          password,
          setName,
          setEmail,
          setpassword,
          alert,
          registerUser,
        }}
      />
    </Container>
  );
}
