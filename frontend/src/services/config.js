import axios from 'axios'

export const http = axios.create ({
    baseURL: 'http://desafio.conexasaude.com.br/api/'
})