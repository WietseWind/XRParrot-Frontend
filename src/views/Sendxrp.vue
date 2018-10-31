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
    <div class="container mt-1 pt-5 page" v-if="!awaitingCaptcha && !isBot && !betaApproved">
      <div class="innerpage">
        <h4 class="text-center">Awesome!</h4>
        <p class="text-center">Please enter your BETA invitation code:</p>
        <div class="d-lg-flex justify-content-center align-items-center text-center">
          <div class="iban" v-if="!awaiting">
            <input autofocus type="text" spellcheck="false" v-on:keydown.enter="checkBETA()" class="uppercase form-control form-control-lg" placeholder="..." v-model="betaCode">
          </div>
          <button class="btn btn-primary next" :disabled="awaiting" @click="checkBETA()">
            <div v-if="!awaiting">OK</div>
            <div v-else>
              <i class="fas fa-spinner-third fa-spin"></i>
              Checking...
            </div>
          </button>
        </div>
      </div>
    </div>
    <div class="container mt-1 pt-5 page" v-if="!awaitingCaptcha && !isBot && betaApproved">
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
              <i v-if="pageComplete >= 3" class="fa fa-check-circle"></i>
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
              <input type="text" spellcheck="false" class="form-control form-control-lg" placeholder="Destination XRP address" v-on:keydown.enter="checkDestination()" v-model="destination">
            </div>
            <div class="tag" @click="tagFocus()" v-if="!awaiting">
              <ul class="tg-list">
                <li class="tg-list-item">
                  <input class="tgl tgl-light" id="cb1" type="checkbox" v-model="tagtoggle" />
                  <label class="tgl-btn" for="cb1"></label>
                </li>
              </ul>
              <input type="text" spellcheck="false" @blur="tagBlur()" ref="dtag" class="form-control form-control-lg" :disabled="!tagtoggle" v-on:keydown.enter="checkDestination()" placeholder="Tag" v-model="tag">
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
          <p class="text-center">Please enter the IBAN account you will be sending your deposit from.</p>
          <!-- <p class="text-center"><b>Make sure the IBAN account is in <span class="text-primary">your name</span>.</b></p> -->
          <p class="text-center pb-0 mb-0">
            Your bank account will be used to verify your deposit when it comes in.
          </p>
          <p class="text-center text-muted mb-3 mt-0 pt-0">
            <small>If your deposit comes in from another IBAN account, your transfer will
            be cancelled and refunded.</small>
          </p>
          <div class="d-lg-flex justify-content-center align-items-center text-center">
            <div class="iban" v-if="!awaiting">
              <input type="text" spellcheck="false" v-on:keydown.enter="checkIBAN()" class="uppercase form-control form-control-lg" placeholder="NL 12 ABCD 012345678" v-model="iban">
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
                  You'll receive a text message with a confirmation code.
                </p>
                <p class="text-center">
                  After verification, your phone number will be used to send you a
                  text message when your deposit is processed.
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
                <p class="text-center">Enter the verification code sent to your phone:</p>
                <div class="d-lg-flex justify-content-center align-items-center text-center">
                  <div class="phonecode">
                    <input maxlength="6" type="text" spellcheck="false" v-model="phoneCheck" class="form-control form-control-lg" placeholder="12345" v-on:keydown.enter="verifySMS()">
                  </div>
                  <button class="btn btn-primary next" :disabled="awaiting || !simpleVerifycheck" @click="verifySMS()">Verify <i class="fa fa-angle-right"></i></button>
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
          <div class="row equal">
            <div class="col-sm-6 mb-4">
              <div class="card h">
                <div class="card-header"><b>1. Verify</b></div>
                <div class="card-body">
                  <p class="card-text pb-0 mb-2">You will be sending your money from your account:</p>
                  <h5 class="mt-3 card-title"><code class="bg-light alert pt-1 pb-1"><b>{{ iban }}</b></code></h5>
                  <p class="card-text alert alert-warning text-center bg-white"><i class="fa fa-exclamation-triangle"></i> Please only send money from this account, or your transfer will be rejected and refunded.</p>
                  <p class="card-text pb-0 mb-2 mt-4">Your money will be converted to XRP and will be sent to:</p>
                  <h5 class="mt-3 card-title"><code class="bg-light alert pt-1 pb-1"><b>{{ destination }}</b></code></h5>
                  <div v-if="tagtoggle">
                    <p class="card-text pb-0 mb-2 mt-4">XRP deposit destination tag:</p>
                    <h5 class="mt-3 card-title pb-0 mb-0"><code class="bg-light alert pt-1 pb-1"><b>{{ tag }}</b></code></h5>
                  </div>
                  <div v-else>
                    <p class="card-text alert alert-warning text-center">No destination tag will be used for the XRP deposit.</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-6 mb-4">
              <div class="card h">
                <div class="card-header"><b>2. Transfer money</b></div>
                <div class="card-body">
                  <p class="card-text pb-0 mb-2">
                    Please use your existing online banking website/app and transfer your money (max. <span class="text-primary">&euro;500</span>) to:
                  </p>
                  <!-- Todo: max.: calculate based on existing limits -->
                  <h5 class="card-title"><code class="text-primary bg-light d-block alert"><b>NL39 BUNQ 2291 4183 35</b></code></h5>
                  <!-- <hr /> -->
                  <div class="row">
                    <div class="col-12 mt-2 text-left">
                      <div class="row">
                        <small class="col-12 pb-0 col-lg-4">BIC / Swift code </small> <div class="col-12 col-lg-8 mb-1"><code class="d-block text-primary bg-light pl-1">BUNQNL2A</code></div>
                        <small class="col-12 pb-0 col-lg-4">Account name </small> <div class="col-12 col-lg-8 mb-1"><code class="d-block text-primary bg-light pl-1">XRParrot</code></div>
                        <small class="col-12 pb-0 col-lg-4">Address, ZIP, City </small> <div class="col-12 col-lg-8 mb-1"><code class="d-block text-primary bg-light pl-1">Tolweg 5, 3741 LM, Baarn</code></div>
                        <small class="col-12 pb-0 col-lg-4">Country </small> <div class="col-12 col-lg-8 mb-1"><code class="d-block text-primary bg-light pl-1">NL (The Netherlands)</code></div>
                      </div>
                    </div>
                  </div>
                  <div id="transfernote" class="alert alert-success card-title mt-4 pt-2 pb-2 mb-0 pb-2">
                    <div class="card-text"><i class="far fa-exclamation-circle"></i> Add the following <strong><q><u>message</u></q></strong> or <strong><q><u>transfer description</u></q></strong> to your transfer:</div>
                    <h5 class="card-title mt-3"><code class="text-white bg-success pt-1 pb-1 pl-4 pr-4"><b>{{ transfer.details.description }}</b></code></h5>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-12 mb-4">
              <div class="card">
                <div class="card-header"><b><i class="fal fa-lightbulb-on"></i> Did you know...</b></div>
                <div class="card-body">
                  <h5 class="card-title">You can send recurring deposits to XRParrot:</h5>
                  <p class="card-text">
                    The IBAN deposit account and transfer description <strong class="text-primary">can be reused</strong>.
                    You can send additional deposits whenever you like, as long as your deposit sum will not
                    exceed <strong class="text-primary">€500 per calender month</strong>.
                  </p>
                  <p class="card-text">
                    Any follow up deposits using your transfer description <code><strong>{{ transfer.details.description }}</strong></code>
                    will be converted into XRP and sent to the destination account you specified.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- <div class="destinationtag">
            <p class="text-center">You entered this as the destination:</p>
            <p class="text-center"><b>{{ destination }}</b></p>
            <p class="text-center" v-if="tag.length > 0">
              Tag: <span class="badge badge-primary">{{  }}</span>
            </p>
          </div> -->
          <!-- <div class="ibanconf">
            <hr>
            <p class="text-center">And this as the IBAN:</p>
            <p class="text-center"><b></b></p>
            <p class="text-center"><b>NL39BUNQ2291418335</b></p>
          </div> -->
          <br /><br /><br />
          <button class="mt-5 btn btn-dark next" @click="cleanup()"><i class="fas fa-undo"></i> Start over</button>
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

const endpoint = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:3001/api/' : 'https://api.xrparrot.com/api/'

export default {
  name: 'home',
  data () {
    return {
      betaApproved: false,
      betaCode: '',
      pageComplete: 0,
      awaitingCaptcha: true,
      isBot: false,
      loading: true,
      pageStep: 0,
      activePage: 'destination',
      phonestep: 0,
      phoneNumber: '',
      phoneCheck: '',
      prefCountry: ['nl'],
      destination: '',
      tagtoggle: false,
      tag: '',
      iban: '',
      awaiting: false,
      transfer: {}
    }
  },
  created () {
  },
  computed: {
    simpleVerifycheck () {
      return this.phoneCheck.trim().match(/^[0-9]{6}$/)
    },
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
    if (typeof window.localStorage['betaApproved'] !== 'undefined') {
      this.betaCode = window.localStorage['betaApproved']
    }

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
    checkBETA () {
      window.fetch(`${endpoint}beta`, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({ code: this.betaCode.trim() }),
        headers: { 'Content-Type': 'application/json; charset=utf-8' }
      })
        .then(r => r.json())
        .then(r => {
          if (r.valid) {
            this.betaApproved = true
            window.localStorage['betaApproved'] = this.betaCode
          } else {
            swal({ title: 'Oops!', text: 'Invalid BETA invitation code, or already used.', closeOnClickOutside: false, closeOnEsc: false, icon: 'error', buttons: { cancel: `× Close` } }).then(s => {
              this.betaCode = ''
              this.inputFocus()
            })
          }
        })
    },
    cleanup () {
      Object.keys(window.localStorage).forEach(k => {
        delete window.localStorage[k]
      })
      document.location.reload()
    },
    verifySMS () {
      this.awaiting = true
      window.fetch(`${endpoint}finish`, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({ verify: this.phoneCheck }),
        headers: { 'Content-Type': 'application/json; charset=utf-8' }
      })
        .then(r => r.json())
        .then(r => {
          if (r.valid) {
            this.phonestep = 0
            this.awaiting = false
            this.transfer = r
            // window.console.log('GENERATE TRANSFER DETAILS @ BACKEND, AND MOVE TO CONFIRM')
            this.changePage('confirm', 3)
          } else {
            this.awaiting = false
            const text = `Sorry, but your verification code seems to be invalid. Please enter the number that was sent to the phone number you entered.`
            swal({ title: 'Oops!', text: r.msg !== '' ? r.msg : text, closeOnClickOutside: false, closeOnEsc: false, icon: 'error', buttons: { cancel: `× Close` } }).then(s => {
              this.phoneCheck = ''
              this.inputFocus()
            })
          }
        })
    },
    sendSMS () {
      this.awaiting = true
      window.fetch(`${endpoint}phone`, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({ phone: this.phoneNumber }),
        headers: { 'Content-Type': 'application/json; charset=utf-8' }
      })
        .then(r => r.json())
        .then(r => {
          if (r.valid || (typeof r.existingNumbers !== 'undefined' && typeof r.parsedNumber !== 'undefined' && r.existingNumbers.indexOf(r.parsedNumber) > -1)) {
            window.localStorage['phone'] = r.parsedNumber
            this.awaiting = false
            this.phonestep = 1
            this.inputFocus()
            if (r.verified || false) {
              this.verifySMS()
            }
          } else {
            const text = 'The entered phone number seems to be invalid:' + `\n\n${r.error}`
            swal({ title: 'Oops!', text: typeof r.invalidNo !== 'undefined' ? text : r.error, closeOnClickOutside: false, closeOnEsc: false, icon: 'error', buttons: { cancel: `× Close` } }).then(s => {
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
        credentials: 'include',
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
        credentials: 'include',
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
              credentials: 'include',
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

  div.equal {
    div.card.h {
      height: 100%;
    }
  }

  @keyframes yourAnimation {
    0% { }
    100% { background-color: transparent; }
  }
  @-webkit-keyframes yourAnimation {
    0% { }
    100% { background-color: transparent; }
  }
  @-moz-keyframes yourAnimation {
    0% { }
    100% { background-color: transparent; }
  }

  #transfernote {
    -webkit-animation: yourAnimation 0.8s infinite 1s ease-in;
    -moz-animation: yourAnimation 0.8s infinite 1s ease-in;
    animation: yourAnimation 0.8s infinite 1s ease-in;
    code {
      border-radius: 4px;
    }
  }
</style>
