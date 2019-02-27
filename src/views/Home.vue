<template lang="pug">
  .home
    pokedex
</template>


<script lang="ts">
import Vue from 'vue';
import Pokedex from '../components/Pokedex.vue';

export default Vue.extend({
  name: 'Home',
  components: {
    Pokedex,
  },
});
</script>

<style lang="scss" scoped>
  .home {
    width: 95%;
    max-width: 1020px;
    margin: 0 auto;
  }
</style>

