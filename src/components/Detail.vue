<template>
<div class="detail">
    <div class="detail__background">
        <img :src="detail.poster">
    </div>
    <div class="detail__content flex flex-column align-center pt16 pos-rlt">
        <router-link :to="{ name: 'home' }" class="p8 bg-g200 cl-white pos-abs t16 l16">
            <div class="mdi mdi-home mdi-36px"></div>
        </router-link>
        <div class="flex w100">
            <div class="col-md-5 text-right">
                <img :src="detail.banner">
            </div>
            <div class="col-md-7 pl32">
                <h2>
                    {{ detail.name }}
                </h2>
                <!-- <div v-for="(server, index) in detail.server" :key="index" class="flex align-center mb16">
                    <div class="mr16">
                        {{ server.name }}
                    </div>
                    <div class="flex">
                        <a :href="chapter.links[0].source" target="_blank" v-for="(chapter, index) in server.chapters" :key="index" class="text-decoration-none p4 mr4 cl-white bg-g200 br4">
                            {{ chapter.name }}
                        </a>
                    </div>
                </div> -->
                <hr class="bg-n600">
                <div class="pt8 pb8">
                    <span class="pr8">Đạo diễn:</span>
                    <span v-for="director in detail.directors">
                        {{ director.name }},
                    </span>
                </div>

                <hr class="bg-n600">
                <div class="pt8 pb8">
                    <span class="pr8">Diễn viên:</span>
                    <span v-for="cast in detail.casts">
                        {{ cast.name }},
                    </span>
                </div>

                <hr class="bg-n600">
                <div class="pt8 pb8">
                    <span class="pr8">Quốc gia:</span>
                    <span v-for="nation in detail.nations">
                        {{ nation.name }},
                    </span>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Detail',

    data() {
        return {
            detail: {}
        }
    },

    async mounted() {
        const data = await axios.get(`http://45.76.145.91:8080/apilink/detail?id=${this.$route.query.id}`)

        this.detail = data.data.data.film
    }
}
</script>

<style lang="scss">
.detail {
    &__background {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        background: black;
        img {
            max-width: 100%;
            opacity: 0.3;
        }
    }
    &__content {
        color: white;
        img {
            max-width: 320px;
            border-radius: 4px;
            box-shadow: 0 0 10px white;
        }
    }
}
</style>
