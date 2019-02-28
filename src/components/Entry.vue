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
    .entry(@click="$emit('click', $event)")
        .front
            .detail
                .image
                    img(:src="getImageUrl(entryData.number)")
            .number
                | \#{{ entryData.number }}
            .name
                | {{ entryData.name }}
            .types
                .type(v-for="t in entryData.types" :class="slugify(t)")
                    | {{ t }}
        .back
            | FOOOOOO
</template>

<style lang="scss" scoped>
.entry {
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 0 0 10px 1px rgba(#000, .1);
    cursor: pointer;
    margin: 10px;
    padding: 15px;
    position: relative;
    transition: all .3s ease-in-out;
    transform: translateZ(0);
    transform-style: preserve-3d;
    width: calc(100% / 5 - 10px);
    min-width: 170px;

    &:hover {
        transform: translate3d(0, -3px, 0);
        box-shadow: 0 2px 10px 3px rgba(#000, .1);

        .detail {
            background-color: #eaeaea;

            &:before {
                padding-top: 60%;
                width: 60%;
            }

            &:after {
                padding-top: 80%;
                width: 80%;
            }
        }
    }

    &.featured {
        transform: translateZ(0) rotateY(180deg);

        &:hover {
            background-color: #eaeaea;
            box-shadow: 0 2px 10px 3px rgba(#000, .1);
            transform: translate3d(0, -3px, 0) rotateY(180deg);
        }

        .detail {
            background-color: #eaeaea;

            &:before {
                padding-top: 90%;
                width: 90%;
            }

            &:after {
                padding-top: 120%;
                width: 120%;
            }
        }
    }

    .front, .back {
        backface-visibility: hidden;
    }

    .back {
        background-color: #e0e0e0;
        background-image: radial-gradient(ellipse at center, #fafafa 0%, rgba(#FFF, 0) 100%);
        transform: translateZ(0) rotateY(180deg);
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
}

.detail {
    background-color: #e0e0e0;
    background-image: radial-gradient(ellipse at center, #fafafa 0%, rgba(#FFF, 0) 100%);
    border-radius: 5px 5px 0 0;
    margin: -15px -15px;
    overflow: hidden;
    padding: 20px 20px 62px;
    position: relative;
    transition: all .3s ease-in-out;

    &:before, &:after {
        content: '';
        background-color: rgba(#fff, .3);
        height: 0;
        left: 0;
        padding-top: 50%;
        position: absolute;
        top: 0;
        transition: all .3s ease-in-out;
        transform: translate3d(-50%, -50%, 0) rotate(45deg);
        width: 50%;
    }

    &:after {
        padding-top: 60%;
        width: 60%;
    }

    .image {
        width: 100%;
        padding-top: 100%;
        position: relative;
    }

    img {
        display: block;
        left: 0;
        margin: 0 auto;
        position: absolute;
        top: 0;
        width: 100%;
    }
}

.number {
    background-image: url('../assets/entry-notch.png');
    background-repeat: no-repeat;
    background-position: center center;
    font-family: Dosis, sans-serif;
    font-size: 24px;
    font-weight: bold;
    height: 42px;
    line-height: 50px;
    margin-top: -42px;
    margin-bottom: 15px;
    text-align: center;
    text-indent: -5px;
    position: relative;
}

.name {
    font-family: Dosis, sans-serif;
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 5px;
    text-transform: capitalize;
}

.types {
    display: flex;
    margin: 0 -2px;
}

.type {
    border-radius: 5px;
    padding: 3px 8px 5px;
    margin: 0 2px;
    font-size: 11px;
    line-height: 1;

    &.bug {
        background: linear-gradient(180deg, #729f3f 50%, #729f3f 50%);
        background-color: #729f3f;
        color: #fff
    }

    &.dark {
        background: linear-gradient(180deg, #707070 50%, #707070 50%);
        background-color: #707070;
        color: #fff
    }

    &.dragon {
        background: linear-gradient(180deg, #53a4cf 50%, #f16e57 50%);
        background-color: #53a4cf;
        color: #fff
    }

    &.eletric {
        background: linear-gradient(180deg, #eed535 50%, #eed535 50%);
        background-color: #eed535;
        color: #212121
    }

    &.fairy {
        background: linear-gradient(180deg, #fdb9e9 50%, #fdb9e9 50%);
        background-color: #fdb9e9;
        color: #212121
    }

    &.fighting {
        background: linear-gradient(180deg, #d56723 50%, #d56723 50%);
        background-color: #d56723;
        color: #fff
    }

    &.fire {
        background: linear-gradient(180deg, #fd7d24 50%, #fd7d24 50%);
        background-color: #fd7d24;
        color: #fff
    }

    &.flying {
        background: linear-gradient(180deg, #3dc7ef 50%, #bdb9b8 50%);
        background-color: #3dc7ef;
        color: #212121
    }

    &.ghost {
        background: linear-gradient(180deg, #7b62a3 50%, #7b62a3 50%);
        background-color: #7b62a3;
        color: #fff
    }

    &.grass {
        background: linear-gradient(180deg, #9bcc50 50%, #9bcc50 50%);
        background-color: #9bcc50;
        color: #212121
    }

    &.ground {
        background: linear-gradient(180deg, #f7de3f 50%, #ab9842 50%);
        background-color: #f7de3f;
        color: #212121
    }

    &.ice {
        background: linear-gradient(180deg, #51c4e7 50%, #51c4e7 50%);
        background-color: #51c4e7;
        color: #212121
    }

    &.normal {
        background: linear-gradient(180deg, #a4acaf 50%, #a4acaf 50%);
        background-color: #a4acaf;
        color: #212121
    }

    &.poison {
        background: linear-gradient(180deg, #b97fc9 50%, #b97fc9 50%);
        background-color: #b97fc9;
        color: #fff
    }

    &.psychic {
        background: linear-gradient(180deg, #f366b9 50%, #f366b9 50%);
        background-color: #f366b9;
        color: #fff
    }

    &.rock {
        background: linear-gradient(180deg, #a38c21 50%, #a38c21 50%);
        background-color: #a38c21;
        color: #fff
    }

    &.steel {
        background: linear-gradient(180deg, #9eb7b8 50%, #9eb7b8 50%);
        background-color: #9eb7b8;
        color: #212121
    }

    &.water {
        background: linear-gradient(180deg, #4592c4 50%, #4592c4 50%);
        background-color: #4592c4;
        color: #fff
    }
}
</style>
