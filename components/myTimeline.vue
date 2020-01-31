<template>
  <v-card width="1000px" class="mx-auto elevation-0">
    <div class="layout column align-center">
      <h1 class="flex my-4 primary--text font-weight-thin">My tweet</h1>
    </div>
    <!-- ダイヤログ -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-container style="padding-bottom:0;margin-bottom:0; padding-top: 30px;">
          <v-text-field v-model="editedItem.text" class="text-margin" label="編集"></v-text-field>
        </v-container>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="save(editedItem.id,editedItem.text)">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- ダイヤログここまで -->
    <v-list>
      <!-- transitionがうまく動かない -->
      <transition-group name="fade">
        <v-list-item v-for="item in getTimeline" :key="item.id">
          <!-- 投稿一覧 -->
          <v-layout :id="`a${item.id}`" :key="item.id">
            <v-icon>mdi-account-circle</v-icon>
            <v-list-item v-text="item.text"></v-list-item>
            <v-btn icon style="margin-top: 6.5px">
              <v-icon @click.stop="edit(item.id,item.text)">mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon style="margin-top: 6.5px">
              <v-icon @click.stop="delete_post(item.id)">mdi-delete</v-icon>
            </v-btn>
          </v-layout>
        </v-list-item>
      </transition-group>
      <!-- 投稿一覧おわり -->
    </v-list>
  </v-card>
</template>


<script>
import axios from "axios";
export default {
  data() {
    return {
      dialog: false,
      editedItem: {
        id: "",
        text: ""
      },
      getTimeline: [],
      webStorage: this.$cookies.get("article01")
    };
  },
  computed: {
    webStorage_computed() {
      return JSON.parse(this.webStorage);
    }
  },
  methods: {
    edit(id, text) {
      this.editedItem.id = id;
      this.editedItem.text = text;
      this.dialog = true;
    },
    close() {
      this.dialog = false;
    },
    save(id, editText) {
      // editの非同期通信
      axios
        .put(
          `https://teachapi.herokuapp.com/posts/${id}`,
          {
            post_params: {
              text: editText
            }
          },
          {
            headers: {
              Authorization: `Bearer ${this.webStorage_computed.token}`
            }
          }
        )
        .then(result => {
          alert("編集に成功しました");
          this.dialog = false;
        })
        .catch(error => {
          alert(error);
        });
    },
    delete_post(id) {
      axios
        .delete(`https://teachapi.herokuapp.com/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${this.webStorage_computed.token}`
          }
        })
        .then(result => {
          alert("投稿を削除しました");
          this.delete_client(id);
        })
        .catch(error => {
          alert(error);
        });
    },
    delete_client(id) {
      const test = this.$el;
      test.querySelector(`#a${id}`).parentNode.remove();
    }
  },

  created() {
    axios
      .get(
        `https://teachapi.herokuapp.com/users/${this.webStorage_computed.id}/timeline`,
        {
          headers: { Authorization: `Bearer ${this.webStorage_computed.token}` }
        }
      )
      .then(response => response.data)
      .then(object => (this.getTimeline = object))
      .catch(error => {
        alert(error);
      });
  }
};
</script>

<style>
/* transition-groupのみあるmoveクラス */
.fade-move {
  transition: transform 1s;
}

/* 現れるときの */
.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 0.5s;
}
.fade-enter-to {
  opacity: 1;
}
/* 消えるときの */
.fade-leave {
  opacity: 1;
}
.fade-leave-active {
  transition: opacity 0.5s;
  position: absolute;
  width: 200px;
}
.fade-leave-to {
  opacity: 0;
}
</style>