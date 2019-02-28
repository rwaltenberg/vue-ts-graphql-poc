<script lang="ts">
import Vue from 'vue';
import Entry from './Entry.vue';
import gql from 'graphql-tag';

export default Vue.extend({
    name: 'Pokedex',
    components: {
        Entry,
    },
    apollo: {
        pokemons: gql`{
            pokemons(first: 151) {
                number,
                name,
                types
            }
        }`
    },
    data() {
        return {
            pokemons: [],
        };
    },
});
</script>

<template lang="pug">
    .pokedex
        entry(v-for="poke of pokemons" :key="poke.number" :entry-data="poke")
</template>

<style lang="scss" scoped>
.pokedex {
    display: flex;
    flex-wrap: wrap;
}
</style>
