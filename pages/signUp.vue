<template>
  <v-card class="elevation-1 pa-3 login-card">
    <v-card-text>
      <div class="layout column align-center">
        <h1 class="flex my-4 primary--text font-weight-thin">新規登録</h1>
      </div>
      <v-form ref="loginForm">
        <v-text-field
          append-icon="mdi-account"
          name="name"
          label="名前"
          type="text"
          :counter="256"
          v-model="model.name"
          required
        ></v-text-field>
        <v-text-field
          append-icon="mdi-pencil-box"
          name="bio"
          label="自己紹介"
          type="text"
          v-model="model.bio"
          :counter="256"
          required
        ></v-text-field>
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
      <v-btn block color="primary" @click="createUsers" :loading="loading">新規登録</v-btn>
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
      name: "",
      bio: "",
      email: "",
      password: "",
      password_confirmation: ""
    }
  }),

  methods: {
    createUsers() {
        axios.post('https://teachapi.herokuapp.com/sign_up',{
                "sign_up_user_params": {
                    "name": this.model.name,
                    "bio": this.model.bio,
                    "email": this.model.email,
                    "password": this.model.password,
                    "password_confirmation": this.model.password_confirmation
                }
        })
        .then(response => response.data)
        .then(json => {
                alert("ユーザーを作成しました")
                localStorage.token = json.token;
                localStorage.id = json.id;
                localStorage.name = json.name;
                localStorage.bio = json.bio;
                this.$router.push('/users');
        })
        .catch(error => {
            alert(error);
        });
    }
  }
}
</script>