<template>
  <div class="home vw100 vh100">
    <div class="transition w100" :class="{ 'home-top-top': isHomeTopTop, 'home-top': isHomeTop, 'home-middle': isHomeMiddle }">
      <div class="brand flex justify-center">
        <div v-for="(text, index) in brand.texts" :key="index" :class="[brand.margin, `cl-${brand.colors[index]}`]">
          {{ text }}
        </div>
      </div>
      <div class="search flex flex-column">
        <div class="flex justify-center">
          <input @input="onSearch" @focus="search.isFocus = true" @blur="search.isFocus = false" v-model="search.key" type="text" placeholder="Search film...">
        </div>
        <div v-show="isSearchBox" class="flex justify-center">
          <div class="search-box mt8">
            <router-link :to="{ name: 'detail', query: { id: film.id } }" v-for="(film, index) in search.films" :key="index" class="search-box-item flex align-center p8 hover-bg-n75 br8 text-decoration-none">
              <img class="image mr16" :src="film.banner" alt="">
              <div>
                <div class="name cl-n800 mb16">
                  {{ film.name }}
                </div>
                <div class="qualities flex">
                  <div v-for="(quality, index) in film.qualities" :key="index" class="p4 bg-g200 mr4 cl-white br4">
                    {{ quality.name }}
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

  data () {
    return {
      brand: {
        margin: 'mr8',
        texts: ['P', 'H', 'I', 'M', '3', '6', '5'],
        colors: ['r200', 'y200', 'g200', 'o200', 'r200', 'g200', 'o200']
      },
      search: {
        key: '',
        films: [],
        isFocus: false,
        isFetching: false
      },
      iframe: {
        source: '',
        serverName: ''
      }
    }
  },

  computed: {
    isHomeTopTop () {
      return this.search.key
    },

    isHomeTop () {
      return this.search.isFocus
    },

    isHomeMiddle () {
      return !this.search.isFocus
    },

    isSearchBox () {
      return this.search.key && !this.search.isFetching
    }
  },

  methods: {
    async onSearch () {
      this.search.isFetching = true

      const data = await axios.get(`http://demo2699475.mockable.io/search?q=${this.search.key}`)

      this.search.isFetching = false

      this.search.films = data.data.data.films
    },

    setIframe (source, serverName) {
      this.iframe.source = source
      this.iframe.serverName = serverName
    },

    removeIframe () {
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
    transform: translateY(-70px);
  }
  .brand {
    > div {
      font-family: 'ComfortaaBold';
    }
    font-size: 56px;
    margin-bottom: 16px;
  }
  input {
    height: 44px;
    border-radius: 22px;
    border: none;
    background-color: #F1F3F4;
    color: #80868B;
    padding-left: 20px;
    font-size: 14px;
    outline: none;
    &:focus {
      background-color: white;
      box-shadow: 0 1px 6px 0 rgba(32,33,36,0.28);
    }
  }
  input,
  .search-box {
    width: 90%;
    @include res(tablet) {
      width: 70%;
    }
    @include res(laptop) {
      width: 50%;
    }
    img {
      height: 100px;
    }
  }
  .search-box {
    height: calc(100vh - 100px);
    overflow: hidden auto;
  }
}
</style>