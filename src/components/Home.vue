<template>
  <div class="home w100 h100">
    <div class="flex flex-column justify-center w100 h100">
      <div class="brand flex justify-center">
        <div v-for="(text, index) in brand.texts" :key="index" :class="[brand.margin, `cl-${brand.colors[index]}`]">
          {{ text }}
        </div>
      </div>
      <div class="search flex flex-column">
        <div class="flex justify-center">
          <input @input="onSearch" v-model="search.key" type="text" placeholder="Search film...">
        </div>
        <div class="flex justify-center">
          <div class="search-box pt8">
            <div v-for="(film, index) in search.films" :key="index" class="search-box-item flex justify-space-between align-center p8 hover-bg-n75 br8">
              <div class="name cl-n800">
                {{ film.name }}
              </div>
              <div class="list-server flex">
                <a v-for="(server, index) in film.server" :key="index" @click="setIframe(server.chapters[0].links[0].source, server.name)" class="p4 br4 bg-g200 cl-white ml4 text-decoration-none hover-opacity-8 hover-pointer">
                  {{ server.name }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="iframe.source" class="modal">
      <i @click="removeIframe()" class="modal-close mdi mdi-close-circle mdi-48px cl-g200 hover-opacity-8 hover-pointer"></i>
      <a :href="iframe.source" target="_blank" class="modal-link p16 bg-g200 br8 cl-white text-decoration-none">
        {{ iframe.serverName }} <i class="mdi mdi-open-in-new"></i>
      </a>
      <iframe :src="iframe.source" frameborder="0" class="w100 h100"></iframe>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Home',

  data() {
    return {
      brand: {
        margin: 'mr8',
        texts: ['P', 'H', 'I', 'M', '3', '6', '5'],
        colors: ['r200', 'y200', 'g200', 'o200', 'r200', 'g200', 'o200']
      },
      search: {
        key: '',
        films: [],
      },
      iframe: {
        source: '',
        serverName: ''
      }
    }
  },

  methods: {
    async onSearch() {
      const data = await axios.get(`http://demo2699475.mockable.io/search?q=${this.search.key}`)

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
.home {
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
  }
}
</style>