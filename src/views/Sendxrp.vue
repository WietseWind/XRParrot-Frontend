<template>
  <div id="getxrp" class="pb-5">
    <div class="container mt-1 pt-5 page" v-if="awaitingCaptcha">
      <div class="alert alert-warning text-center pb-5 pt-5">
        <i class="fas fa-spinner-third fa-spin"></i>
        One moment: checking some things...
      </div>
    </div>
    <div class="container mt-1 pt-5 page" v-if="isBot">
      <div class="alert alert-danger text-center pb-4 pt-5">
        <i class="fas fa-star-exclamation"></i>
        Oops. Looks like something is wrong with your browser.
        <br />
        <small class="text-muted">Ref: <code class="bg-light text-muted pl-1 pr-1">#GCBT01</code></small>
      </div>
    </div>
    <div class="container mt-1 pt-5 page" v-if="!awaitingCaptcha && !isBot">
      <div class="d-lg-flex justify-content-around align-items-center text-center sendnav">
          <span @click="changePage('destination', 0)" class="link destination" :class="[{ 'active' : activePage === 'destination' , 'history' : pageStep > 0 }]">
              <b>1</b>
              <span>XRP destination</span>
              <i v-if="pageComplete > 0" class="fa fa-check-circle"></i>
          </span>
          <span :disabled="pageComplete < 1" @click="changePage('iban', 1)" class="link iban" :class="[{ 'active' : activePage === 'iban' , 'history' : pageStep > 1 }]">
              <b>2</b>
              <span>Enter source IBAN</span>
              <i v-if="pageComplete > 1" class="fa fa-check-circle"></i>
          </span>
          <span :disabled="pageComplete < 2" @click="changePage('verify', 2)" class="link verify" :class="[{ 'active' : activePage === 'verify' , 'history' : pageStep > 2 }]">
              <b>3</b>
              <span>Verify phone</span>
              <i v-if="pageComplete > 2" class="fa fa-check-circle"></i>
              <!--  && phoneNumber.length !== 0 -->
          </span>
          <span :disabled="pageComplete < 3" @click="changePage('confirm', 3)" class="link confirm" :class="[{ 'active' : activePage === 'confirm' , 'history' : pageStep > 3 }]">
              <b>4</b>
              <span>Confirm &amp; Transfer</span>
              <i v-if="pageComplete > 3" class="fa fa-check-circle"></i>
          </span>
      </div>

      <div class="mt-5 pt-5 sendflow">
          <div v-if="activePage === 'destination'" class="innerpage">
            <p class="text-center">
              Please enter the destination account (wallet address) your XRP should be delivered to.
            </p>
            <p class="text-center">
              The destination XRP address should start with a lowercase <code class="alert-primary pl-1 pr-1">r</code>.
            </p>
            <p class="text-center alert alert-warning">
              If you want to send your XRP to a third party (shared wallet, platform, exchange, ...) make sure
              you enter your (destination) tag.
            </p>
            <div class="mt-5 d-lg-flex justify-content-center align-items-center text-center">
              <div class="raddress" v-if="!awaiting">
                <input type="text" spellcheck="false" class="form-control form-control-lg" placeholder="Destination XRP address" v-model="destination">
              </div>
              <div class="tag" @click="tagFocus()" v-if="!awaiting">
                <ul class="tg-list">
                  <li class="tg-list-item">
                    <input class="tgl tgl-light" id="cb1" type="checkbox" v-model="tagtoggle" />
                    <label class="tgl-btn" for="cb1"></label>
                  </li>
                </ul>
                <input type="text" spellcheck="false" @blur="tagBlur()" ref="dtag" class="form-control form-control-lg" :disabled="!tagtoggle" placeholder="Tag" v-model="tag">
              </div>
              <button class="btn btn-primary next" :disabled="awaiting || !simpleDestinationCheck" @click="checkDestination()">
                <div v-if="!awaiting">OK</div>
                <div v-else>
                  <i class="fas fa-spinner-third fa-spin"></i>
                  Checking...
                </div>
              </button>
            </div>
          </div>

          <div v-if="activePage === 'iban'" class="innerpage">
              <p class="text-center">Please enter the IBAN account you will be sending your deposit from:</p>
              <div class="d-lg-flex justify-content-center align-items-center text-center">
                  <div class="iban" v-if="!awaiting">
                    <input type="text" spellcheck="false" class="uppercase form-control form-control-lg" placeholder="NL 12 ABCD 012345678" v-model="iban">
                  </div>
                  <button class="btn btn-primary next" :disabled="awaiting || !simpleIbanCheck" @click="checkIBAN()">
                    <div v-if="!awaiting">OK</div>
                    <div v-else>
                      <i class="fas fa-spinner-third fa-spin"></i>
                      Checking...
                    </div>
                  </button>
              </div>
          </div>

          <div v-if="activePage === 'verify'" class="innerpage">
              <div v-if="phonestep === 0">
                  <p class="text-center">
                    Please enter your mobile phone number.
                  </p>
                  <p class="text-center">
                    You'll receive a text message with a confirmation code.
                  </p>
                  <div class="d-lg-flex justify-content-center align-items-center text-center">
                      <vue-tel-input v-model="phoneNumber" :preferredCountries="prefCountry" placeholder="Phonenumber" class="phonenumber"></vue-tel-input>
                      <button class="btn btn-primary sendsms" :disabled="awaiting || !simplePhonecheck" @click="sendSMS()">
                        <div v-if="!awaiting">Verify</div>
                        <div v-else>
                          <i class="fas fa-spinner-third fa-spin"></i>
                          Checking...
                        </div>
                      </button>
                  </div>
                  <!-- <div class="nextnav text-center">
                    <button class="btn btn-primary" disabled>NEXT <i class="fa fa-angle-right"></i></button>
                  </div> -->
              </div>

              <div v-if="phonestep === 1">
                  <p class="text-center">Enter the verification code:</p>
                  <div class="d-lg-flex justify-content-center align-items-center text-center">
                      <div class="phonecode">
                        <input type="text" spellcheck="false" class="form-control form-control-lg" placeholder="12345">
                      </div>
                      <button class="btn btn-primary next" @click="changePage('confirm', 3)">Verify <i class="fa fa-angle-right"></i></button>
                  </div>
                  <br />
                  <div class="mt-3 d-lg-flex justify-content-center align-items-center text-center">
                    <span class="text-muted pr-2">Or...</span>
                    <button class="btn btn-sm btn-outline-light bg-light text-secondary retrysms" @click="phonestep=0;inputFocus()">
                      <i class="fa fa-arrow-left fa-sm xfa-flip-horizontal"></i> Go back (change number)
                    </button>
                  </div>
                  <!-- <div class="nextnav text-center">
                    <button class="btn btn-primary next" @click="changePage('iban', 1)">NEXT <i class="fa fa-angle-right"></i></button>
                  </div> -->
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
import Vue from 'vue'
import VueTelInput from 'vue-tel-input'
import 'vue-tel-input/dist/vue-tel-input.css'
import swal from 'sweetalert'

Vue.use(VueTelInput)

const endpoint = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:3001/api/' : 'https://xrparrot.com/api/'

export default {
  name: 'home',
  data () {
    return {
      pageComplete: 0,
      awaitingCaptcha: true,
      isBot: false,
      loading: true,
      pageStep: 0,
      activePage: 'destination',
      phonestep: 0,
      phoneNumber: '',
      prefCountry: ['nl'],
      destination: '',
      tagtoggle: false,
      tag: '',
      iban: '',
      awaiting: false
    }
  },
  created () {
  },
  computed: {
    simplePhonecheck () {
      return this.phoneNumber.trim().match(/[0-9 -]{5,}/)
    },
    simpleIbanCheck () {
      return this.iban.trim().match(/^[a-z]{2}[a-z0-9 ]{6,}/i)
    },
    simpleDestinationCheck () {
      const destinationCheck = typeof this.destination === 'string' && this.destination.trim().match(/^r/) && this.destination.trim().length > 20
      const tagCheck = !this.tagtoggle || (this.tagtoggle && (this.tag + '').trim().match(/^[0-9]{1,10}$/) && !isNaN(parseInt(this.tag)) && parseInt(this.tag) <= 4294967295)
      return destinationCheck && tagCheck
    }
  },
  mounted () {
    this.loading = false
    this.loadCaptcha()
    if (swal.getState().isOpen) swal.close()

    if (typeof window.localStorage['destination'] === 'string') {
      const destination = window.localStorage['destination'].split(':')
      this.destination = destination[0]
      if (destination.length > 1) {
        this.tag = destination[1]
        this.tagtoggle = true
      }
    }

    if (typeof window.localStorage['iban'] === 'string') {
      this.iban = window.localStorage['iban']
    }

    if (typeof window.localStorage['phone'] === 'string') {
      this.phoneNumber = window.localStorage['phone']
    }
  },
  destroyed () {
    this.removeCaptcha()
  },
  methods: {
    sendSMS () {
      this.awaiting = true
      window.fetch(`${endpoint}phone`, {
        credentials: process.env.NODE_ENV === 'development' ? 'include' : 'same-origin',
        method: 'POST',
        body: JSON.stringify({ phone: this.phoneNumber }),
        headers: { 'Content-Type': 'application/json; charset=utf-8' }
      })
        .then(r => r.json())
        .then(r => {
          if (r.valid) {
            window.localStorage['phone'] = r.parsedNumber
            this.awaiting = false
            this.phonestep = 1
            this.inputFocus()
          } else {
            const text = 'The entered phone number seems to be invalid:' + `\n\n${r.error}`
            swal({ title: 'Oops!', text: text, closeOnClickOutside: false, closeOnEsc: false, icon: 'error', buttons: { cancel: `× Close` } }).then(s => {
              this.awaiting = false
              this.phonestep = 0
              this.inputFocus()
            })
          }
        })
    },
    checkIBAN () {
      this.awaiting = true
      window.fetch(`${endpoint}iban`, {
        credentials: process.env.NODE_ENV === 'development' ? 'include' : 'same-origin',
        method: 'POST',
        body: JSON.stringify({ iban: this.iban }),
        headers: { 'Content-Type': 'application/json; charset=utf-8' }
      })
        .then(r => r.json())
        .then(r => {
          if (r.valid) {
            window.localStorage['iban'] = r.iban
            this.awaiting = false
            this.changePage('verify', 2)
          } else {
            const text = 'The entered IBAN account number seems to be invalid.'
            swal({ title: 'Oops!', text: text, closeOnClickOutside: false, closeOnEsc: false, icon: 'error', buttons: { cancel: `× Close` } }).then(s => {
              this.awaiting = false
            })
          }
        })
    },
    checkDestination () {
      this.awaiting = true
      window.fetch(`${endpoint}xrpl-destination`, {
        credentials: process.env.NODE_ENV === 'development' ? 'include' : 'same-origin',
        method: 'POST',
        body: JSON.stringify({ account: this.destination, tag: this.tagtoggle ? this.tag : null }),
        headers: { 'Content-Type': 'application/json; charset=utf-8' }
      })
        .then(r => r.json())
        .then(r => {
          if (r.response.valid) {
            const continueValid = async (p) => {
              if (p === null) { // Prev cancel
                this.awaiting = false
                return
              }
              let goToNextPage = true
              if (!this.tagtoggle && r.response.incomingTxCountWithTag && r.response.incomingTxCountWithTag > 5) {
                await swal({
                  title: 'Continue without tag?',
                  text: `This destination account recently received multiple transactions WITH a destination tag.\n\nAre you sure you want to continue without a tag?`,
                  closeOnClickOutside: false,
                  closeOnEsc: false,
                  icon: 'info',
                  buttons: {
                    cancel: `× No, cancel`,
                    next: { text: `Yes, continue →`, value: 'next', closeModal: true }
                  }
                }).then(s => {
                  if (s === null) goToNextPage = false
                })
              }
              this.awaiting = false
              if (goToNextPage) {
                this.changePage('iban', 1)
                window.localStorage['destination'] = this.destination + (this.tagtoggle ? ':' + this.tag : '')
              }
            }
            if (!r.response.accountActivated) {
              swal({
                title: 'Account not activated',
                text: `The destination account:\n${r.response.account}\n\n... is not yet activated, and will be activated upon deposit.\n\nShould your XRP be sent here? Only continue if you know what this means, and wish to continue.`,
                closeOnClickOutside: false,
                closeOnEsc: false,
                icon: 'warning',
                buttons: {
                  cancel: `× Cancel`,
                  next: { text: `Continue →`, value: 'next', closeModal: true }
                }
              }).then(continueValid)
            } else if (r.response.accountNameInfo && typeof r.response.accountNameInfo.name !== 'undefined') {
              swal({
                title: 'Please confirm account',
                text: `The destination account:\n${r.response.account}\n\n... is known as: \n"${r.response.accountNameInfo.name.toUpperCase()}"\n\nShould your XRP be sent here?`,
                closeOnClickOutside: false,
                closeOnEsc: false,
                icon: 'info',
                buttons: {
                  cancel: `× No, cancel`,
                  next: { text: `Yes, continue →`, value: 'next', closeModal: true }
                }
              }).then(continueValid)
            } else {
              continueValid()
            }
          } else {
            let text = `Something is not OK.`
            if (!r.response.addressValid) {
              text = `The destination account is invalid.`
            } else if (r.response.tagRequired && !r.response.tagValid) {
              text = `Entering a (destination) tag is mandatory for this destination account.`
            } else if (r.response.doNotSendXrp) {
              text = `The destination account doesn't allow XRP to be deposited.`
            }
            swal({ title: 'Oops!', text: text, closeOnClickOutside: false, closeOnEsc: false, icon: 'error', buttons: { cancel: `× Close` } }).then(s => {
              this.awaiting = false
            })
          }
        })
    },
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
            // window.console.log('Captcha Token', token)
            window.fetch(`${endpoint}captcha`, {
              credentials: process.env.NODE_ENV === 'development' ? 'include' : 'same-origin',
              method: 'POST',
              body: JSON.stringify({ token: token }),
              headers: { 'Content-Type': 'application/json; charset=utf-8' }
            })
              .then(r => r.json())
              .then(r => {
                this.awaitingCaptcha = false
                if (r.response.score <= 0.5) {
                  this.isBot = true
                }
                this.removeCaptcha()
              })
          })
        })
      }
      document.querySelector('body').appendChild(script)
    },
    inputFocus () {
      this.$nextTick(() => {
        const input = document.querySelector('input')
        if (input) input.focus()
      })
    },
    changePage (page, step) {
      if (!this.awaiting) {
        this.activePage = page
        this.pageStep = step
        this.inputFocus()
      }
    },
    tagFocus () {
      if (this.tagtoggle === false) {
        this.tagtoggle = true
      }
    },
    tagBlur () {
      if (this.tag.trim() === '') {
        this.tagtoggle = false
      }
    }
  },
  watch: {
    pageStep () {
      if (this.pageComplete < this.pageStep) {
        this.pageComplete = this.pageStep
      }
    },
    tagtoggle () {
      if (this.tagtoggle && typeof this.$refs.dtag !== 'undefined') {
        this.$nextTick(() => this.$refs.dtag.focus())
      }
    }
  },
  filters: {
  }
}
</script>

<style lang="scss">
  #getxrp { z-index: 99; position: relative; }
</style>

<style lang="scss" scoped>
  // h1 { color:$primary !important; }
  span[disabled] {
    cursor: default;
    pointer-events: none;
  }

  .uppercase { text-transform: uppercase }
</style>
