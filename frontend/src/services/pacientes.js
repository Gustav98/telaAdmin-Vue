
import { http } from './config'

export default {
    listar: () => {
        const auth = {
            headers: {Authorization:'Bearer ' + localStorage.getItem('token')} 
        }
        let consultaApi = http
        .get('consultas',auth)
        .then(result => { 
            return result.data
        })
        
        return consultaApi
    },

    salvar: (consulta) => {
        const auth = {
            headers: {Authorization:'Bearer ' + localStorage.getItem('token')}
        }
        let consultaApi = http
        .post('consulta', consulta, auth)
        .then(result => { 
            return result.data
        })
        return consultaApi
    },

    detalhar: (idConsulta) => {
        const auth = {
            headers: {Authorization:'Bearer ' + localStorage.getItem('token')} 
        }
        let consultaApi = http
        .get('consulta/' + idConsulta, auth)
        .then(result => { 
            return result.data
        })
        return consultaApi
        
    }
}