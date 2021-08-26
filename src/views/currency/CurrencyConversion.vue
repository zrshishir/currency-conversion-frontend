<template>
    <v-container v-if="isLoggedIn">
        <template>
          <v-row justify="center">
            <v-dialog v-model="error" persistent max-width="500">
              <v-card>
                <v-card-title class="headline deep-orange">Warning</v-card-title>
                <v-card-text>{{errorMsg}}</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="deep-orange" text @click="setErrorZero">Cancel</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            </v-row>
            </template>
            <v-alert
              v-if="!error"
              dense
              type="info"
            >
              {{errorMsg}}
            </v-alert>

        <template v-if="! indexData">
            <v-data-table item-key="name" class="elevation-1" loading loading-text="Loading... Please wait"></v-data-table>
        </template>
        <v-data-table
            :headers="headers"
            :items="indexData.transactions"
            sort-by="active"
            class="elevation-1"
        >
            <template v-slot:top>
            <v-toolbar flat color="blue dark-accent 4">
                <v-toolbar-title class="font-weight-bold">Balance Transfer</v-toolbar-title>
                <v-divider
                class="mx-4"
                inset
                vertical
                ></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                    >Transfer Balance</v-btn>
                </template>
                <v-card>
                    <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                    <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="6">
                            <v-select
                                v-model="defaultItem.receiver_id"
                                :items="indexData.users"
                                item-text="name"
                                item-value="id"
                                label="Select Receiver"
                            ></v-select>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                              <v-text-field v-model="defaultItem.amount" label="Amount"></v-text-field>
                          </v-col>
                        </v-row>
                    </v-container>
                    </v-card-text>

                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                    </v-card-actions>
                </v-card>
                </v-dialog>
            </v-toolbar>
            </template>
            <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
            </template>
        </v-data-table>
    </v-container>
    <v-container v-else>
        <template>
            <div>
                <v-alert
                v-model="alert"
                dismissible
                close-icon="mdi-delete"
                color="red"
                border="left"
                elevation="2"
                colored-border
                
                >
                You are <strong>not Logged In</strong>, please log in first!.
                </v-alert>

                <div class="text-center">
                <v-btn
                    v-if="!alert"
                    dark
                    @click="alert = true"
                >
                    Reset Alert
                </v-btn>
                </div>
            </div>
        </template>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

  export default {
    data: () => ({
      dialog: false,
      apiUrl: 'transactions',
      convertApiUrl: 'convert',
      alert:true,
      headers: [
        { text: 'My Currency', value: 'sender.currency' },
        { text: 'My Amount', value: 'amount' },
        { text: 'Rate', value: 'rate' },
        { text: 'Receiver Amount', value: 'converted_amount' },
        { text: 'Receiver Currency', value: 'receiver.currency' },
        { text: 'Receiver Name', align: 'start', value: 'receiver.name'},
        { text: 'Receiver Email', value: 'receiver.email' },
      ],
      items: [0 , 1],
      editedIndex: -1,
      defaultItem: {
        receiver_id: '',
        amount: '',
      },
    }),

    computed: {
        ...mapGetters(['isLoggedIn', 'indexData', 'error', 'statusCode', 'errorMsg', 'getUrl']),
      formTitle () {
        return this.editedIndex === -1 ? 'Balance Transfer' : 'Balance Transfer'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.$store.dispatch('setIndexData', [this.apiUrl])
      },

      setErrorZero () {
        this.$store.dispatch('setErrorZero')
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedIndex = -1
        })
      },

      save () {
        this.$store.dispatch('store', [this.convertApiUrl, this.defaultItem])
        this.close()
      },
    },
  }
</script>