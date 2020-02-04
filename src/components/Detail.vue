<template>
<div class="detail vh100 overflow-hidden">
    <div class="detail__background w100 h100">
        <img :src="detail.poster" class="w100 h100">
    </div>
    <div class="detail__content flex flex-column align-center pos-rlt vh100 overflow-hidden">
        <router-link :to="{ name: 'home' }" class="p8 bg-o600 cl-white pos-abs t16 l16 br24">
            <div class="mdi mdi-home mdi-24px"></div>
        </router-link>
        <div class="flex flex-wrap w100 pt16 overflow-hidden-x">
            <div class="col-md-2"></div>
            <div class="col-md-2 text-center">
                <img :src="detail.banner">
            </div>
            <div class="col-md-6 pl24 pr24">
                <h1 class="mb8 mt24">
                    {{ detail.name }}
                </h1>
                <h3 class="mb24">
                    {{ detail.nameEnglish }}
                </h3>

                <hr class="bg-n600">
                <div class="pt16">
                    <h2 class="pb8">
                        Server
                    </h2>
                    <div v-for="(server, index) in detail.server" :key="index" class="flex align-center mb16">
                        <div class="mr16">
                            {{ server.name }}
                        </div>
                        <div class="flex">
                            <a :href="chapter.links[0].source" target="_blank" v-for="(chapter, index) in server.chapters" :key="index" class="text-decoration-none pr12 pl12 mr4 cl-white bg-g200 br4">
                                {{ chapter.name }}
                            </a>
                        </div>
                    </div>
                </div>

                <hr class="bg-n600">
                <div class="pt16 pb16">
                    <span class="pr8">
                        {{ detail.releases[0].name }}
                    </span>
                    <span v-for="quality in detail.qualities" class="pr8">
                        {{ quality.name }}
                    </span>
                </div>

                <hr class="bg-n600">
                <div class="pt16 pb16">
                    <span class="pr8">Thời lượng:</span>
                    <span>
                        {{ detail.duration }}
                    </span>
                </div>

                <hr class="bg-n600">
                <div class="pt16 pb16">
                    <span class="pr8">Đạo diễn:</span>
                    <span v-for="(director, index) in detail.directors">
                        {{ director.name }}<template v-if="index !== detail.directors.length - 1">, </template>
                    </span>
                </div>

                <hr class="bg-n600">
                <div class="pt16 pb16">
                    <span class="pr8">Diễn viên:</span>
                    <span v-for="(cast, index) in detail.casts">
                        {{ cast.name }}<template v-if="index !== detail.casts.length - 1">, </template>
                    </span>
                </div>

                <hr class="bg-n600">
                <div class="pt16 pb16">
                    <span class="pr8">Quốc gia:</span>
                    <span v-for="(nation, index) in detail.nations">
                        {{ nation.name }}<template v-if="index !== detail.nations.length - 1">, </template>
                    </span>
                </div>

                <hr class="bg-n600">
                <div class="pt16 pb16">
                    <h2 class="pb8">Đánh giá phim:</h2>
                    <i v-for="rate in 5" class="mdi mdi-star mdi-36px" :class="{ 'cl-y100': rate <= detail.rate }"></i>
                </div>

                <hr class="bg-n600">
                <div class="pt16 pb16">
                    <h2 class="pb8">
                        Nội dung phim
                    </h2>
                    <div>
                        {{ detail.description }}
                    </div>
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
            object-fit: cover;
            object-position: top;
            opacity: 0.2;
            filter: blur(5px);
        }
    }
    &__content {
        color: white;
        img {
            max-width: 90%;
            border-radius: 4px;
            box-shadow: 0 0 10px white;
        }
    }
}
</style>
