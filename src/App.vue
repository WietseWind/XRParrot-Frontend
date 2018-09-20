<template>
  <div id="app" class="container-fluid p-0">
    <nav class="navbar navbar-expand-lg">
        <div class="container">
          <router-link class="navbar-brand" to="/"><img src="./assets/logo.svg" width="300" /></router-link>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <i class="fa fa-bars"></i>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <router-link class="nav-item nav-link home" :class="[{ 'active' : $route.name === 'home' }]" to="/"><img src="./assets/home-icon.svg" alt="" class="homeicon" /></router-link>
              <router-link class="nav-item nav-link" :class="[{ 'active' : $route.name === 'sendxrp' }]" to="sendxrp">SEND XRP</router-link>
              <router-link class="nav-item nav-link" :class="[{ 'active' : $route.name === 'faq' }]" to="faq">FAQ</router-link>
              <router-link class="nav-item nav-link" :class="[{ 'active' : $route.name === 'support' }]" to="support">SUPPORT</router-link>
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

<style>
  @import './assets/scss/xrparrot.css';
  @import './assets/fontawesome/fontawesome.css';
</style>
