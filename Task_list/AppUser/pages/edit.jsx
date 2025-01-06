import { useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosInstance from '../API/Api';

export function Edit() {
  const [loading, setLoading] = useState(null)
  const { taskID } = useParams()
  const[userID,setUserID]=useState(null)
  const [data, setData] = useState('')
  const [descrition, setDescrition] = useState('')
  const [text, setText] = useState('')
  const [completed, setCompleted] = useState(false)

  const fetchDataTask = async () => {
    try {
      let response = await axiosInstance.get(`task/view/${taskID}`)
      const result = response.data
      setData(result)
      setDescrition(result.descrition)
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

  function editTask() {
    try {
      let response = axiosInstance.put(`task/view/${taskID}`, {
        descrition: descrition,
        text: text,
        completed: completed,
        user:userID,
      })
      console.log(response.data)
    } catch (error) {
      console.error("Erro:", error)
    }
  }

  if (loading) {
    return <div>Carregando...</div>;
  }
  return (
    <div>
      <h1>Editando Dados</h1>
      <ul>
        <input
          type="text"
          placeholder='descrition'
          value={descrition}
          onChange={(e) => setDescrition(e.target.value)} /><br />

        <textarea
          name="Text:"
          value={text}
          onChange={(e) => setText(e.target.value)}>hello hello</textarea><br />

        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)} /><br />
        <button onClick={editTask}>Click</button>
      </ul>
    </div>
  )
}

//console.log(Object.prototype.toString.call(obj));