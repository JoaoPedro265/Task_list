import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosInstance from '../API/Api';

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
    if(!taskName || !text){
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
    <div>
      <button onClick={back}>Back</button>
      <h1>Edit Task</h1>
      <form onSubmit={editTask}>
        <div>
          <label htmlFor="Task_Name">Task Name:</label><br />
          <input
            required
            id='Task_Name'
            type="text"
            placeholder='taskName'
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)} /><br />
        </div>

        <div>
          <label htmlFor="Text">Text:</label><br />
          <textarea
            required
            id="Text"
            value={text}
            onChange={(e) => setText(e.target.value)}></textarea><br />
        </div>

        <div>
          <label htmlFor="Completed">Completed:</label>
          <input
            id='Completed'
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)} /><br />
        </div>
      <button>Click</button>
      </form>
    </div>
  )
}

//console.log(Object.prototype.toString.call(obj));