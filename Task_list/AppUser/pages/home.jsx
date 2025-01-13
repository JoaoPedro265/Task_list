import { useState, useEffect } from 'react';
import axiosInstance from '../API/Api';
import { matchPath, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import './styles/styles.css'
//Material UI KIT
import { Button, Box, Container } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export function Home() {
  const [data, setData] = useState([]); // Estado para armazenar os dados da API
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  const fetchData = async () => {
    try {
      let response = await axiosInstance.get('tasks/')
      setData(response.data)
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchData(); // Chama a função para buscar os dados ao carregar o componente
  }, []);// O array vazio garante que o useEffect será executado apenas uma vez
  if (loading) {
    return <div>Carregando...</div>;
  }


  function viewTask(taskID) {
    console.log(`Você clicou no item com id: ${taskID}`);
    navigate(`/view/task/${taskID}`)
    return
    // Aqui você pode redirecionar, mostrar mais informações, etc.
  };


  function logout() {
    Cookies.remove('refresh_token', { path: '/' });
    Cookies.remove('access_token', { path: '/' })
    navigate('/')
    return
  }
  function createTask() {
    navigate('/add/task/')
    return
  }


  return (
    < Container maxWidth="lg" sx={{ padding: 2 }}>
      <Button variant="contained" onClick={logout} className='button'>Logout</Button>
      <div sx={{ alignItems: 'center', }}>
        <h1>HOME</h1>
        {data.map((item) => (
          <Box
            className='Tasks-box'
            key={item.id}
            onClick={() => viewTask(item.id)}
          >

            <strong>Task Name:</strong> {item.taskName} <br />
            <strong>Date:</strong> {item.data.replace('T', ' ').replace('Z', '').replace('-', '/').replace('-', '/')} <br />
            <strong>Completed:</strong> {item.completed ? 'Yes' : 'No'} <br />
          </Box>
        ))}
        <Button 
        variant="contained" 
        color="success" 
        onClick={createTask}
        className='button'>Create Task</Button>
      </div>
    </Container>

  );
}
