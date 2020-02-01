<template>
  <div>
    <h1>table page</h1>
    <div v-if="items">
      <table border="1">
        <tbody>
          <tr>
            <th>年齢</th>
            <th>推定ユーザー数</th>
          </tr>
          <tr v-for="item in items" :key="item.age">
            <td>{{ item.age }}</td>
            <td>{{ item.users }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p>loading...</p>
    </div>
  </div>
</template>

<script>
function getJson() {
  const ages = Array.from(
    new Set(
      new Array(parseInt(Math.random() * 100))
        .fill(null)
        .map(() => parseInt(Math.random() * 100))
    )
  );
  return ages.map(age => ({
    age,
    users: Math.random() * 10000
  }));
}
export default {
  data: () => ({
    items: []
  }),
  created() {
    this.fetch();
  },
  methods: {
    fetch() {
      this.items = getJson();
    }
  }
};
</script>

