import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import TabelaPacientes from './components/TabelaPacientes'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Login
          },

          {
            path: '/listagem-pacientes',
            name: 'listagem-pacientes',
            component: TabelaPacientes
          },
    ]
})