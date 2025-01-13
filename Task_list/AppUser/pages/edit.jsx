import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosInstance from '../API/Api';
import './styles/styles.css'
//UI KIT
import { TextField, Button, Container, Box,Switch} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';


export function Edit() {
  const [loading, setLoading] = useState(null)
  const { taskID } = useParams()
  const [userID, setUserID] = useState(null)
  const [taskName, setTaskName] = useState('')
  const [text, setText] = useState('')
  const [completed, setCompleted] = useState(false)
  const navigate = useNavigate()

  const fetchDataTask = async () => {
    try {
      let response = await axiosInstance.get(`task/view/${taskID}`)
      const result = response.data
      setTaskName(result.taskName)
      setText(result.text)
      setCompleted(result.completed)
      setUserID(result.user)
    } catch (error) {
      console.error("Erro:", error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchDataTask();

  }, []);

  async function editTask(e) {
    e.preventDefault()
    console.log('editando.......')
    if (!taskName || !text) {
      alert('Enter the Fields')
      return
    }
    try {
      let response = await axiosInstance.put(`task/view/${taskID}`, {
        taskName: taskName,
        text: text,
        completed: completed,
        user: userID,
      })
      console.log(response.data)
      navigate(`/view/task/${taskID}`)
    } catch (error) {
      console.error("Erro:", error)
    }

  }
  function back() {
    navigate(`/view/task/${taskID}`)
  }
  if (loading) {
    return <div>Carregando...</div>;
  }
  return (
    < Container maxWidth="lg" sx={{ padding: 2 }} >
      <Button
        className='button'
        variant="outlined"
        startIcon={<ArrowBackIosNewIcon />}
        onClick={back}
        sx={{ marginTop: 2 }}
      >Back</Button>
        <h1>EDIT TASK</h1>
      <Box className='viewTask-box'>
        <form onSubmit={editTask}>
            <TextField
              fullWidth
              required
              id="outlined-basic"
              label="Task Name"
              variant="outlined"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
          <div>
            <TextField
            fullWidth
            required
            multiline
            label='Text'
            rows={10}
            value={text}
            onChange={(e) => setText(e.target.value)}
            ></TextField>
          </div>

          <div>
            <span>Completed:</span><Switch
            color="success"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            ></Switch>
          </div>
          <Button className='button' variant="contained" sx={{ backgroundColor: 'orange' }} type="submit">Edit</Button>
        </form>
      </Box>
    </Container>

  )
}

//console.log(Object.prototype.toString.call(obj));