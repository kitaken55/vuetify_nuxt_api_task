<template>
  <v-card max-width="50%" class="elevation-1 pa-3 login-card mx-auto">
    <v-card-text>
      <div class="layout column align-center">
        <h1 class="flex my-4 primary--text font-weight-thin">ユーザー編集</h1>
      </div>
      <v-form ref="loginForm">
        <v-text-field
          append-icon="mdi-account"
          name="name"
          label="名前"
          type="text"
          :counter="256"
          v-model= name
          required
        ></v-text-field>
        <v-text-field
          append-icon="mdi-pencil-box"
          name="bio"
          label="自己紹介"
          type="text"
          :value= bio
          :counter="256"
          required
        ></v-text-field>
      </v-form>
    </v-card-text>

    <div class="login-btn text-right btn-margin">
      <v-btn color="primary" @click="editUser">編集</v-btn>
    </div>
  </v-card>
</template>

<script>
// import { mapGetters } from "vuex";
import axios from "axios";
export default {
    data() {
      return {
          name: this.$store.state.name,
          bio: this.$store.state.bio
      }
    },
    computed: {
      // ...mapGetters(["getName", "getBio","getId","getToken"]),
    },
    methods: {
        // editUser() {
        //   axios.put(`https://teachapi.herokuapp.com/users/${this.$store.state.id}`,
        //     {
        //         "user_params": {
        //             "name": this.name,
        //             "bio": this.bio,
        //         }
        //     },
        //     {
        //         headers: {"Authorization": `Bearer ${this.$store.state.token}`}
        //     }
        //     )
        //     .then(response => response.data)
        //     .then(object => {
        //         alert("編集が完了しました。");
        //         alert(object.name);
        //         alert(object.bio);

        //         this.cangeEdit(object.name, object.bio);
        //         this.$router.push('/users')
        //     })
        //     .catch(error => {
        //         alert(error);
        //     });
        // },
        // cangeEdit(name, bio) {
        //   this.$store.commit("store/editLocalStorage",{name, bio})
        // },
    }
}
</script>



















