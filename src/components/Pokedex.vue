<script lang="ts">
import Vue from 'vue';
import Entry from './Entry.vue';
import gql from 'graphql-tag';

interface DataObj {
    pokemons: object[];
}

export default Vue.extend({
    name: 'Pokedex',
    components: {
        Entry,
    },
    apollo: {
        pokemons: gql`{
            pokemons(first: 151) {
                id,
                number,
                name,
                types,
            }
        }`,
    },
    data(): DataObj {
        return {
            pokemons: [],
        };
    },
    computed: {
        featured(): string | null {
            return this.$route.params.id || null;
        },
    },
    methods: {
        toggleFeatured(num: string): void {
            if (this.featured && this.featured === num) {
                this.$router.push('/');
            } else {
                this.$router.push(`/${num}`);
            }
        },
    },
});
</script>

<template lang="pug">
    .pokedex
        entry(
            :featured="featured === poke.number"
            v-for="poke of pokemons" :key="poke.number"
            :entry-data="poke" @click="toggleFeatured(poke.number)"
        )
</template>

<style lang="scss" scoped>
.pokedex {
    display: flex;
    flex-wrap: wrap;

    @media screen and (max-width: 700px) {
        justify-content: center;
    }
}
</style>
