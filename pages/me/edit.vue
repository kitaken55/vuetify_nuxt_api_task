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
          required
          v-model="name"
        ></v-text-field>
        <v-text-field
          append-icon="mdi-pencil-box"
          name="bio"
          label="自己紹介"
          type="text"
          :counter="256"
          required
          v-model="bio"
        ></v-text-field>
      </v-form>
      <p>{{ webStorage_computed }}</p>
    </v-card-text>

    <div class="login-btn text-right btn-margin">
      <v-btn color="primary" @click="editUser">編集</v-btn>
    </div>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      name: "",
      bio: ""
    };
  },
  computed: {
    webStorage_computed() {
      const strage = this.$cookies.get("article01");
      const json = JSON.parse(strage); //ここをreturnすることで、ちゃんとwebStorage_computed.nameとかが使える。
      this.name = json.name; //ここでdata()のnameに代入
      this.bio = json.bio; //ここでdata()のbioに代入
      return json;
    }
  },
  methods: {
    editUser() {
      console.log(this.webStorage_computed.id);
      axios
        .put(
          `https://teachapi.herokuapp.com/users/${this.webStorage_computed.id}`,
          {
            user_params: {
              name: this.name,
              bio: this.bio
            }
          },
          {
            headers: {
              Authorization: `Bearer ${this.webStorage_computed.token}`
            }
          }
        )
        .then(response => response.data)
        .then(object => {
          alert("編集が完了しました。");
          const obj = {
            name: object.name,
            id: object.id,
            token: this.webStorage_computed.token, //APIで帰ってこない分、ここでcomputedからtoken持ってくる。
            bio: object.bio
          };
          this.$cookies.set("article01", obj, {
            path: "/",
            maxAge: 60 * 60 * 24 * 7
          });
          this.$router.push("/users");
        })
        .catch(error => {
          alert(error);
        });
    }
  }
};
</script>



















