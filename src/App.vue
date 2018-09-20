<template>
  <div id="app" class="container-fluid p-0">
    <nav class="navbar navbar-expand-lg">
        <div class="container">
          <a class="navbar-brand" href="/"><img src="./assets/logo.svg" width="300" /></a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <i class="fa fa-bars"></i>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <a class="nav-item nav-link home" :class="[{ 'active' : $route.name === 'home' }]" href="/"><img src="./assets/home-icon.svg" alt="" class="homeicon" /></a>
              <a class="nav-item nav-link" :class="[{ 'active' : $route.name === 'sendxrp' }]" href="sendxrp">SEND XRP</a>
              <a class="nav-item nav-link" :class="[{ 'active' : $route.name === 'faq' }]" href="faq">FAQ</a>
              <a class="nav-item nav-link" :class="[{ 'active' : $route.name === 'support' }]" href="support">SUPPORT</a>
            </div>
          </div>
        </div>
    </nav>
    <router-view/>
    <footer>
      <img src="./assets/bird-icon.svg" class="bird" />
      <img src="./assets/footer-black.svg" class="dark" />
      <img src="./assets/footer-light.svg" class="light" />
    </footer>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {}
  },
  created () {},
  mounted () {},
  methods: {
  },
  computed: {
  },
  watch: {
  },
  filters: {
  }
}
</script>

<style>
  @import './assets/scss/xrparrot.css';
  @import './assets/fontawesome/fontawesome.css';
</style>
