<template>
<div class="home vw100 vh100 bg-dark">
    <div class="transition w100" :class="{ 'home-top-top': isHomeTopTop, 'home-top': isHomeTop, 'home-middle': isHomeMiddle }">
        <div class="brand flex justify-center cl-yellow">
            LINK PHIM
        </div>
        <div class="brand-description flex justify-center mt-12 mb24 cl-grey-light">
            Nền tảng tìm kiếm phim lớn nhất VIỆT NAM
        </div>
        <div class="search flex flex-column align-center">
            <div class="search-input flex align-center mb24">
                <i @click="onSearch" class="mdi mdi-magnify mdi-24px rotateY180 hover-pointer"></i>
                <input @input="onSearch" @focus="search.isFocus = true" @blur="search.isFocus = false" v-model="search.key" type="text" placeholder="Tìm mọi phim trên đời tại đây" class="w100 ml8">
            </div>
            <div class="flex">
                <div v-for="(topic, index) in topics" @click="changeTopicStatus(index)" class="px8 pt4 cl-white bd-yellow br4 mr16 hover-pointer text-uppercase text-bold" :class="{ 'bg-yellow cl-dark': topic.active }">
                    {{ topic.name }}
                </div>
            </div>
            <div v-show="isSearchBox" class="flex justify-center w100">
                <div class="search-box mt16">
                    <router-link :to="{ name: 'detail', query: { id: film.id } }" v-for="(film, index) in search.films" :key="index" class="search-box-item flex align-center p8 br8 text-decoration-none">
                        <img class="image mr20 br4" :src="film.banner" alt="">
                        <div>
                            <div class="flex text-nowrap">
                                <div class="name cl-white mr16 font-bold font-18px">
                                    {{ film.name }}
                                </div>
                                <div class="description cl-white overflow-hidden text-ellipsis">
                                    {{ film.description }}
                                </div>
                            </div>
                            <div class="flex">
                                <div class="duration bg-grey-dark cl-white br4 px8 pt4 mr8">
                                    {{ film.duration }}
                                </div>
                                <div class="dot br4 bg-white mr8 mt8"></div>
                                <div class="qualities flex">
                                    <div v-for="(quality, index) in film.qualities" :key="index" class="px8 pt4 mr8 cl-white br4 text-bold text-uppercase" :class="{ 'bd-g400': index > 0, [quality.name.toLowerCase()]: index === 0 }">
                                        {{ quality.name }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Home',

    data() {
        return {
            search: {
                key: '',
                films: [],
                isFocus: false,
                isFetching: false
            },
            iframe: {
                source: '',
                serverName: ''
            },
            topics: []
        }
    },

    computed: {
        isHomeTopTop() {
            return this.search.key
        },

        isHomeTop() {
            return this.search.isFocus
        },

        isHomeMiddle() {
            return !this.search.isFocus
        },

        isSearchBox() {
            return this.search.key && !this.search.isFetching
        },

        topicIds() {
            return this.topics.filter((topic) => topic.active).map((topic) => topic.name)
        }
    },

    async mounted() {
        const data = await axios.get('http://45.76.145.91:8080/apilink/filter')

        this.topics = data.data.data.topics
    },

    methods: {
        changeTopicStatus(index) {
            this.$set(this.topics[index], 'active', !this.topics[index].active)
            this.onSearch()
        },

        activeTopic(index) {
            const actives = this.topics.deactives.splice(index, 1)
            this.topics.actives.push(actives[0])
            this.onSearch()
        },

        deactiveTopic(index) {
            const deactives = this.topics.actives.splice(index, 1)
            this.topics.deactives.push(deactives[0])
            this.onSearch()
        },

        async onSearch() {
            this.search.isFetching = true

            const data = await axios.get(`http://45.76.145.91:8080/apilink/search?q=${this.search.key}&filter=${this.topicIds}`)

            this.search.isFetching = false

            this.search.films = data.data.data.films
        },

        setIframe(source, serverName) {
            this.iframe.source = source
            this.iframe.serverName = serverName
        },

        removeIframe() {
            this.iframe.source = ''
            this.iframe.serverName = ''
        }
    }
}
</script>

<style lang="scss">
#app {
    overflow-y: hidden;
}

.home {
    .home-top {
        position: absolute;
        top: 0;
        transform: translateY(0);
    }

    .home-middle {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }

    .home-top-top {
        position: absolute;
        top: 0;
        transform: translateY(-90px);
    }

    .brand {
        font-size: 60px;
        font-family: myriad-pro-bold;
    }

    .search-input {
        border-radius: 22px;
        border: none;
        background-color: $N75;
        padding-left: 20px;

        input {
            height: 44px;
            border: none;
            color: $N200;
            background-color: transparent;
            font-size: 14px;
            outline: none;
        }
    }

    .topics,
    .search-input,
    .search-box {
        width: 90%;

        @include res(tablet) {
            width: 70%;
        }

        @include res(laptop) {
            width: 50%;
        }

        img {
            width: 54px;
            height: 54px;
            object-fit: cover;
            object-position: top;
        }
    }

    .search-box {
        height: calc(100vh - 150px);
        overflow: hidden auto;
        .description {
            width: calc(100% - 200px);
        }
        .dot {
            width: 8px;
            height: 8px;
        }
        .qualities {
            .hd {
                background-color: #f1ce2b;
                color: #030d19;
            }
            .cam {
                background-color: #df7b32;
                color: #030d19;
            }
            .trainer {
                background-color: #e0132b;
                color: white;
            }
        }
    }
}
</style>
