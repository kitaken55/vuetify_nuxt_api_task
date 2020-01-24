<template>
  <div>
    <article v-if="article">
      <h1>{{ article.name }}</h1>
      <p>{{ article.bio }}</p>
    </article>
  </div>
</template>

<script>
export default {
  data() {
    return {
      article01: this.$cookies.get("article01")
    };
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