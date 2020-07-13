<template>
  <v-app>
    <v-main style="overflow: hidden auto; height: 0px;" class="white">
      <v-toolbar
        class="logo"
      >
        <v-toolbar-title>
          <img src="./assets/img/logo-conexa.svg" alt="Logo Conexa Saúde">
        </v-toolbar-title>
      </v-toolbar>

      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      //
    }
  }
}
</script>

<style>
.logo{
  background-color: #17355D !important;
}
.v-application .display-1 {
  font-family: "Metropolis" !important;
}

.v-application .display-2 {
  font-family: "Metropolis" !important;
}

.v-application .display-3 {
  font-family: "Metropolis" !important;
}

.v-application .display-4 {
  font-family: "Metropolis" !important;
}

.v-messages__message {
    font-family: sans-serif !important;
}
</style>