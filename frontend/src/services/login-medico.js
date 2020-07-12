import { http } from './config'

export default {
    acesso: (login) => {
        return http.post('login', login)
    }
}