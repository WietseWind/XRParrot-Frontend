<template>
  <div id="app" class="container-fluid p-0">
    <nav class="navbar navbar-expand-lg">
        <div class="container">
          <router-link class="navbar-brand" to="/">
            <img src="./assets/bird-icon.svg" width="58" style="float:left;" />
            <h1>XRPARROT</h1>
            <h2 class="pl-0 ml-0">BUY XRP with a SEPA (IBAN) transfer</h2>
          </router-link>
          <button v-if="userAgentValid" class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <i class="fa fa-bars"></i>
          </button>
          <div v-if="userAgentValid" class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <router-link class="nav-item nav-link home" :class="[{ 'active' : $route.name === 'home' }]" to="/"><img src="./assets/home-icon.svg" alt="" class="homeicon" /></router-link>

              <router-link v-if="$route.name === 'sendxrp' || getAccepted()" class="nav-item nav-link" :class="[{ 'active' : $route.name === 'sendxrp' }]" to="sendxrp">GET XRP</router-link>
              <a v-else href="#getXRP" class="nav-item nav-link" :class="[{ 'active' : $route.name === 'sendxrp' }]" to="sendxrp" data-toggle="modal" data-target="#getXRPModal">GET XRP</a>

              <router-link class="nav-item nav-link" :class="[{ 'active' : $route.name === 'faq' }]" to="faq">FAQ</router-link>
              <router-link class="nav-item nav-link" :class="[{ 'active' : $route.name === 'support' }]" to="support">SUPPORT</router-link>
              <router-link class="nav-item nav-link" :class="[{ 'active' : $route.name === 'about' }]" to="about">ABOUT</router-link>
            </div>
          </div>
        </div>
    </nav>
    <router-view v-if="userAgentValid && !awaitingAccept"/>
    <div v-else>
      <div v-if="!userAgentValid" style="width:50%; margin:200px 0 0 25%; text-align:center;">
        <h1>Error</h1>
        <strong>We're sorry but xrparrot doesn't work properly on an older browser.</strong>
        <br/>
        Please use a more modern browser like the latest version of Google Chrome, Firefox or IE Edge.
      </div>
      <div v-else style="width:50%; margin:200px 0 0 25%; text-align:center;">
        <!-- awaitingAccept -->
      </div>
    </div>
    <br /><br /><br />
    <footer>
      <img src="./assets/bird-icon.svg" class="bird fa-flip-horizontal" />
      <img src="./assets/footer-black.svg" class="dark" />
      <img src="./assets/footer-light.svg" class="light" />
    </footer>
    <Modal :onAccept="modalAccept" />
  </div>
</template>

<script>
import Modal from '@/views/Modal.vue'
const { detect } = require('detect-browser')
const browser = detect()

export default {
  name: 'home',
  components: {
    Modal
  },
  data () {
    return {
      userAgentValid: true,
      browser: browser,
      awaitingAccept: true
    }
  },
  created () {},
  mounted () {
    window.jQuery(document).on('click', '.navbar-nav a', () => {
      if (window.jQuery('.navbar-toggler').is(':visible')) {
        window.jQuery('.navbar-toggler').click()
      }
    })
    if (browser.name && browser.version && browser.name === 'ie' && parseInt(browser.version.split('.')[0]) < 11) {
      this.userAgentValid = false
    }
    if (this.$route.name !== 'sendxrp' && window.location.pathname !== '/sendxrp') {
      this.awaitingAccept = false
    } else {
      // Send XRP
      if (typeof window.localStorage['accept'] === 'string') {
        this.awaitingAccept = false
      } else {
        window.jQuery('#getXRPModal').modal({ keyboard: false, show: true, backdrop: 'static' })
      }
    }

    let DocHash = (document.location.hash || '')
    if (DocHash.length === 64 + 1) {
      document.location.href = 'https://xrpcharts.ripple.com/#/transactions/' + DocHash.slice(1)
    }
  },
  methods: {
    modalAccept () {
      this.awaitingAccept = false
      window.localStorage['accept'] = 'true'
    },
    getAccepted () {
      return typeof window.localStorage.getItem('accept') === 'string'
    }
  },
  computed: {
  },
  watch: {
  },
  filters: {
  }
}
</script>

<style lang="scss" scoped>
  .navbar-nav {
    a.nav-item.nav-link {
      white-space: nowrap !important;
      margin-left: 30px !important;
    }
  }
  .navbar-brand {
    position: relative; display: block;
    width: 315px; height: 75px;
    h1 {
      color:#333; font-size:45px; float:left; display:block;
      position: absolute; top:0; right:0;
    }
    h2 {
      color:#333; text-transform:uppercase; right: -7px; display:block; clear:both;
      font-size: 13px; position: absolute; bottom: 0px; font-weight: 400;
    }
  }
</style>

<style>
  @import './assets/scss/xrparrot.css';
  @import './assets/fontawesome/all.min.css';
</style>
