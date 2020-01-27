<template>
  <v-app light>
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app>
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

    <!-- ヘッダー -->
    <!-- ifでloginのときはヘッダーにアクセスさせない。 -->
    <template v-if="beforeLogin">
      <v-app-bar :clipped-left="clipped" fixed app>
        <v-app-bar-nav-icon @click="drawer = !drawer" />
        <!-- <v-btn icon @click.stop="miniVariant = !miniVariant">
          <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
        </v-btn>-->
        <!-- <v-btn icon @click.stop="clipped = !clipped">
          <v-icon>mdi-application</v-icon>
        </v-btn>-->
        <!-- <v-btn icon @click.stop="fixed = !fixed">
          <v-icon>mdi-minus</v-icon>
        </v-btn>-->
        <v-toolbar-title v-text="title" />
        <!-- <v-spacer /> -->
        <!-- <v-btn icon @click.stop="rightDrawer = !rightDrawer">
          <v-icon>mdi-menu</v-icon>
        </v-btn>-->
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

    <!-- <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>mdi-repeat</v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>-->

    <!-- フッター -->
    <!-- <v-footer :fixed="fixed" app>
      <span>&copy; きたけんAPI課題</span>
    </v-footer>-->
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
        // {
        //   icon: "mdi-account",
        //   title: "自分の投稿",
        //   to: "/me/timeline"
        // },
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