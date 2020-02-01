<template>
<div class="detail flex flex-column align-center pt16 pos-rlt">
    <router-link :to="{ name: 'home' }" class="p8 bg-g200 cl-white pos-abs t16 l16">
        <div class="mdi mdi-home mdi-36px"></div>
    </router-link>
    <img :src="detail.banner" alt="">
    <h2>
        {{ detail.name }}
    </h2>
    <div v-for="(server, index) in detail.server" :key="index" class="flex align-center mb16">
        <div class="mr16">
            {{ server.name }}
        </div>
        <div class="flex">
            <a :href="chapter.links[0].source" target="_blank" v-for="(chapter, index) in server.chapters" :key="index" class="text-decoration-none p4 mr4 cl-white bg-g200 br4">
                {{ chapter.name }}
            </a>
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
    img {
        max-width: 320px;
    }
}
</style>
