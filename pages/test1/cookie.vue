<template>
  <div>
    s
    <button @click="test">ose</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // setCached =
      // {
      //   title: 'こんにちは！タイトルをキャッシュします',
      //   content: 'こんにちは！内容をキャッシュします。'
      // }
    };
  },
  methods: {
    setCached() {
      return {
        title: "こんにちは！タイトルをキャッシュします",
        content: "こんにちは！内容をキャッシュします。"
      };
    },
    test() {
      // console.log(this.setCached());
      this.$cookies.set("article01", this.setCached(), {
        path: "/",
        maxAge: 60 * 60 * 24 * 7
      });
      console.log(this.$cookies);
    }
  }
};
</script>