<script lang="ts">
import Vue from 'vue';
import gql from 'graphql-tag';
import { kebabCase } from 'lodash';
import { Pokemon } from '../interfaces/Pokemon';

interface DataObj {
    pokemon: Pokemon;
}

export default Vue.extend({
    name: 'Entry',
    props: {
        entryData: Object,
        featured: {
            type: Boolean,
            default: false,
        },
    },
    data(): DataObj {
        return {
            pokemon: {},
        };
    },
    watch: {
        entryData: {
            immediate: true,
            handler(value) {
                if (!value) {
                    return;
                }

                this.$set(this, 'pokemon', Object.assign({}, this.pokemon, value));
            },
        },
        featured: {
            immediate: true,
            handler(value) {
                if (!value) {
                    return;
                }

                const options = {
                    query: gql`query getPokemonById ($entry_id: String) {
                        pokemon(id: $entry_id) {
                            maxHP,
                            maxCP,
                            attacks {
                                fast {
                                    name,
                                    type,
                                    damage
                                },
                                special {
                                    name,
                                    type,
                                    damage
                                }
                            }
                        }
                    }`,
                    variables: {
                        entry_id: this.pokemon.id,
                    },
                };

                this.$apollo.query(options)
                .then(({ data: { pokemon } }) => {
                    this.$set(this, 'pokemon', Object.assign({}, this.pokemon, pokemon));
                    // tslint:disable-next-line
                    console.log(pokemon);
                })
                .catch((error) => {
                    // tslint:disable-next-line
                    console.error(error);
                });
            },
        },
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
    .entry(@click="$emit('click', $event)" :class="{ featured }")
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
            .loading(v-if="!pokemon || pokemon.maxHP == undefined")
            .details(v-else)
                section.max-data
                    .max-cell
                        label Max HP
                        span {{ pokemon.maxHP }}
                    .max-cell
                        label Max CP
                        span {{ pokemon.maxCP }}
                section.attacks.fast
                    h3 Fast Attacks
                    table.attack-table
                        thead
                            tr
                                th Attack
                                th Type
                                th Power
                        tbody
                            tr(v-for="attack in pokemon.attacks.fast")
                                td {{ attack.name }}
                                td
                                    span.type(:class="slugify(attack.type)") {{ attack.type }}
                                td {{ attack.damage }}
                section.attacks.special
                    h3 Special Attacks
                    table.attack-table
                        thead
                            tr
                                th Attack
                                th Type
                                th Power
                        tbody
                            tr(v-for="attack in pokemon.attacks.special")
                                td {{ attack.name }}
                                td
                                    span.type(:class="slugify(attack.type)") {{ attack.type }}
                                td {{ attack.damage }}

</template>

<style lang="scss" scoped>
.entry {
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 0 0 10px 1px rgba(#000, .1);
    box-sizing: border-box;
    cursor: pointer;
    padding: 15px;
    position: relative;
    transition: all .3s ease-in-out;
    transform: translateZ(0);
    min-width: 230px;
    transform-style: preserve-3d;

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
        box-sizing: border-box;
        height: 100%;
        left: 0;
        padding: 15px;
        position: absolute;
        transform: translateZ(0) rotateY(180deg);
        top: 0;
        width: 100%;
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
    background-position: bottom center;
    background-size: 150px auto;
    font-family: Dosis, sans-serif;
    font-size: 24px;
    font-weight: bold;
    height: 33px;
    line-height: 40px;
    margin-top: -33px;
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

    &.eletric, &.electric {
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

.loading {
    background-image: url('../assets/loading.svg');
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 50px 50px;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
}

.details {
    font-size: 14px;
    max-height: 100%;
    overflow: hidden;
    overflow-y: auto;
}

.max-data {
    display: flex;
    justify-content: space-between;

    .max-cell {
        flex: 0 0 calc(50% - 5px);
        border: 1px solid #ddd;
        background-color: #eee;
        box-sizing: border-box;
        padding: 5px;

        label {
            color: #888;
            font-size: 10px;
            font-weight: bold;
            text-transform: uppercase;
            display: block;
        }

        span {
            font-family: Dosis, sans-serif;
            font-weight: bold;
            display: block;
            text-align: center;
            font-size: 18px;
        }
    }
}

.attacks {
    h3 {
        font-family: Dosis, sans-serif;
        font-weight: bold;
        font-size: 18px;
        margin: 15px 0 10px;
    }

    .attack-table {
        width: 100%;

        thead th:first-child {
            text-align: left;
        }

        tbody {
            td {
                font-size: 13px;
                padding: 1px 0;
                text-align: center;

                &:first-child {
                    text-align: left;
                }

                .type {
                    padding: 2px 4px 3px;
                }
            }
        }
    }
}

</style>
