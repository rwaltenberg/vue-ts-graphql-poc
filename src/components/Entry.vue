<script lang="ts">
import Vue from 'vue';
import { kebabCase } from 'lodash';

export default Vue.extend({
    name: 'Entry',
    props: {
        entryData: Object,
    },
    methods: {
        getImageUrl(num: number): string {
            return `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${num}.png`;
        },
        slugify: kebabCase,
    },
});
</script>

<template lang="pug">
    .entry
        .image
            img(:src="getImageUrl(entryData.number)")
        .number
            | \#{{ entryData.number }}
        .name
            | {{ entryData.name }}
        .types
            .type(v-for="t in entryData.types" :class="slugify(t)")
                | {{ t }}
</template>

