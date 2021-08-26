<template>
  <v-container>
    <v-layout v-if="error" row wrap justify-center>
        <v-alert
          :value="error"
          type="success"
        >
        {{errorMsg}}
        </v-alert>
    </v-layout>

    <v-parallax
    dark
    src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
  >
    <v-row
      align="center"
      justify="center"
    >
      <v-col class="text-center" cols="12">
        <h1 class="display-1 font-weight-medium mb-4">P2P Wallet (Pay) System</h1>
        <h4 class="subheading">A Simple app that convert currencies from USD to EUR and vice-versa.</h4>
      </v-col>
    </v-row>
    <v-row v-if="indexData.most_conversion">
        <v-col class="text-center" cols="12">
          <template>
            <h3>Most Conversion User</h3>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                <tr class="text-left">
                  <th>Name</th>
                  <th>Email</th>
                  <th>Balance</th>
                  <th>Currency</th>
                  <th>Total Conversion</th>
                </tr>
                </thead>
                <tbody>
                <tr class="text-left">
                  <td>{{ indexData.most_conversion.user.name }}</td>
                  <td>{{ indexData.most_conversion.user.email }}</td>
                  <td>{{ indexData.most_conversion.balance }}</td>
                  <td>{{ indexData.most_conversion.user.currency }}</td>
                  <td>{{ indexData.most_conversion.total_conversion }}</td>
                </tr>
                </tbody>
              </template>
            </v-simple-table>
          </template>
        </v-col>
    </v-row>
      <v-row v-if="indexData.total_conv_for_particular_receiver">
        <v-col class="text-center" cols="12">
          <template>
            <h3>Total Conversion For a Particular Receiver</h3>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                <tr class="text-left">
                  <th>Receiver Name</th>
                  <th>Receiver Email</th>
                  <th>Total Transactions</th>
                  <th>Total Amount Received</th>
                  <th>Receiver Currency</th>
                  <th>Sender Name</th>
                  <th>Sender Email</th>
                  <th>Sender Currency</th>
                </tr>
                </thead>
                <tbody>
                <tr class="text-left">
                  <td>{{ indexData.total_conv_for_particular_receiver.receiver.name }}</td>
                  <td @click="viewItem(indexData.total_conv_for_particular_receiver.receiver.id)"><a>{{ indexData.total_conv_for_particular_receiver.receiver.email }}</a></td>
                  <td>{{ indexData.total_conv_for_particular_receiver.total_transactions }}</td>
                  <td>{{ indexData.total_conv_for_particular_receiver.amount }}</td>
                  <td>{{ indexData.total_conv_for_particular_receiver.receiver.currency }}</td>
                  <td>{{ indexData.total_conv_for_particular_receiver.sender.name }}</td>
                  <td>{{ indexData.total_conv_for_particular_receiver.sender.email }}</td>
                  <td>{{ indexData.total_conv_for_particular_receiver.sender.currency }}</td>
                </tr>
                </tbody>
              </template>
            </v-simple-table>
          </template>
        </v-col>
      </v-row>
  </v-parallax>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text v-if="Object.keys(thirdHighet).length > 0">
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="6"> <v-text-field readonly v-model="thirdHighet.sender.name" label="Sender Name"></v-text-field> </v-col>
              <v-col cols="12" sm="6" md="6"> <v-text-field readonly v-model="thirdHighet.receiver.name" label="Receiver Name"></v-text-field> </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="6"> <v-text-field readonly v-model="thirdHighet.sender.email" label="Sender Email"></v-text-field> </v-col>
              <v-col cols="12" sm="6" md="6"> <v-text-field readonly v-model="thirdHighet.receiver.email" label="Receiver Email"></v-text-field> </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="6"> <v-text-field readonly v-model="thirdHighet.sender.currency" label="Sender Currency"></v-text-field> </v-col>
              <v-col cols="12" sm="6" md="6"> <v-text-field readonly v-model="thirdHighet.receiver.currency" label="Receiver Currency"></v-text-field> </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="4" md="4"> <v-text-field readonly v-model="thirdHighet.amount" label="Sent Amount"></v-text-field> </v-col>
              <v-col cols="12" sm="4" md="4"> <v-text-field readonly v-model="thirdHighet.rate" label="Rate (USD based)"></v-text-field> </v-col>
              <v-col cols="12" sm="4" md="4"> <v-text-field readonly v-model="thirdHighet.converted_amount" label="Converted Amount"></v-text-field> </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-text v-else>
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <v-alert
                  type="warning"
              >
                You don't have enough transactions.
              </v-alert>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
  export default {
    name: 'App',
    data: () => ({
      dialog: false,
      apiUrl: 'report',
      thirdHighestApiUrl: 'third-highest',
      viewedIndex: -1,
    }),

    computed:{
    ...mapGetters(['indexData', 'thirdHighet', 'error', 'statusCode', 'errorMsg', 'getUrl']),
      formTitle () {
        return this.viewedIndex === -1 ? 'Third Highest Conversion Amount' : 'Third Highest Conversion Amount'
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.$store.dispatch('setReportData', [this.apiUrl])
      },

      viewItem (receiverId) {
        this.$store.dispatch('setThirdHighest', [this.thirdHighestApiUrl, receiverId])
        this.dialog = true
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
        //   this.editedItem = Object.assign({}, this.defaultItem)
          this.viewedIndex = -1
        })
      },
    }
  }
</script>