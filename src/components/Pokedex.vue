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
    display: grid;
    grid-template-rows: auto;
    grid-auto-flow: row;
    grid-gap: 10px;

    @media screen and (min-width: 1086px) {
        grid-template-columns: auto auto auto auto;

        .entry {
            &:nth-child(4n+1) {
                grid-column: 1 / 2;
            }

            &:nth-child(4n+2) {
                grid-column: 2 / 3;
            }

            &:nth-child(4n+3) {
                grid-column: 3 / 4;
            }

            &:nth-child(4n) {
                grid-column: 4 / 5;
            }
        }
    }

    @media screen and (min-width: 781px) and (max-width: 1085px) {
        grid-template-columns: auto auto auto;
        max-width: 830px;
        margin: 0 auto;

        .entry {
            &:nth-child(3n+1) {
                grid-column: 1 / 2;
            }

            &:nth-child(3n+2) {
                grid-column: 2 / 3;
            }

            &:nth-child(3n) {
                grid-column: 3 / 4;
            }
        }
    }

    @media screen and (min-width: 525px) and (max-width: 780px) {
        grid-template-columns: auto auto;
        max-width: 550px;
        margin: 0 auto;

        .entry {
            &:nth-child(2n+1) {
                grid-column: 1 / 2;
            }

            &:nth-child(2n) {
                grid-column: 2 / 3;
            }
        }
    }

    @media screen and (max-width: 524px) {
        grid-template-columns: auto;
        max-width: 270px;
        margin: 0 auto;

        .entry {
            grid-column: 1 / 2;
        }
    }
}
</style>
