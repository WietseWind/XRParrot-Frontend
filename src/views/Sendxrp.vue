<template>
  <div>
    <div class="container mt-1 pt-5 page" v-if="awaitingCaptcha">
      awaiting captcha
    </div>
    <div class="container mt-1 pt-5 page" v-if="isBot">
      isbot
    </div>
    <div class="container mt-1 pt-5 page" v-if="!awaitingCaptcha && !isBot">
      <div class="d-lg-flex justify-content-around align-items-center text-center sendnav">
          <span @click="changePage('verify', 0)" class="link verify" :class="[{ 'active' : activePage === 'verify' , 'history' : pageStep > 0 }]">
              <b>1</b>
              <span>Verify phone</span>
              <i v-if="pageStep > 0 && phoneNumber.length !== 0" class="fa fa-check-circle"></i>
          </span>
          <span @click="changePage('iban', 1)" class="link iban" :class="[{ 'active' : activePage === 'iban' , 'history' : pageStep > 1 }]">
              <b>2</b>
              <span>Enter source IBAN</span>
              <i v-if="pageStep > 1" class="fa fa-check-circle"></i>
          </span>
          <span @click="changePage('destination', 2)" class="link destination" :class="[{ 'active' : activePage === 'destination' , 'history' : pageStep > 2 }]">
              <b>3</b>
              <span>Destination &amp; Tag</span>
              <i v-if="pageStep > 2" class="fa fa-check-circle"></i>
          </span>
          <span @click="changePage('confirm', 3)" class="link confirm" :class="[{ 'active' : activePage === 'confirm' , 'history' : pageStep > 3 }]">
              <b>4</b>
              <span>Confirm &amp; Transfer</span>
              <i v-if="pageStep > 3" class="fa fa-check-circle"></i>
          </span>
      </div>

      <div class="mt-5 pt-5 sendflow">
          <div v-if="activePage === 'verify'" class="innerpage">

              <div v-if="phonestep === 0">
                  <p class="text-center">Please verify your phone first</p>
                  <div class="d-lg-flex justify-content-center align-items-center text-center">
                      <vue-tel-input v-model="phoneNumber" :preferredCountries="prefCountry" placeholder="Phonenumber" class="phonenumber"></vue-tel-input>
                      <button class="btn btn-primary sendsms" @click="sendSMS()">Send sms</button>
                  </div>
                  <!-- <div class="nextnav text-center">
                    <button class="btn btn-primary" disabled>NEXT <i class="fa fa-angle-right"></i></button>
                  </div> -->
              </div>

              <div v-if="phonestep === 1">
                  <p class="text-center">Enter the verification code:</p>
                  <div class="d-lg-flex justify-content-center align-items-center text-center">
                      <div class="phonecode">
                        <input type="text" class="form-control form-control-lg" placeholder="12345">
                      </div>
                      <button class="btn btn-primary next" @click="changePage('iban', 1)">NEXT <i class="fa fa-angle-right"></i></button>
                      <button class="btn btn-light retrysms" @click="phonestep = 0, phoneNumber = ''"><i class="fa fa-redo fa-sm fa-flip-horizontal"></i> Retry</button>
                  </div>
                  <!-- <div class="nextnav text-center">
                    <button class="btn btn-primary next" @click="changePage('iban', 1)">NEXT <i class="fa fa-angle-right"></i></button>
                  </div> -->
              </div>

          </div>
          <div v-if="activePage === 'iban'" class="innerpage">
              <p class="text-center">Please enter the IBAN:</p>
              <div class="d-lg-flex justify-content-center align-items-center text-center">
                  <div class="iban">
                      <input type="text" class="form-control form-control-lg" placeholder="NL 12 ABCD 012345678" v-model="iban">
                  </div>
                  <button class="btn btn-primary next" @click="changePage('destination', 2)">OK</button>
              </div>
          </div>
          <div v-if="activePage === 'destination'" class="innerpage">
              <p class="text-center">Please enter the destination:</p>
              <div class="d-lg-flex justify-content-center align-items-center text-center">
                  <div class="iban">
                    <input type="text" class="form-control form-control-lg" placeholder="Destination address" v-model="destination">
                  </div>
                  <div class="tag">
                    <ul class="tg-list">
                      <li class="tg-list-item">
                        <input class="tgl tgl-light" id="cb1" type="checkbox" v-model="tagtoggle" />
                        <label class="tgl-btn" for="cb1"></label>
                      </li>
                    </ul>
                    <input type="text" class="form-control form-control-lg" :disabled="!tagtoggle" placeholder="Tag" v-model="tag">
                  </div>
                  <button class="btn btn-primary next" @click="changePage('confirm', 3)">OK</button>
              </div>
          </div>
          <div v-if="activePage === 'confirm'" class="innerpage text-center confirm">
            <div class="destinationtag">
              <p class="text-center">You entered this as the destination:</p>
              <p class="text-center"><b>{{ destination }}</b></p>
              <p class="text-center" v-if="tag.length > 0">
                Tag: <span class="badge badge-primary">{{ tag }}</span>
              </p>
            </div>
            <div class="ibanconf">
              <hr>
              <p class="text-center">And this as the IBAN:</p>
              <p class="text-center"><b>{{ iban }}</b></p>
            </div>
            <!-- <button class="btn btn-dark next" @click="sendTransfer('confirm', 3)">Confirm &amp; Send</button> -->
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'vue-tel-input/dist/vue-tel-input.css'
const endpoint = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:3001/api/' : 'https://xrparrot.com/api/'

export default {
  name: 'home',
  data () {
    return {
      awaitingCaptcha: true,
      isBot: false,
      loading: true,
      pageStep: 0,
      activePage: 'verify',
      phonestep: 0,
      phoneNumber: '',
      prefCountry: ['nl'],
      destination: '',
      tagtoggle: false,
      tag: '',
      iban: ''
    }
  },
  created () {
  },
  mounted () {
    this.loading = false
    this.loadCaptcha()
  },
  destroyed () {
    this.removeCaptcha()
  },
  methods: {
    removeCaptcha () {
      const captchaBadgeEl = document.querySelector('div.grecaptcha-badge')
      if (captchaBadgeEl) captchaBadgeEl.parentNode.removeChild(captchaBadgeEl)
      delete window.grecaptcha
    },
    loadCaptcha () {
      const script = document.createElement('script')
      script.setAttribute('src', 'https://www.google.com/recaptcha/api.js?render=6LeGRHEUAAAAAJnZ1aEnn3IcHYRkFqjRbOX2VFaS')
      script.setAttribute('async', 'async')
      script.setAttribute('defer', 'defer')
      script.setAttribute('defer', 'defer')
      script.onload = () => {
        window.grecaptcha.ready(() => {
          window.grecaptcha.execute('6LeGRHEUAAAAAJnZ1aEnn3IcHYRkFqjRbOX2VFaS', { action: 'xrp' }).then(token => {
            window.console.log('Captcha Token', token)
            window.fetch(`${endpoint}captcha`, { 
              method: 'POST', 
              body: JSON.stringify({ 
                token: token 
              }), 
              headers: {
                'Content-Type': 'application/json; charset=utf-8'
              }
            })
              .then(r => r.json())
              .then(r => console.log('Captcha Response', r))
          })
        })
      }
      document.querySelector('body').appendChild(script)
    },
    changePage (page, step) {
      this.activePage = page
      this.pageStep = step
    },
    sendSMS () {
      this.phonestep = 1
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

<style lang="scss">
  // h1 { color:$primary !important; }
</style>
