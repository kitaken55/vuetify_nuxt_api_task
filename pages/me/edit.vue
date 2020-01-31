<template>
  <v-app>
    <myTimeline />

    <v-card width="1000px" class="elevation-0 pa-3 login-card align-center mx-auto margin-top">
      <v-card-text>
        <div class="layout column align-center">
          <h1 class="flex my-4 primary--text font-weight-thin">Edit</h1>
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

        <div class="btn-margin">
          <v-btn block color="primary" @click="editUser">編集</v-btn>
        </div>
        <div class="btn-margin" style="margin-top: 40px">
          <v-btn block color="primary" @click="logout">ログアウト</v-btn>
        </div>
        <div class="btn-margin">
          <v-btn block color="red" @click="deleteUser">アカウントを消す</v-btn>
        </div>
      </v-card-text>
    </v-card>
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
    //ここはeditの部分に最初から文字を挿入しておくためだけの関数。addEditText
    this.addEditText();
  },
  methods: {
    addEditText() {
      const strage = this.$cookies.get("article01");
      const json = JSON.parse(strage); //ここをreturnすることで、ちゃんとwebStorage.nameとかが使える。
      this.name = json.name; //ここでdata()のnameに代入
      this.bio = json.bio; //ここでdata()のbioに代入
      return json;
    },
    webStorage() {
      const strage = this.$cookies.get("article01");
      const json = JSON.parse(strage);
      return json;
    },
    editUser() {
      axios
        .put(
          `https://teachapi.herokuapp.com/users/${this.webStorage().id}`,
          {
            user_params: {
              name: this.name,
              bio: this.bio
            }
          },
          {
            headers: {
              Authorization: `Bearer ${this.webStorage().token}`
            }
          }
        )
        .then(response => response.data)
        .then(object => {
          alert("編集が完了しました。");
          const obj = {
            name: object.name,
            id: object.id,
            token: this.webStorage().token, //APIで帰ってこない分、ここでmethodsからtoken持ってくる。
            bio: object.bio
          };
          this.$cookies.set("article01", obj, {
            path: "/",
            maxAge: 60 * 60 * 24 * 7
          });
          // this.$router.push("/users");
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
    },
    deleteUser() {
      if (confirm("本当にアカウントを消しますか？")) {
        axios
          .delete(
            `https://teachapi.herokuapp.com/users/${this.webStorage().id}`,
            {
              headers: {
                Authorization: `Bearer ${this.webStorage().token}`
              }
            }
          )
          .then(response => {
            alert("アカウントが消えました。");
            this.$cookies.removeAll();
            this.$router.push("/");
          })
          .catch(error => {
            alert(error);
          });
      }
    }
  }
};
</script>


<style>
.btn-margin {
  margin-top: 28px;
}

.margin-top {
  margin-top: 25px;
}
</style>


















