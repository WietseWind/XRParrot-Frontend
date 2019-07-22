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
        Oops. Looks like something is wrong. You probably have a strict cookie blocker, or you are using a VPN or Tor proxy.
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
              <span>Transfer money</span>
              <i v-if="pageComplete >= 3" class="fa fa-check-circle"></i>
          </span>
      </div>

      <div class="mt-5 pt-5 sendflow">
        <div v-if="activePage === 'destination'" class="innerpage">
          <div v-if="!prefilled">
            <p class="text-center">
              Please enter the destination account (wallet address) your XRP should be delivered to.
            </p>
            <p class="text-center">
              The destination XRP address should start with a lowercase <code class="alert-primary pl-1 pr-1">r</code> or an uppercase
              <code class="alert-primary pl-1 pr-1">X</code> if you use an
              <a href="https://xrpaddress.info" target="_blank"><b>X</b>-encoded</a> destination.
            </p>
            <p class="text-center alert alert-warning px-3 py-2" v-show="!isXaddress">
              If you want to send your XRP to a third party (wallet, exchange, ...) make sure
              to use an <a href="https://xrpaddress.info" target="_blank"><b>X</b>-address</a> or to enter your destination tag.
            </p>
            <p class="text-center alert alert-warning px-3 py-2 invisible" v-show="isXaddress">
              If you want to send your XRP to a third party (wallet, exchange, ...) make sure
              to use an <a href="https://xrpaddress.info" target="_blank"><b>X</b>-address</a> or to enter your destination tag.
            </p>
          </div>
          <div v-else>
            <p class="text-center">
              <i class="fas fa-info-circle"></i>
              The destination XRP address
              <span v-if="tagtoggle">and destination tag are </span>
              <span v-else>is </span>
              <strong class="text-dark">prefilled</strong>
              for:<br />
              <span class="h4 mt-1 d-block text-primary">
                <i class="fab" :class="[ `fa-${prefilledData.network}` ]"></i>&nbsp;
                <strong>{{ prefilledData.name }}</strong>
                ({{ prefilledData.origin }})
              </span>
            </p>
          </div>
          <div class="mt-5 d-lg-flex justify-content-center align-items-center text-center">
            <div class="raddress" v-if="!awaiting">
              <div class="text-center d-block"><small>XRP address</small></div>
              <input type="text" spellcheck="false" class="form-control form-control-lg" :class="{xaddress: isXaddress}" :disabled="prefilled" placeholder="Destination XRP address" v-on:keydown.enter="checkDestination()" v-model="destination">
            </div>
            <div class="tag" @click="tagFocus()" v-if="!awaiting && !isXaddress">
              <div class="text-center d-block"><small>Destination tag</small></div>
              <div class="d-block" style="position: relative;">
                <ul class="tg-list d-block">
                  <li class="tg-list-item">
                    <input class="tgl tgl-light" id="cb1" type="checkbox" v-model="tagtoggle" />
                    <label class="tgl-btn" for="cb1"></label>
                  </li>
                </ul>
                <input type="text" spellcheck="false" @blur="tagBlur()" ref="dtag" :disabled="prefilled" class="form-control form-control-lg" v-on:keydown.enter="checkDestination()" placeholder="Tag" v-model="tag">
              </div>
            </div>
            <div class="d-block">
              <div class="text-center d-block"><small>&nbsp;</small></div>
              <button class="btn btn-primary next" :disabled="awaiting" @click="checkDestination()">
                <div v-if="!awaiting">OK</div>
                <div v-else>
                  <i class="fas fa-spinner-third fa-spin"></i>
                  Checking...
                </div>
              </button>
            </div>
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
          <p class="text-center mb-5 text-muted">
            <strong class="text-danger"><i class="fa fa-exclamation-triangle"></i> Please note! You can only send from your own bank account.</strong><br />
            <small>
              Services like TransferWise will use a third party bank account that's not in your name.<br /> Thus, a deposit using such a service won't work and
              result in a refund.
            </small>
          </p>
          <div class="d-lg-flex justify-content-center align-items-center text-center">
            <div class="iban" v-if="!awaiting">
              <input type="text" spellcheck="false" v-on:keydown.enter="checkIBAN()" class="uppercase form-control form-control-lg" style="width: 450px; max-width: 100% !important;" placeholder="NL 12 ABCD 012345678" v-model="iban">
            </div>
            <button class="btn btn-primary next" :disabled="awaiting" @click="checkIBAN()">
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
                    <button class="btn btn-primary sendsms" :disabled="awaiting" @click="sendSMS()">
                      <div v-if="!awaiting">Verify</div>
                      <div v-else>
                        <i class="fas fa-spinner-third fa-spin"></i>
                        Checking...
                      </div>
                    </button>
                </div>
            </div>

            <div v-if="phonestep === 1">
                <p class="text-center">Enter the verification code sent to your phone:</p>
                <div class="d-lg-flex justify-content-center align-items-center text-center">
                  <div class="phonecode">
                    <input maxlength="6" type="text" spellcheck="false" v-model="phoneCheck" class="form-control form-control-lg" placeholder="12345" v-on:keydown.enter="verifySMS()">
                  </div>
                  <button class="btn btn-primary next" :disabled="awaiting" @click="verifySMS()">Verify <i class="fa fa-angle-right"></i></button>
                </div>
                <br />
                <div class="mt-3 d-lg-flex justify-content-center align-items-center text-center">
                  <span class="text-muted pr-2">Or...</span>
                  <button class="btn btn-sm btn-outline-light bg-light text-secondary retrysms" @click="phonestep=0;inputFocus()">
                    <i class="fa fa-arrow-left fa-sm xfa-flip-horizontal"></i> Go back (change number)
                  </button>
                </div>
            </div>

        </div>

        <div v-if="activePage === 'confirm'" class="innerpage text-center confirm">
          <div class="row equal">
            <div class="col-12">
              <div class="alert alert-secondary bg-white">
                <h5 class="pb-0 mb-2"><i class="far fa-info-circle"></i> Your Payment ID is <strong class="text-dark">{{ transfer.details.description }}</strong>.</h5>
                You <strong>must</strong> add this ID to your payment to XRParrot.
                <br />Your Payment ID is linked to your source IBAN and destination XRP address &amp; tag.
                You <strong>can use this ID again</strong> for future payments.<br />
                If you forget this ID or if you want to change your payment source or XRP destination, you can simply generate a new ID.
              </div>
              <div class="card h">
                <!-- <div class="card-header"><b>2. Transfer money</b></div> -->
                <div class="card-body">
                  <p class="card-text pb-0 mb-4">
                    <!-- Todo: max.: calculate based on existing limits -->
                    <strong>
                      <span class="text-primary">
                        <!--<i class="fa fa-check"></i>-->
                        Please
                        <!-- use your existing online banking website/app and -->
                        transfer your money (min. &euro;5, max. &euro;2000) to the following account:
                      </span>
                    </strong>
                    <br />
                    <br />
                    <strong class="">After you have transferred the money</strong> it will take around <strong>one working</strong> day for your money to arrive at our bank.
                    Immediately after your money arrives it will be converted and your XRP sent to you. We will send you a text message (SMS) when this happens.
                  </p>
                  <p><strong>Payment details</strong>, click to copy:</p>
                  <div class="row">
                    <div class="col-12 col-lg-9 col-md-8">
                      <div class="row">
                        <div class="col-12 mt-2 text-left">
                          <div class="row">
                            <span class="col-12 pb-0 col-lg-4 mt-1"><b class="">IBAN</b></span> <div class="col-12 col-lg-8 mb-1"><code class="d-block text-primary bg-light pl-1 pt-2 pb-2 clb" v-clipboard:copy="'NL39BUNQ2291418335'">
                              <!-- <small class="float-right btn-qr"><button @click="sepaQR=true" class="btn btn-sm btn-outline-dark bg-white text-dark"><i class="text-dark fas fa-qrcode"></i> Show QR</button></small> -->
                              <h6 class="card-title pb-0 mb-0">
                                <b>NL39 BUNQ 2291 4183 35</b>
                              </h6>
                            </code></div>
                            <span class="col-12 pb-0 col-lg-4 mt-1">
                              <strong class="text-danger">Payment reference</strong>
                            </span>
                            <div class="col-12 col-lg-8 mb-1 transfernote"><code class="d-block text-danger bg-light pl-1 pt-2 pb-0 clb" v-clipboard:copy="transfer.details.description.replace(/\./, ' ')">
                              <!-- <small class="float-right btn-qr"><button @click="sepaQR=true" class="btn btn-sm btn-outline-dark bg-white text-dark"><i class="text-dark fas fa-qrcode"></i> Show QR</button></small> -->
                              <h6 class="card-title pb-0 mb-0">
                                <i class="fa fa-exclamation-triangle float-right mr-2" style="margin-top: 2px;"></i> <b>{{ transfer.details.description.replace(/\./, ' ') }}</b>
                                <br /><small class="pt-2 mb-0 pb-1">Please <strong><u>don't forget to include</u></strong> this ID with your transaction when sending your payment!</small>
                              </h6>
                            </code></div>
                            <small class="col-12 pb-0 col-lg-4 pt-1 pb-1">Account name </small> <div class="col-12 col-lg-8 mb-1"><code class="d-block text-primary bg-light pl-1 pb-1 pt-1 clb" v-clipboard:copy="'XRParrot NL'">XRParrot NL</code></div>
                            <small class="col-12 pb-0 col-lg-4 pt-1 pb-1">BIC / Swift code </small> <div class="col-12 col-lg-8 mb-1"><code class="d-block text-primary bg-light pl-1 pb-1 pt-1 clb" v-clipboard:copy="'BUNQNL2A'">BUNQNL2A (or: BUNQNL2AXXX)</code></div>
                            <small class="col-12 pb-0 col-lg-4 pt-1 pb-1">Beneficiary address</small> <div class="col-12 col-lg-8 mb-1"><code class="d-block text-primary bg-light pl-1 pb-1 pt-1 clb" v-clipboard:copy="'Tolweg 5, 3741 LM, Baarn, The Netherlands'">Tolweg 5, 3741 LM, Baarn, The Netherlands</code></div>
                            <!-- <small class="col-12 pb-0 col-lg-4 pt-1 pb-1">Country </small> <div class="col-12 col-lg-8 mb-1"><code class="d-block text-primary bg-light pl-1 pb-1 pt-1 clb" v-clipboard:copy="'The Netherlands (NL)'">The Netherlands (NL)</code></div> -->
                            <small class="col-12 pb-0 col-lg-4 pt-1 pb-1">Bank name </small> <div class="col-12 col-lg-8 mb-1"><code class="d-block text-primary bg-light pl-1 pb-1 pt-1 clb" v-clipboard:copy="'Bunq Bank'">Bunq Bank</code></div>
                            <small class="col-12 pb-0 col-lg-4 pt-1 pb-1">Bank address </small> <div class="col-12 col-lg-8 mb-1"><code class="d-block text-primary bg-light pl-1 pb-1 pt-1 clb" v-clipboard:copy="'Naritaweg 131, 1043 BS Amsterdam (NL)'">Naritaweg 131, 1043 BS Amsterdam (NL)</code></div>
                          </div>
                          <div class="row mt-3">
                            <small class="col-12 pb-0 col-lg-4 pt-1 pb-1 text-muted">Sending IBAN </small> <div class="col-12 col-lg-8 mb-1"><code class="d-block text-muted bg-light pl-1 pb-1 pt-1">{{ iban }}</code></div>
                            <small class="col-12 pb-0 col-lg-4 pt-1 pb-1 text-muted">XRP destination </small> <div class="col-12 col-lg-8 mb-1"><code class="d-block text-muted bg-light pl-1 pb-1 pt-1">{{ this.transfer.details.address }}</code></div>
                            <small class="col-12 pb-0 col-lg-4 pt-1 pb-1 text-muted">Destination tag </small> <div class="col-12 col-lg-8 mb-1"><code class="d-block text-muted bg-light pl-1 pb-1 pt-1">{{ this.transfer.details.tag ? this.transfer.details.tag : '-' }}</code></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-12 col-lg-3 col-md-4">
                      <div class="d-block d-lg-none">&nbsp;</div>
                      <qrcode-vue :value="qrValue" size="150" level="H" class="mt-2"></qrcode-vue>
                    </div>
                  </div>
                  <div id="transfernote" class="alert alert-danger card-title mt-4 pt-2 pb-2 mb-0 pb-2 d-none">
                    <div class="card-text"><i class="fa fa-exclamation-triangle"></i> Add the following <strong><q><u>message</u></q></strong> or <strong><q><u>transfer description</u></q></strong> to your transfer:</div>
                    <h5 class="card-title mt-3"><code class="text-white bg-danger pt-1 pb-1 pl-4 pr-4"><b>{{ transfer.details.description }}</b></code></h5>
                  </div>
                  <button @click="sendByMail()" class="btn btn-primary btn-block mt-3 mb-0">
                    Send by email  <i class="ml-1 fal fa-envelope-open"></i><i class="fal fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <br /><br />
          <button class="mt-5 btn btn-dark next" @click="cleanup()"><i class="fas fa-undo"></i> Restart (new order)</button>
          <br />&nbsp;
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
import QrcodeVue from 'qrcode.vue'
import VueClipboard from 'vue-clipboard2'
import * as codec from 'xrpl-tagged-address-codec'

VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard)
// Vue.use(VueTelInput)

const endpoint = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:3001/api/' : 'https://api.xrparrot.com/api/'
const captchaThreshold = process.env.NODE_ENV === 'development' ? 0.1 : 0.3

export default {
  name: 'home',
  components: {
    QrcodeVue,
    VueTelInput
  },
  data () {
    return {
      betaApproved: true,
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
      transfer: {},
      sepaQR: false,
      prefilled: false,
      prefilledData: { name: null, network: null, origin: null }
    }
  },
  created () {
  },
  computed: {
    isXaddress () {
      return this.destination === '' || this.destination.trim().match(/^X/)
    },
    qrValue () {
      return `BCD
001
1
SCT
BUNQNL2A
XRParrot
NL39BUNQ2291418335
EUR50
CHAR

${this.transfer.details.description}
XRParrot`
    }
  },
  mounted () {
    this.checkPrefilledDestination()

    if (typeof window.localStorage['betaApproved'] !== 'undefined') {
      this.betaCode = window.localStorage['betaApproved']
    }

    this.loading = false
    this.loadCaptcha()
    if (swal.getState().isOpen) swal.close()

    if (!this.prefilled) {
      if (typeof window.localStorage['destination'] === 'string') {
        const destination = window.localStorage['destination'].split(':')
        this.destination = destination[0]
        if (destination.length > 1) {
          this.tag = destination[1]
          this.tagtoggle = true
        }
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
    checkPrefilledDestination () {
      if (typeof this.$router.currentRoute.params === 'object' && this.$router.currentRoute.params !== null) {
        if (Object.keys(this.$router.currentRoute.params).indexOf('handle') > -1) {
          // http://localhost:8080/refer/417786ddeae02b1fea86ed8af5d8b8c2dffea312/rPEPPER7kfTD9w2To4CQk6UCfuHM9c6GDY/495
          this.prefilled = true
          this.prefilledData.name = this.$router.currentRoute.params.handle
          this.prefilledData.network = this.$router.currentRoute.params.network
          this.prefilledData.origin = this.$router.currentRoute.params.origin
          this.destination = this.$router.currentRoute.params.account
          this.tag = this.$router.currentRoute.params.tag || ''
          this.phonestep = 0
          this.phoneCheck = ''
          this.pageComplete = 0
          this.tagtoggle = this.$router.currentRoute.params.tag !== ''
          this.changePage('destination', 0)
          this.transfer = {}
        }
      }
      if (!this.prefilled) {
        if (typeof window.localStorage['token'] !== 'undefined') {
          const dest = window.localStorage['token']
          delete window.localStorage['token']
          document.location.href = dest
        }
      }
    },
    handleError (e) {
      this.awaiting = false
      swal({ title: 'Oops!', text: `Error. This is not your fault. Will be fixed soon! Sorry!\n\n${(e.message || 'No details...')}`, icon: 'error', buttons: { cancel: `× Close` } }).then(s => {})
    },
    sendByMail () {
      swal({
        title: 'Send info to your email address',
        text: 'Please enter your email address to receive a copy of the transfer information for your own administration.',
        content: 'input',
        icon: false,
        buttons: { cancel: `× Cancel`, confirm: `Send →` }
      }).then(s => {
        // window.console.log(s)
        if (s && s.trim().match(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i)) {
          window.fetch(`${endpoint}mail`, {
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify({ to: s.trim() }),
            headers: { 'Content-Type': 'application/json; charset=utf-8' }
          })
            .then(r => r.json())
            .then(r => {
              window.console.log('Mail sent', r)
              if (r.error) throw new Error(`Backend error, mail could not be sent${r.message && r.message !== '' ? ': ' + r.message : ''}.`)
              swal({
                title: 'Sent!',
                text: 'You should receive an email within a minute. If not, please check your spam folder.',
                icon: 'success',
                buttons: { cancel: `× Close` }
              })
            })
            .catch(this.handleError)
        } else {
          if (s !== null && s !== false) {
            swal({ title: 'Oops!', text: 'Invalid email address.', icon: 'error', buttons: { cancel: `× Close` } }).then(s => {})
          }
        }
      })
    },
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
        .catch(this.handleError)
    },
    cleanup () {
      Object.keys(window.localStorage).forEach(k => {
        delete window.localStorage[k]
      })
      document.location.reload()
    },
    verifySMS () {
      clearTimeout(window.awaitSMSInputTimeout)
      this.awaiting = true
      window.fetch(`${endpoint}finish`, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({ verify: this.phoneCheck.trim() }),
        headers: { 'Content-Type': 'application/json; charset=utf-8' }
      })
        .then(r => r.json())
        .then(r => {
          this.awaiting = false
          if (r.valid) {
            this.phonestep = 0
            this.transfer = r
            // window.console.log('GENERATE TRANSFER DETAILS @ BACKEND, AND MOVE TO CONFIRM')
            this.changePage('confirm', 3)
          } else {
            const text = `Sorry, but your verification code seems to be invalid. Please enter the number that was sent to the phone number you entered.`
            swal({ title: 'Oops!', text: r.msg !== '' ? r.msg : text, closeOnClickOutside: false, closeOnEsc: false, icon: 'error', buttons: { cancel: `× Close` } }).then(s => {
              this.phoneCheck = ''
              this.inputFocus()
            })
          }
        })
        .catch(this.handleError)
    },
    sendSMS () {
      clearTimeout(window.awaitSMSInputTimeout)
      this.awaiting = true
      window.fetch(`${endpoint}phone`, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({ phone: this.phoneNumber.trim() }),
        headers: { 'Content-Type': 'application/json; charset=utf-8' }
      })
        .then(r => r.json())
        .then(r => {
          this.awaiting = false
          if (r.valid || (typeof r.existingNumbers !== 'undefined' && typeof r.parsedNumber !== 'undefined' && r.existingNumbers.indexOf(r.parsedNumber) > -1)) {
            window.localStorage['phone'] = r.parsedNumber
            this.phonestep = 1
            this.inputFocus()
            if (r.verified || false) {
              this.verifySMS()
            } else {
              window.awaitSMSInputTimeout = setTimeout(() => {
                if (this.activePage === 'verify') {
                  swal({ title: 'Well...', text: `You should have received a text message by now. Please check your number (carefully), and try again.`, closeOnClickOutside: false, closeOnEsc: false, icon: 'warning', buttons: { cancel: `OK →` } }).then(s => {
                    this.phonestep = 0
                    this.changePage('verify', 2)
                    this.inputFocus()
                  })
                }
              }, 60 * 1000)
            }
          } else {
            const text = 'The entered phone number seems to be invalid:' + `\n\n${r.error}`
            swal({ title: 'Oops!', text: typeof r.invalidNo !== 'undefined' ? text : r.error, closeOnClickOutside: false, closeOnEsc: false, icon: 'error', buttons: { cancel: `× Close` } }).then(s => {
              this.phonestep = 0
              this.inputFocus()
            })
          }
        })
        .catch(this.handleError)
    },
    checkIBAN () {
      this.awaiting = true
      window.fetch(`${endpoint}iban`, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({ iban: this.iban.trim() }),
        headers: { 'Content-Type': 'application/json; charset=utf-8' }
      })
        .then(r => r.json())
        .then(r => {
          this.awaiting = false
          if (r.valid) {
            window.localStorage['iban'] = r.iban.trim()
            this.changePage('verify', 2)
          } else {
            const text = 'The entered IBAN account number seems to be invalid.'
            swal({ title: 'Oops!', text: text, closeOnClickOutside: false, closeOnEsc: false, icon: 'error', buttons: { cancel: `× Close` } })
          }
        })
        .catch(this.handleError)
    },
    checkDestination () {
      this.awaiting = true
      let destination = this.destination.trim()
      if (this.isXaddress) {
        try {
          const decoded = codec.Decode(destination)
          if (typeof decoded === 'object' && decoded !== null && typeof decoded.account === 'string') {
            destination = decoded.account
            if (decoded.tag !== null) {
              this.tag = decoded.tag + ''
              this.tagtoggle = true
            } else {
              this.tag = ''
              this.tagtoggle = false
            }
          }
        } catch (e) {
          window.console.log(e)
        }
      }

      window.fetch(`${endpoint}xrpl-destination`, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({ account: destination, tag: this.tagtoggle ? this.tag.trim() : null }),
        headers: { 'Content-Type': 'application/json; charset=utf-8' }
      })
        .then(r => r.json())
        .then(r => {
          this.awaiting = false
          if (r.response.valid) {
            const continueValid = async (p) => {
              if (p === null) { // Prev cancel
                return
              }
              let goToNextPage = true
              if (!this.tagtoggle && r.response.incomingTxCountWithTag && r.response.incomingTxCountWithTag > 5) {
                await swal({
                  title: 'Continue without tag?',
                  text: `This destination account received some transactions WITH a destination tag.\n\nAre you sure you want to continue without a tag?`,
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
              if (goToNextPage) {
                this.changePage('iban', 1)
                window.localStorage['destination'] = this.destination + (!this.isXaddress && this.tagtoggle ? ':' + this.tag : '')
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
                className: 'wide',
                title: 'Please confirm account',
                text: `The destination account:\n${this.destination}\n\n... is known as: \n"${r.response.accountNameInfo.name.toUpperCase()}"\n\nShould your XRP be sent here?`,
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
            swal({ title: 'Oops!', text: text, closeOnClickOutside: false, closeOnEsc: false, icon: 'error', buttons: { cancel: `× Close` } })
          }
        })
        .catch(this.handleError)
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
                if (r.response.score < captchaThreshold) {
                  this.isBot = true
                }
                this.removeCaptcha()
                if (r.order && r.transferDetails.details && this.iban !== '' && !this.prefilled && r.transferDetails !== this.destination) {
                  this.transfer = r.transferDetails
                  this.betaApproved = true
                  this.changePage('confirm', 3)
                }
              })
              .catch(this.handleError)
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
    tag () {
      if (this.tag.trim().match(/[0-9]/)) {
        this.tagtoggle = true
      } else {
        this.tagtoggle = false
      }
    },
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
  div.swal-modal {
    &.wide {
      width: 520px;
      max-width: 90%;
    }
  }
  .vue-tel-input, .phonenumber { background-color: #fff !important; }
  #getxrp { z-index: 99; position: relative; }
  .clb {
    cursor: pointer;
    &:hover {
      &::before {
        position: absolute;
        float: left;
        margin-left: -20px;
        margin-top: -1px;
        content: "\f0c5";
        font-family: 'Font Awesome 5 Pro';
        font-weight: 400;
      }
    }
    &:active {
      &::before {
        position: absolute;
        float: left;
        margin-left: -20px;
        margin-top: -1px;
        content: "\f00c";
        font-family: 'Font Awesome 5 Pro';
        font-weight: 400;
      }
    }
  }
</style>

<style lang="scss" scoped>
  .xaddress {
    width: 715px;
    max-width: 100%;
  }
  .invisible {
    visibility: hidden;
  }

  div.card {
    .btn-qr {
      margin-bottom: 0;
      padding-bottom: 0;
      button {
        &.btn {
          font-size: 1.4em !important;
          margin-bottom: 8px !important;
          padding-top: 0px !important;
          padding-bottom: 0px !important;
          padding-left: 10px !important;
          padding-right: 10px !important;
          border-radius: 3px !important;
        }
      }
    }
  }

  div.tag {
    ul.tg-list {
      display: none !important;
    }
    input {
      padding-left: 20px;
      cursor: pointer;
      &:focus {
        cursor: default;
      }
    }
  }

  span[disabled] {
    cursor: default;
    pointer-events: none;
  }

  .uppercase { text-transform: uppercase }

  @keyframes yourAnimation {
    0% { background-color: rgba(241,84,86, .2); }
    100% { background-color: transparent; }
  }
  @-webkit-keyframes yourAnimation {
    0% { background-color: rgba(241,84,86, .2); }
    100% { background-color: transparent; }
  }
  @-moz-keyframes yourAnimation {
    0% { background-color: rgba(241,84,86, .2); }
    100% { background-color: transparent; }
  }

  #transfernote, .transfernote>code {
    -webkit-animation: yourAnimation 0.8s infinite 1s ease-in;
    -moz-animation: yourAnimation 0.8s infinite 1s ease-in;
    animation: yourAnimation 0.8s infinite 1s ease-in;
    code {
      border-radius: 4px;
    }
  }
</style>
