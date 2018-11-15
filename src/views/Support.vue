<template>
  <div id="getsupport" class="pb-5">
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
    <div class="col-12 offset-md-3 col-md-6 pt-3" v-if="!awaitingCaptcha && !isBot && !sent">
      <div class="form-group text-center">
        <label for="inputName">What's your name?</label>
        <input type="text" class="form-control form-control-lg" name="inputName" v-model="inputName" id="inputName" placeholder="Who are you?">
      </div>
      <div class="form-group text-center">
        <label for="inputMail">What's your e-mail address?</label>
        <input type="text" class="form-control form-control-lg" name="inputMail" v-model="inputMail" id="inputMail" placeholder="How can we send an e-mail?">
      </div>
      <div class="form-group text-center">
        <label for="inputMessage">What's your message or question to us?</label>
        <textarea style="resize: none;" type="text" class="form-control form-control-lg" name="inputMessage" v-model="inputMessage" id="inputMessage" placeholder="How can we help?" rows="5"></textarea>
      </div>
      <div class="form-group text-center">
        <label for="inputMessage">If you have one: what's your Payment reference (Order ID)?</label>
        <input type="text" class="form-control form-control-lg" name="inputOrder" v-model="inputOrder" id="inputOrder" placeholder="Eg.: 1234.ABCD">
      </div>
      <div class="form-group text-center text-center">
        <button @click="send()" :disabled="inputName === '' || inputMail === '' || inputMessage === ''" type="submit" class="btn btn-block btn-primary"><i class="fa fa-paper-plane"></i> Submit</button>
      </div>
    </div>
    <div v-if="sent" class="col-12 offset-md-3 col-md-6 pt-3">
      <div class="alert alert-success text-center">
        <i class="fa fa-check"></i> <strong class="pl-2">Message sent!</strong><br />
        We will get back to you as soon as possible.
      </div>
    </div>
  </div>
</template>

<script>
const endpoint = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:3001/api/' : 'https://api.xrparrot.com/api/'

export default {
  name: 'support',
  data () {
    return {
      sent: false,
      awaitingCaptcha: true,
      isBot: false,
      inputName: '',
      inputMail: '',
      inputMessage: '',
      inputOrder: ''
    }
  },
  created () {},
  mounted () {
    this.loadCaptcha()
  },
  methods: {
    send () {
      this.sent = true
      window.fetch(`${endpoint}support`, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({
          name: this.inputName,
          mail: this.inputMail,
          message: this.inputMessage,
          order: this.inputOrder
        }),
        headers: { 'Content-Type': 'application/json; charset=utf-8' }
      })
        .then(r => r.json())
        .then(r => window.console.log)
        .catch(e => window.console.log)
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
              .catch(this.handleError)
          })
        })
      }
      document.querySelector('body').appendChild(script)
    }
  },
  destroyed () {
    this.removeCaptcha()
  },
  computed: {
  },
  watch: {
  },
  filters: {
  }
}
</script>
