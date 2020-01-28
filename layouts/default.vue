<template>
  <v-app light>
    <!-- ヘッダー -->
    <!-- ifでloginのときはヘッダーにアクセスさせない。 -->
    <template v-if="beforeLogin">
      <!-- ドロワー -->
      <v-navigation-drawer
        v-model="drawer"
        :mini-variant="miniVariant"
        :clipped="clipped"
        fixed
        app
      >
        <v-list>
          <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
            <template>
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title v-text="item.title" />
              </v-list-item-content>
            </template>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <!-- ドロワー -->

      <v-app-bar :clipped-left="clipped" fixed app>
        <v-app-bar-nav-icon @click="drawer = !drawer" />

        <v-toolbar-title v-text="title" />
      </v-app-bar>
    </template>
    <!-- ヘッダー -->

    <!-- ログインフォーム -->
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <!-- ログインフォーム -->
  </v-app>
</template>

<script>
export default {
  computed: {
    beforeLogin() {
      if (this.$route.path === "/" || this.$route.path === "/signUp") {
        return false;
      } else {
        return true;
      }
    }
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-settings",
          title: "設定",
          to: "/me/edit"
        },
        {
          icon: " mdi-account-multiple",
          title: "ユーザー一覧",
          to: "/users"
        },
        {
          icon: "mdi-account",
          title: "みんなのタイムライン",
          to: "/timeline/all"
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "API_TASK"
    };
  }
};
</script>

<style>
</style>