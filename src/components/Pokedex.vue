<script lang="ts">
import Vue from 'vue';
import Entry from './Entry.vue';

export default Vue.extend({
    name: 'Pokedex',
    components: {
        Entry,
    },
    data() {
        return {
            pokemons: [
                {
                    number: '001',
                    name: 'bulbasour',
                    types: ['grass', 'poison'],
                },
                {
                    number: '025',
                    name: 'pikachu',
                    types: ['eletric'],
                }
            ],
        };
    },
});
</script>

<template lang="pug">
    .pokedex
        entry(v-for="poke of pokemons" :key="poke.number" :entry-data="poke")
</template>

