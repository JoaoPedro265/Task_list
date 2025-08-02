import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//componente
import RegisterField from "../components/RegisterField";
//UI KIt
import { Container, Button } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
const apiUrl = import.meta.env.VITE_URL_API; //importando variaveis de ambiente

export function Register() {
  const [loading, setLoading] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [alert, setAlert] = useState(false); //verifica se deu algum erro na hora da escrita
  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let response = await axios.post(`${apiUrl}/api/register/`, {
        username: name,
        email: email,
        password: password,
      });
      console.log(response.data);
      setLoading(false);
      setAlert(false);
      navigate("/", { state: { success: true } });
      return;
    } catch (error) {
      setLoading(false);
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
          loading,
        }}
      />
    </Container>
  );
}
