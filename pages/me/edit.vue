<template>
  <v-app>
    <v-card width="1000px" class="elevation-1 pa-3 login-card align-center mx-auto">
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
      </v-card-text>

      <div class="login-btn text-right btn-margin">
        <v-btn color="primary" @click="editUser">編集</v-btn>
      </div>
      <div class="login-btn text-right btn-margin">
        <v-btn color="primary" @click="logout">ログアウト</v-btn>
      </div>
    </v-card>

    <p class="margin-top">
      <myTimeline />
    </p>
  </v-app>
</template>

<script>
import axios from "axios";
import myTimeline from "~/components/myTimeline.vue";
export default {
  components: {
    myTimeline
  },
  data() {
    return {
      name: "",
      bio: ""
    };
  },
  created() {
    this.webStorage();
  },
  methods: {
    webStorage() {
      const strage = this.$cookies.get("article01");
      const json = JSON.parse(strage); //ここをreturnすることで、ちゃんとwebStorage_computed.nameとかが使える。
      this.name = json.name; //ここでdata()のnameに代入
      this.bio = json.bio; //ここでdata()のbioに代入
      return json;
    },
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
    },
    logout() {
      alert("ログアウトしました");
      // this.$router.pushさせると、映らないはずのヘッダーが移る。
      this.$router.push("/");
      // location.href = "/";
      this.$cookies.removeAll();
    }
  }
};
</script>


<style>
.margin-top {
  margin-top: 50px;
}
</style>


















