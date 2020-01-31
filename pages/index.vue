<!--  -->
<template>
  <v-app>
    <v-card width="500px" class="elevation-0 pa-3 login-card mx-auto content" :elevation="1">
      <v-card-text>
        <!--  -->
        <div class="layout column align-center">
          <h1 class="flex my-4 primary--text font-weight-thin">ログイン</h1>
        </div>
        <v-form ref="loginForm">
          <v-text-field
            append-icon="mdi-email-outline"
            name="login"
            label="メールアドレス"
            type="text"
            v-model="model.email"
            :counter="256"
            required
          ></v-text-field>
          <v-text-field
            append-icon="mdi-key"
            name="password"
            label="パスワード"
            id="password"
            type="password"
            v-model="model.password"
            :counter="32"
            :rules="passwordRules"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>

      <!-- <div class="login-btn text-right btn-margin"> -->
      <v-card-actions class="margin_1">
        <nuxt-link to="/signUp">signup</nuxt-link>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="loginUsers" :loading="loading">ログイン</v-btn>
      </v-card-actions>
      <!-- </div> -->
    </v-card>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    loading: false,
    emailRules: [
      v => !!v || "メールアドレスは必須項目です。",
      v =>
        (v && v.length <= 128) ||
        "メールアドレスは128文字以内で入力してください。",
      v =>
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          v
        ) || "メールアドレスの形式が正しくありません。"
    ],
    passwordRules: [
      v => !!v || "パスワードは必須項目です。",
      v => (v && v.length <= 32) || "パスワードは32文字以内で入力してください。"
    ],
    model: {
      email: "",
      password: "",
      password_confirmation: ""
    }
  }),

  methods: {
    loginUsers() {
      axios
        .post("https://teachapi.herokuapp.com/sign_in", {
          sign_in_user_params: {
            email: this.model.email,
            password: this.model.password,
            password_confirmation: this.model.password_confirmation
          }
        })
        .then(response => response.data)
        .then(object => {
          alert("ログインしました");
          const obj = {
            name: object.name,
            id: object.id,
            token: object.token,
            bio: object.bio
          };
          this.$cookies.set("article01", obj, {
            path: "/",
            maxAge: 60 * 60 * 24 * 7
          });

          this.$router.push("/timeline/all");
        })
        .catch(error => {
          alert(error);
        });
    }
  },
  computed: {
    article() {
      let post;
      if (this.article01) {
        post = JSON.parse(this.article01);
      }
      return post;
    }
  }
};
</script>

<style>
.content {
  margin-top: 50px;
}

.btn-margin {
  margin: 0 16px;
}
</style>