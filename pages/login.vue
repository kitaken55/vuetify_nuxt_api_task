<template>
  <v-card class="elevation-1 pa-3 login-card">
    <v-card-text>
      <div class="layout column align-center">
        <h1 class="flex my-4 primary--text font-weight-bold">ログイン</h1>
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
        <v-text-field
          append-icon="mdi-key"
          name="password_confirmation"
          label="パスワード再入力"
          id="password_confirmation"
          type="password"
          v-model="model.password_confirmation"
          :counter="32"
          :rules="passwordRules"
          required
        ></v-text-field>
      </v-form>
    </v-card-text>
    <div class="login-btn">
      <v-btn block color="primary" @click="loginUsers" :loading="loading">ログイン</v-btn>
    </div>
  </v-card>
</template>

<script>
import axios from "axios"
export default {
  data:() => ({
    loading: false,
    emailRules: [
      v => !!v || "メールアドレスは必須項目です。",
      v => (v && v.length <= 128) || "メールアドレスは128文字以内で入力してください。",
      v => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || "メールアドレスの形式が正しくありません。"
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
        axios.post('https://teachapi.herokuapp.com/sign_in',{
            "sign_in_user_params": {
                "email": this.model.email,
                "password": this.model.password,
                "password_confirmation": this.model.password_confirmation
            }
        })
        .then(response => response.data)
        .then(object => {
            if (object.token) {
                alert("ログインしました");
                this.changMessage(object.token,object.id,object.name,object.bio)
                // localStorage.token = object.token;
                // localStorage.id = object.id;
                // localStorage.name = object.name;
                // localStorage.bio = object.bio;
                this.$router.push('/users');
            } else {
                alert("存在しないアカウントです。");
            }
            })
        .catch(error => {
            alert(error);
        });
    },
    changMessage(token,id,name,bio) {
        this.$store.commit("changeLocalStorage", token, id, name, bio);
    }
  }
}
</script>