//renovar REFRESH
import Cookies from "js-cookie";

export async function RenoveAccessAccToken() {

    let refreshCookie= Cookies.get('refresh_token')
    if (!refreshCookie){
        console.error('Refresh token não encontrado')
        return null
    }
    try{
        //Tentar renovar Refras
        const response= await fetch('http://127.0.0.1:8000/api/token/refresh/',{
            method:'POST',
            headers:{
                "Content-Type": "application/json", // Tipo de conteúdo enviado
                'Accept': 'application/json',
            },
            body:JSON.stringify({refresh:refreshCookie})
        })
        //se nao se conseguiu renovar...
        if (!response.ok){
            console.error(`Erro na requisição: ${response.statusText}`);
            return null
        }
        //conseguiu renovar
        const result =await response.json()//converte pra json
        // Salvando o novo access token nos cookies
        Cookies.set('access_token',result.access,{ expires: 1 / 1440, secure: true })
        console.log("Novo access token:", result.access);
        return result.access
    }catch(error){
        console.error('Erro ao renovar o token:', error)
        return null
    }
    
}

