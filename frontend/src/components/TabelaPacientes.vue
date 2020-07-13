<template>
  <v-simple-table>
    <template 
      v-slot:default
      v-if="dataReady"
    >
        <div class="table-consultas">
            <v-card-title class="title-table">
                Consultas agendadas
                <v-spacer></v-spacer>
                <v-text-field
                    v-model="search"
                    placeholder="Buscar Consulta por número, paciente, data ou hora..."
                    single-line
                    hide-details

                ></v-text-field>
                <v-dialog v-model="dialog" class="dialog" max-width="500px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="primary"
                      dark
                      class="ml-8 btn-nova-consulta"
                      v-bind="attrs"
                      v-on="on"
                    >Novo agendamento</v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline">Agendar nova consulta</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="12" class="text-field">
                            <v-text-field v-model="consulta.observacao" :rules="requiredRules" filled placeholder="Observacao"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-text-field v-model="consulta.paciente" :rules="requiredRules" filled placeholder="Nome do paciente"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-text-field v-mask="dataConsultaMask" :rules="requiredRules" v-model="consulta.dataConsulta" filled label="Data e hora" placeholder="xx/xx/xxxx xx:xx"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="1">
                            <v-text-field v-show="hidden" v-model="consulta.idMedico" filled placeholder="Id do Médico"></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions class="dialog-actions">
                      <v-spacer></v-spacer>
                      <div class="mt-8 my-2 mr-2">
                        <v-btn color="error"  @click="dialog = false">Cancelar</v-btn>
                      </div>

                      <div class="mt-8 my-2 ml-2">
                        <v-btn color="success" :disabled="isDisabled" @click="salvar()">Salvar</v-btn>
                      </div>
                    </v-card-actions>
                  </v-card>
                </v-dialog>

                <v-dialog
                  v-model="dialogConfirmacao"
                  max-width="365px"
                >
                  <v-card>
                    <v-card-title>
                      <span class="text-center">Consulta cadastrada com sucesso</span>
                      <v-spacer></v-spacer>
                    </v-card-title>
                    <v-card-actions>
                      <v-btn
                        color="primary"
                        rounded
                        class="dialog-confirmacao-btn"
                        @click="dialogConfirmacao = false"
                      >
                        Ok
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>

            </v-card-title>
            <v-data-table 
                :search="search"
                :items="items"
                :headers="headers"
                class="elevation-1"
                :sort-by="['title']"
            >
              <template v-slot:items="props">
                <td class="text-xs-center" >{{ props.item.id }}</td>
                <td class="text-xs-center" >{{ props.item.medico.nome }}</td>
                <td class="text-xs-center" >{{ props.item.paciente  }}</td>
                <td class="text-xs-center" >{{ props.item.dataConsulta }}</td>
            </template>
            <template v-slot:item.controls="props">
              <v-btn class="mx-2" text small color="primary" @click="detalhar(props.item.id)">
                <v-icon dark>mdi-information-variant</v-icon>
              </v-btn>
            </template>
            </v-data-table>

            <v-row justify="center">
              <v-dialog v-model="dialogDetalhes" width="400px">
                <v-card>
                  <v-card-title>
                    <span class="headline">Detalhes da consulta</span>
                  </v-card-title>
                  
                  <v-card-text class="dialog-detalhes">
                    <p class="text-xs-center">Número: {{ detalheConsulta.id }}</p>
                    <p class="text-xs-center">Nome do Paciente: {{ detalheConsulta.paciente }}</p>
                    <p class="text-xs-center">Nome do Médico: {{ detalheMedico.nome }}</p>
                    <p class="text-xs-center">Observação: {{ detalheConsulta.observacao  }}</p>
                    <p class="text-xs-center">Date e hora: {{ detalheConsulta.dataConsulta }}</p>
                  </v-card-text>
                  
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="dialogDetalhes = false">Ok</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-row>
        </div>
    </template>
  </v-simple-table>
</template>

<script>
import Consulta from '../services/pacientes';
import { mask } from 'vue-the-mask';
export default {
  directives: {
    mask,
  },
  data () {
    return {
      items: [],
      detalhes: [],
      search: '',
      detalheConsulta: '',
      detalheMedico: '',
      dialog: false,
      valid: true,
      hidden: false,
      dataReady: false,
      dialogConfirmacao: false,
      dialogDetalhes: false,
      dataConsultaMask: "##/##/#### ##:##",
      requiredRules: [v => !!v || 'O campo deve ser preenchido'],
      headers: [
        { text: 'Número', value: 'id' },
        { text: 'Nome do médico', value: 'medico.nome' },
        { text: 'Nome do paciente', value: 'paciente' },
        { text: 'Data e hora', value: 'dataConsulta', },
        { text: "", value: "controls", sortable: false }
      ],
      consulta: {
        idMedico: 0,
        paciente: '',
        observacao: '',
        dataConsulta: '',
      },
    }
  },

  async mounted() {
    await Consulta.listar().then( response => {
      this.items = response.data
      this.dataReady = true;
    })

  },

  methods: {
    salvar() {
      Consulta.salvar(this.consulta).then( response => {
        this.items = [
          response.data,
          ...this.items
        ]
      })
      this.dialog = false;
      this.dialogConfirmacao = true;
    },

    detalhar(idConsulta){
      Consulta.detalhar(idConsulta).then( response => {
        this.detalheConsulta = response.data;
        this.detalheMedico = response.data.medico;
        this.dialogDetalhes = true;
      })
    },

    isDisabled(){
      if(this.requiredRules == ''){
        this.valid = false
      }
    }
  }
}
</script>
<style>
.title-table{
  padding-left: 0 !important;
}
.btn-nova-consulta{
  height: 40px;
}
.table-consultas{
  margin: 32px 32px 0px 32px;
}
.text-field{
  margin-top: -32px
}
.v-dialog{
  overflow: hidden !important;
}
.dialog-actions{
  padding: 8px 24px !important;
}
.dialog-detalhes{
  margin: 8px 16px
}
.dialog-confirmacao-btn{
  display: flex;
  margin: 0 auto;
}
</style>