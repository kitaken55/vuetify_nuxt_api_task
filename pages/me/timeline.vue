<template>
  <v-card max-width="100%" class="mx-auto">
    <v-toolbar color="indigo" dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>MyTimeline</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>
    <v-list>
      <v-list-item v-for="item in getTimeline" :key="item.id" @click="test">
        <v-list-item-icon>
          <v-icon v-if="item.icon" color="pink">mdi-star</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title v-text="item.text"></v-list-item-title>
        </v-list-item-content>

        <!-- <v-list-item-avatar>
          <v-img :src="image_src"></v-img>
        </v-list-item-avatar>-->
      </v-list-item>
    </v-list>
  </v-card>
</template>


<script>
import axios from "axios";
export default {
  data() {
    return {
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
    test() {}
  },
  created() {
    // alert(this.$store.state.id);
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