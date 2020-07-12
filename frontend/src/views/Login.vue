<template>
  <v-app id="inspire">
    <v-main class="bg-login-form">
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card
                class="mx-auto elevation-12 card-login"
                max-width="700"
                >
                <div class="form-logo">
                    <img src="../assets/img/logo-conexa.svg" alt="Logo Conexa Saúde">
                </div>
                <v-divider></v-divider>

                <v-spacer></v-spacer>

                <v-card-text>
                    <v-form
                        ref="form"
                        class="form-login"
                        v-model="valid"
                    >
                    <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        label="E-mail"
                        prepend-inner-icon="mdi-email"
                        required
                        outlined
                    ></v-text-field>

                    <v-text-field
                        v-model="password"
                        :rules="passwordRules"
                        name="password"
                        prepend-inner-icon="mdi-lock"
                        type="password"
                        autocomplete="disabled"
                        spellcheck="false"
                        autocapitalize="false"
                        label="Senha"
                        outlined
                        required
                    ></v-text-field>
                    </v-form>
                    
                </v-card-text>

                <v-card-actions>
                    <v-row align="center" class="btn-login">
                        <v-btn
                            :disabled="!valid"
                            @click="auth"
                            rounded
                            large
                            color="primary"
                        >
                            Entrar
                        </v-btn>
                    </v-row>
                </v-card-actions>

            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AcessoMedico from "../services/login-medico";
import Vue from 'vue';

export default {
    name: 'login',

    data: () => ({
        valid: true,
        email: '',
        emailRules: [
            v => !!v || 'Por favor, insira o Email.',
            v => /.+@.+\..+/.test(v) || 'O Email deve ser válido'
        ],
        password: '',
        passwordRules: [
            v => !!v || 'Por favor, insira a senha.'
        ],
        
    }),

    methods: {
      auth () {
        if (this.$refs.form.validate()){
          const login = {
            email : this.email,
            senha : this.password
          }
          AcessoMedico.acesso(login).then(response => {
              var token = response.data.data.token;
              localStorage.setItem('token', token);
              this.$router.push({ path: '/listagem-pacientes' });
          }).catch(error => {
              console.log(error);
              Vue.toasted.error('Falha ao tentar efetuar o login', { theme: 'bubble' });
              this.$router.push({ path: "/" })
          })
        }
      },
    }
  }
</script>

<style>
/*Fundo da tela*/
.bg-login-form{
  background: radial-gradient(ellipse at center,  #E3F2FD 1%,#BBDEFB 100%);
  height:calc(100vh);
  width:100%;
}
/* Card formulario */
.card-login{
  border-radius: 10px !important;
}
  .form-login{
      margin: 8px 32px
  }
  .v-card__text {
    height: 200px;
    margin-top: 8px;
    padding: 16px !important;
}
  .form-logo{
    display: flex;
    justify-content: center;
    padding: 14px;
    background-color: #17355D;
  }

  .btn-login{
    margin: 32px 32px !important;
  }

  .btn-login .v-btn{
    margin-top: 16px;
    width: 100%;
  }

  .v-card__actions{
    padding: 12px;
  }
  /*formulario inputs*/
  .v-input input {
      padding-left: 8px !important;
      color: #172B4D !important;
  }

  .v-application--is-ltr .v-text-field .v-input__prepend-inner {
    margin-right: auto;
  }
  /*alerts de erro*/
   .v-text-field.v-text-field--enclosed .v-text-field__details {
      padding: 8px 0px !important;
      margin-bottom: 16px;
  }
</style>