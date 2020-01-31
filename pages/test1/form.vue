<template>
  <v-form ref="form">
    <v-text-field v-model="name" :counter="140" label="Name" required></v-text-field>

    <v-btn color="success" @click="validate">Validate</v-btn>
  </v-form>
</template>

<script>
export default {
  data: () => ({}),

  methods: {
    validate() {}
  }
};
</script>