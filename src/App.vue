<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import '@mdi/font/scss/materialdesignicons.scss'

export default {
  name: 'app'
}
</script>

<style lang="scss">
@import url(https://fonts.googleapis.com/css?lang=en&family=Roboto:400,700);

* {
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #e8edf0;
    border-radius: 3px;
  }
}

#app {
  overflow-x: hidden;
}

body {
  padding: 0;
  margin: 0;
}

body * {
  font-family: 'Roboto', arial, sans-serif;
}
</style>