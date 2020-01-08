<template>
  <div class="home vw100 vh100">
    <div class="transition w100" :class="{ 'home-top-top': isHomeTopTop, 'home-top': isHomeTop, 'home-middle': isHomeMiddle }">
      <div class="brand flex justify-center">
        <div v-for="(text, index) in brand.texts" :key="index" :class="[brand.margin, `cl-${brand.colors[index]}`]">
          {{ text }}
        </div>
      </div>
      <div class="search flex flex-column align-center">
        <div class="topics flex flex-wrap justify-center font-12px">
          <div  v-for="(topic, index) in topics.deactives" @click="activeTopic(index)" :key="index" class="bg-o200 cl-white p4 mr4 mb4 br4 hover-bg-o400 hover-pointer">
            {{ topic.name }}
          </div>
        </div>
        <div class="search-input flex flex-column align-center">
          <div class="flex flex-wrap justify-center font-12px">
            <div v-for="(topic, index) in topics.actives" @click="deactiveTopic(index)" :key="index" class="cl-white p4 mt4 mr4 br4 bg-o400 hover-pointer">
              {{ topic.name }}
            </div>
          </div>
          <input @input="onSearch" @focus="search.isFocus = true" @blur="search.isFocus = false" v-model="search.key" type="text" placeholder="Search film..." class="w100">
        </div>
        <div v-show="isSearchBox" class="flex justify-center w100">
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
      },
      topics: {
        all: [],
        deactives: [],
        actives: []
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
    },

    topicIds () {
      return this.topics.actives.map((topic) => topic.id)
    }
  },

  async mounted () {
    const data = await axios.get('http://demo2699475.mockable.io/filters')

    this.topics.all = data.data.data.topics
    this.topics.deactives = this.topics.all
  },

  methods: {
    activeTopic (index) {
      const actives = this.topics.deactives.splice(index, 1)
      this.topics.actives.push(actives[0])
    },

    deactiveTopic (index) {
      const deactives = this.topics.actives.splice(index, 1)
      this.topics.deactives.push(deactives[0])
    },

    async onSearch () {
      this.search.isFetching = true

      const data = await axios.get(`http://demo2699475.mockable.io/search?q=${this.search.key}&filter=${this.topicIds}`)

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
      height: 100px;
    }
  }
  .search-box {
    height: calc(100vh - 150px);
    overflow: hidden auto;
  }
}
</style>