<template>
    <v-app>
    <v-data-table
        :headers="headers"
        :items="getUsers"
        :items-per-page="5"
        class="elevation-1"
    ></v-data-table>
    </v-app>
</template>


<script>
import axios from "axios"
  export default {
    data() {
      return {
        getUsers: [],
        headers: [
          {
            text: '名前',
            align: 'left',
            sortable: false,
            value: 'name',
          },
        ],
      }
    },
    created() {
        axios.get('https://teachapi.herokuapp.com/users', {
        headers: {"Authorization": "Bearer JHBgQ17rEdLFFf4Q88LWCAtt" }
        })
        .then(response => response.data)
        .then(object => {
            this.getUsers = object
        })
        .catch(error => {
            alert(error);
        });
    }
  }
</script>