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
                        v-model="valid"
                        class="form-login"
                    >
                    <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        placeholder="Insira seu e-mail"
                        prepend-inner-icon="mdi-account"
                        required
                        solo
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
                        placeholder="Insira sua senha"
                        solo
                        required
                    ></v-text-field>
                    </v-form>
                    <v-alert
                          v-model="err"
                          v-if="this.err"
                          type="error"
                          transition="scale-transition"
                          outlined
                          class="mt-3"
                      >
                          e-mail ou senha errada
                      </v-alert>
                </v-card-text>

                <v-card-actions>
                    <v-row align="center">
                        <v-col cols="12" sm="12">
                            <div class="text-center">
                                <v-btn
                                    :disabled="!valid"
                                    rounded
                                    large
                                    color="primary"
                                    @click="validate"
                                >
                                    Login
                                </v-btn>
                            </div>
                        </v-col>
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
export default {
    name: 'login',

    data: () => ({
        valid: true,
        err: false,
        email: '',
        emailRules: [
            v => !! v || 'Por favor, insira o e-mail',
            v => /.+@.+\..+/.test(v) || 'O E-mail deve ser válido'
        ],
        password: '',
        passwordRules: [
            v => !! v || 'Por favor, insira a senha'
        ]
    }),

    methods: {
      validate () {
        this.$refs.form.validate()
      },
    },

    watch: {
        password () {
            this.err = false;
        },
  },

}
</script>

<style>
.bg-login-form{
  background: radial-gradient(ellipse at center,  #E3F2FD 1%,#BBDEFB 100%);
  height:calc(100vh);
  width:100%;
}
.card-login{
  border-radius: 10px !important;
}
  .form-login{
      padding: 4px 18px;
  }
  .v-card__text {
    height: 190px;
}
  .form-logo{
    display: flex;
    justify-content: center;
    padding: 14px;
    background-color: #17355D;
  }
  .v-input input {
      padding-left: 8px !important;
      color: #172B4D !important;
  }

  .v-text-field.v-text-field--solo .v-input__control {
    padding: 8px 0 !important;
}
</style>