<template>
  <v-form ref="form">
    <v-text-field v-model="text" :counter="140" label="Name" required></v-text-field>

    <v-btn color="primary" @click="postMessage">tweet</v-btn>
  </v-form>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    text: ""
  }),

  methods: {
    postMessage() {
      axios
        .post(
          "https://teachapi.herokuapp.com/posts",
          {
            post_params: {
              text: this.text
            }
          },
          {
            headers: { Authorization: `Bearer ${localStorage.token}` }
          }
        )
        .then(result => {
          this.$router.push(url);
        })

        .catch(error => {
          alert(error);
        });
    }
  }
};
</script>