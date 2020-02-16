module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "@/v2/assets/scss/global.scss";`
      }
    }
  }
}