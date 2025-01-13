import { useNavigate } from "react-router-dom";
import axiosInstance from "../API/Api";
import { useState } from "react";
import './styles/styles.css'
//UI kit
import { Button, Container, Box, TextField ,Switch} from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export function CreateTask() {
    const [taskName, setTaskName] = useState('')
    const [text, setText] = useState('')
    const [completed, setCompleted] = useState(false)
    const navigate = useNavigate()


    async function addTask(e) {
        e.preventDefault()
        if (!taskName || !text) {
            alert('Enter the Fields')
            return
        }
        try {
            let response = await axiosInstance.post('tasks/', {
                taskName: taskName,
                text: text,
                completed: completed
            })
            console.log(response.data)
            return navigate('/home/')
        } catch (error) {
            console.error('Erro:', error);
            return navigate('/home/')
        }
    }
    return (
        < Container maxWidth="lg" sx={{ padding: 2 }} >
            <Button
                variant="outlined"
                href="/home/"
                startIcon={<ArrowBackIosNewIcon />}
                className="button">Back to Home</Button>
            <h1>CREATE TASK</h1>
            <Box className='viewTask-box'>
                <form onSubmit={addTask}>
                    <TextField
                        fullWidth
                        required
                        label='Task Name'
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        required
                        multiline
                        rows={10}
                        sx={{ marginTop: '10px' }}
                        label='Text'
                        value={text}
                        onChange={(e) => setText(e.target.value)} />
                    <div>
                    <span>Completed:</span><Switch
                        color="success"
                        checked={completed}
                        onChange={(e) => setCompleted(e.target.checked)}
                        ></Switch>
                    </div>
                    <Button
                        className="button"
                        variant="contained"
                        color="success"
                        type="submit">Add Task</Button>
                </form>
            </Box>
        </Container>
    )
}