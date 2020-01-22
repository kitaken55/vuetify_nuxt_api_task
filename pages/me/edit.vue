<template>
  <v-card class="elevation-1 pa-3 login-card">
    <v-card-text>
      <div class="layout column align-center">
        <h1 class="flex my-4 primary--text font-weight-bold">ユーザー編集</h1>
      </div>
      <v-form ref="loginForm">
        <v-text-field
          append-icon="mdi-account"
          name="name"
          label="名前"
          type="text"
          :counter="256"
          v-model="name"
          required
        ></v-text-field>
        <v-text-field
          append-icon="mdi-pencil-box"
          name="bio"
          label="自己紹介"
          type="text"
          v-model="bio"
          :counter="256"
          required
        ></v-text-field>
        <p>{{ this.$store.state.token }}</p>
      </v-form>
    </v-card-text>
    <hr>



    <div class="login-btn">
      <!-- <v-btn block color="primary" @click="editUser" :loading="loading">ログイン</v-btn> -->
    </div>
  </v-card>
</template>

<script>
export default {
        data() {
        return {
            name: "",
            bio: "",
        }
    },
    methods: {
        counter() {
            this.$store.commit("increment");
        },
        changMessage() {
            this.$store.commit("changMessage", this.name);
        }
        // editUser() {
        //     axios.put(`users/${localStorage.id}`,
        //     {
        //         "user_params": {
        //             "name": this.name,
        //             "bio": this.bio,
        //         }
        //     },
        //     {
        //         headers: {"Authorization": `Bearer ${localStorage.token}`}
        //     }
        //     )
        //     .then(response => response.data)
        //     .then(object => {
        //         alert("編集が完了しました。");
        //         localStorage.name = object.name,
        //         localStorage.bio = object.bio,
        //         this.$router.push('/users')
        //     })
        //     .catch(error => {
        //         alert(error);
        //     });
        // }
    }
}
</script>