// import { http } from './config'
import axios from 'axios'

export default {
    listar: () => {
        const auth = {
            headers: {Authorization:'Bearer ' + localStorage.getItem('token')} 
        }
        let consultaApi = axios
        .get('http://desafio.conexasaude.com.br/api/consultas',auth)
        .then(result => { 
            return result.data
        })
        return consultaApi
    //   var token = localStorage.getItem('token')
    //   return http.get('consultas/' + token)
        
    }
}