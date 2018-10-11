<template>
  <div id="app" class="container-fluid p-0">
    <nav class="navbar navbar-expand-lg">
        <div class="container">
          <router-link class="navbar-brand" to="/"><img src="./assets/logo.svg" width="300" /></router-link>
          <button v-if="userAgentValid" class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <i class="fa fa-bars"></i>
          </button>
          <div v-if="userAgentValid" class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <router-link class="nav-item nav-link home" :class="[{ 'active' : $route.name === 'home' }]" to="/"><img src="./assets/home-icon.svg" alt="" class="homeicon" /></router-link>
              <router-link class="nav-item nav-link" :class="[{ 'active' : $route.name === 'sendxrp' }]" to="sendxrp">SEND XRP</router-link>
              <router-link class="nav-item nav-link" :class="[{ 'active' : $route.name === 'faq' }]" to="faq">FAQ</router-link>
              <router-link class="nav-item nav-link" :class="[{ 'active' : $route.name === 'support' }]" to="support">SUPPORT</router-link>
            </div>
          </div>
        </div>
    </nav>
    <router-view v-if="userAgentValid"/>
    <div v-else>
      <div style="width:50%; margin:200px 0 0 25%; text-align:center;">
        <h1>Error</h1>
        <strong>We're sorry but xrparrot doesn't work properly on an older browser.</strong>
        <br/>
        Please use a more modern browser like the latest version of Google Chrome, Firefox or IE Edge.
      </div>
    </div>
    <footer>
      <img src="./assets/bird-icon.svg" class="bird fa-flip-horizontal" />
      <img src="./assets/footer-black.svg" class="dark" />
      <img src="./assets/footer-light.svg" class="light" />
    </footer>
  </div>
</template>

<script>
const { detect } = require('detect-browser')
const browser = detect()

export default {
  name: 'home',
  data () {
    return {
      userAgentValid: true,
      browser: browser
    }
  },
  created () {},
  mounted () {
    if (browser.name && browser.version && browser.name === 'ie' && parseInt(browser.version.split('.')[0]) < 11) {
      this.userAgentValid = false
    }
  },
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
  @import './assets/fontawesome/all.min.css';
</style>
