import { useNavigate } from "react-router-dom";
import axiosInstance from "../API/Api";
import { useState } from "react";

export function CreateTask() {
    const [taskName, setTaskName] = useState('')
    const [text, setText] = useState('')
    const [completed, setCompleted] = useState(false)
    const navigate=useNavigate()


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
                completed:completed
            })
            console.log(response.data)
            return navigate('/home/')
        } catch (error) {
            console.error('Erro:', error);
            return navigate('/home/')
        }
    }
    return (
        <div>
            <a href="/home/">Back to Home</a>
            <h1>Create Task</h1>
            <form onSubmit={addTask}>
                <div>
                    <label htmlFor="task-text">Task Name:</label><br />
                    <input
                        required
                        type="text"
                        id="taskName"
                        name="taskName"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="text">Text:</label><br />
                    <textarea
                        required
                        id="text"
                        name="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    ></textarea>

                </div>
                <div>
                    <label htmlFor="task-completed">Completed:</label>
                    <input
                        type="checkbox"
                        id="task-completed"
                        name="task-completed"
                        checked={completed}
                        onChange={(e) => setCompleted(e.target.checked)} />
                </div>
            <button type="submit">Create Task</button>
            </form>
        </div>
    )
}