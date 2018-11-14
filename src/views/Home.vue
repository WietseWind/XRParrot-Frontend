<template>
  <div class="container page mt-5 pt-5">
    <p class="mb-5 text-center">XRParrot, turning your fiat to XRP. All it takes is a SEPA bank transfer 😃</p>
    <div class="d-none d-lg-flex justify-content-center align-items-center text-center visuals">
      <div class="col-12 col-lg-4 d-none d-md-block"><img src="../assets/visual-form.svg" alt="" class="visual" /></div>
      <div class="col-12 col-lg-4 d-none d-md-block"><img src="../assets/visual-iban.svg" alt="" class="visual" /></div>
      <div class="col-12 col-lg-4 d-none d-md-block"><img src="../assets/visual-xrp.svg" alt="" class="visual" /></div>
    </div>
    <div class="d-lg-flex justify-content-center align-items-center text-center headlines">
      <div class="col-12 col-lg-4"><h2><b>1</b> <i class="fa fa-pencil"></i> Enter details</h2></div>
      <div class="col-12 col-lg-4"><h2><b>2</b> <i class="fas fa-paper-plane"></i> Send <span class="text-primary">&euro;</span> to IBAN</h2></div>
      <div class="col-12 col-lg-4"><h2><b>3</b> 🎉 Receive XRP</h2></div>
    </div>
    <div class="container text-center cta">
      <router-link v-if="$parent.getAccepted()" class="btn btn-primary" to="sendxrp">
        <img src="../assets/xrp-icon-white.svg" alt="" /><span>START</span>
      </router-link>
      <a v-else href="#getXRP" class="btn btn-primary" data-toggle="modal" data-target="#getXRPModal">
        <img src="../assets/xrp-icon-white.svg" alt="" /><span>START</span>
      </a>
      <br />&nbsp;
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      loading: true,
      checkLimits: false,
      checkStranger: false,
      checkAge: false,
      checkFunds: false,
      checkRate: false,
      checkDoubt: false
    }
  },
  created () {
  },
  mounted () {
    this.loading = false
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

<style lang="scss">
  div.container.cta {
    a { position: relative; z-index: 99; }
  }
</style>
