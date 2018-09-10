module.exports = {
  runtimeCompiler: true,
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/assets/scss/_vars.scss";`
      }
    }
  }
}
