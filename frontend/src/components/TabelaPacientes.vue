<template>
  <v-simple-table dark>
    <template 
      v-slot:default
      v-if="dataReady"
    >
        <div class="table-consultas">
            <v-card-title>
                Listagem de consultas
                <v-spacer></v-spacer>
                <v-text-field
                    v-model="search"
                    label="Procure a consulta aqui"
                    single-line
                    hide-details
                ></v-text-field>
            </v-card-title>
            <v-data-table 
                :search="search"
                :items="items"
                :headers="headers"
                class="elevation-1"
                :sort-by="['title']"
            >
              <template v-slot:items="props">
                <td class="text-xs-center">{{ props.item.idMedico }}</td>
                <td class="text-xs-center">{{ props.item.medico.nome }}</td>
                <td class="text-xs-center">{{ props.item.paciente  }}</td>
            </template>
            </v-data-table>
        </div>
    </template>
  </v-simple-table>
</template>

<script>
import ListaConsulta from '../services/pacientes'
export default {
  data () {
    return {
      expanded: [],
      items: [],
      search: '',
      dataReady: false,
      headers: [
        { text: 'Id', value: 'id' },
        { text: 'Médico', value: 'medico.nome' },
        { text: 'Paciente', value: 'paciente' },
        { text: 'Data da consulta', value: 'dataConsulta', },
      ],
      
    }
  },

  async mounted() {
    await ListaConsulta.listar().then( response => {
      console.log(response.data);
      this.items = response.data
      this.dataReady = true;
    })
  }
}
</script>
<style>
.table-consultas{
  margin: 32px 32px;
}
</style>