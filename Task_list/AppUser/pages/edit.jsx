import { useState, useEffect } from "react";
import Cookies from 'js-cookie'
import axiosInstance from "../API/Api";

export function Edit() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true);
  // Função para obter um cookie pelo nome


  const fetchData = async () => {
    try {
      let response = await axiosInstance.get('')
      // const response = await fetch('http://127.0.0.1:8000/api/')
      // if (!response.ok) { throw new Error("Erro na requisição") }
      //let data = await response.json()//converte pra json
      console.log(response.data)
      setData(response.data)//add to data
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  function logout(){
    Cookies.remove('refresh_token', { path: '/' });
    Cookies.remove('access_token', { path: '/' })
    return
  }
function botton(){
  console.log('Access Token:', Cookies.get('access_token'));
  console.log('Refresh Token:', Cookies.get('refresh_token'));
  return
}
  return (
    <div>
      <a href="" onClick={logout}>Logout</a>
      <h1>Dados da API</h1>
      <ul>
        {JSON.stringify(data)}
        {data.map((item) => (
          <li key={item.id}>{item.username}</li>
        ))}
      </ul>
      <button onClick={botton}>cick</button>
    </div>

  )
}
export default Edit;