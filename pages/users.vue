<template>
  <v-app>
    <v-card class="elevation-0">
      <v-toolbar class="elevation-0" color="indigo" dark>
        <v-toolbar-title>ユーザー一覧</v-toolbar-title>

        <v-spacer></v-spacer>
      </v-toolbar>
      <v-data-table :headers="headers" :items="getUsers" :items-per-page="5" class="elevation-1"></v-data-table>
    </v-card>
  </v-app>
</template>


<script>
import axios from "axios";
export default {
  data() {
    return {
      getUsers: [],
      headers: [
        {
          text: "名前",
          align: "left",
          sortable: false,
          value: "name"
        }
      ],
      webStorage: this.$cookies.get("article01")
    };
  },
  props: {},
  computed: {
    webStorage_computed() {
      return JSON.parse(this.webStorage);
    }
  },
  created() {
    axios
      .get("https://teachapi.herokuapp.com/users", {
        headers: { Authorization: `Bearer ${this.webStorage_computed.token}` }
      })
      .then(response => response.data)
      .then(object => {
        this.getUsers = object;
      })
      .catch(error => {
        alert(error);
      });
  }
};
</script>