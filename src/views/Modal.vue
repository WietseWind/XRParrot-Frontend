<template>
  <!-- Modal -->
  <div class="modal fade" id="getXRPModal" tabindex="-1" role="dialog" aria-labelledby="getXRPModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="getXRPModalLabel">Please read and confirm you agree...</h5>
          <button v-if="$route.name !== 'sendxrp'" type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <button v-if="$route.name === 'sendxrp'" type="button" class="close" onclick="document.location.href = '/'">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <h6 class="text-primary mt-0 pt-0 pb-3 text-center"><i class="fa fa-check"></i> Please check the boxes.</h6>
          <div class="list-item" @click="checkStranger = !checkStranger">
            <div class="list-item__checkbox" :class="[{ 'list-item__checkbox--active' : checkStranger }]"></div>
            <div class="list-item__description">
              <p>
                <strong>You're using this service on your own initiative</strong> <br>
                Please only deposit <span class="text-primary">from</span> and <span class="text-primary">to</span> accounts under your own control. Don't use XRParrot on receiving a request by a 3rd party.
              </p>
            </div>
          </div>

          <div class="list-item" @click="checkLimits = !checkLimits">
            <div class="list-item__checkbox" :class="[{ 'list-item__checkbox--active' : checkLimits }]"></div>
            <div class="list-item__description">
              <p>
                <strong>Limits: exceeding deposits will be returned</strong> <br>
                Max. <span class="text-primary">€2000 per month <b>*</b></span> per unique phone number / IBAN account / Deposit destination.
                <small class="text-muted"><span class="text-primary"><b>*</b></span> Rolling limit, based on your deposits.</small>
              </p>
            </div>
          </div>

          <div class="list-item" @click="checkDataStorage = !checkDataStorage">
            <div class="list-item__checkbox" :class="[{ 'list-item__checkbox--active' : checkDataStorage }]"></div>
            <div class="list-item__description">
              <p>
                <strong>Data retention policy</strong> <br>
                Once you send a deposit to XRParrot, your source IBAN, phone number and destination XRP address will be stored (safely) for five years.
              </p>
            </div>
          </div>

          <div class="list-item" @click="checkAge = !checkAge">
            <div class="list-item__checkbox" :class="[{ 'list-item__checkbox--active' : checkAge }]"></div>
            <div class="list-item__description">
              <p>
                <strong>You are at least 18 years old</strong> <br>
                If you are under <span class="text-primary">18</span> please contact your parent, guardian, or custodian.
              </p>
            </div>
          </div>

          <div class="list-item" @click="checkFunds = !checkFunds">
            <div class="list-item__checkbox" :class="[{ 'list-item__checkbox--active' : checkFunds }]"></div>
            <div class="list-item__description">
              <p>
                <strong>Your funds are legitimately obtained</strong> <br>
                Please only send your own (legitimate) funds.
              </p>
            </div>
          </div>

          <div class="list-item" @click="checkRate = !checkRate">
            <div class="list-item__checkbox" :class="[{ 'list-item__checkbox--active' : checkRate }]"></div>
            <div class="list-item__description">
              <p>
                <strong>The exchange rate is subject to change</strong> <br>
                When your deposit <span class="text-primary">arrives</span> your money will be exchanged for XRP at the best available rate.
              </p>
            </div>
          </div>

          <div class="list-item" @click="checkDoubt = !checkDoubt">
            <div class="list-item__checkbox" :class="[{ 'list-item__checkbox--active' : checkDoubt }]"></div>
            <div class="list-item__description">
              <p>
                <strong>Your deposit may be returned</strong> <br>
                When your deposit exceeds the limits or at uncertainty about the origin of your deposit,
                your funds will be returned to your IBAN account.
              </p>
            </div>
          </div>

          <div class="list-item" @click="checkFees = !checkFees">
            <div class="list-item__checkbox" :class="[{ 'list-item__checkbox--active' : checkFees }]"></div>
            <div class="list-item__description">
              <p>
                <strong>Fees apply</strong> <br>
                After receiving your funds <span class="text-primary">0.5&percnt; with a minimum of €1</span>
                will be charged. The remaining amount will be exchanged and sent to your XRP destination account.
                <br />
                <small class="mt-2">
                  <b>Samples:</b>
                  <br />
                  <code class="text-muted">Deposit: </code><code>&nbsp;€75</code><code class="text-muted">, Fee: </code><code>&nbsp;€75 * 0.5&percnt; <span class="text-muted"> = </span> <span class="text-info">€0.375 (&lt; €1)</span> <span class="text-muted"> = </span></code><code class="text-primary"><b>€1</b></code>
                  <br />
                  <code class="text-muted">Deposit: </code><code>€250</code><code class="text-muted">, Fee: </code><code>€250 * 0.5&percnt; <span class="text-muted"> = </span></code><code class="text-primary"><b>€1.25</b></code>
                </small>
                <br />
                <small class="text-muted">When sending <span class="text-primary">non-EUR</span> funds (like CHF, GBP) <b>our</b> bank also charges a currency conversion fee of <span class="text-primary">1.5&percnt;</span>. <b>Your</b> bank may also charge a fee.</small>
                <small class="text-muted">If you send a non-EUR SWIFT payment instead of a SEPA payment <span class="text-primary">€5</span> will be charged.</small>
              </p>
            </div>
          </div>

          <div class="list-item" @click="checkRegulation = !checkRegulation">
            <div class="list-item__checkbox" :class="[{ 'list-item__checkbox--active' : checkRegulation }]"></div>
            <div class="list-item__description">
              <p>
                <strong>Dutch (NL) law applies</strong> <br>
                  As a Dutch company, XRParrot is governed by Dutch (NL) law. It is your own responsibility to follow those rules and laws in your country of residence and/or country from which you access this site and services.
              </p>
            </div>
          </div>
        </div>
        <div class="modal-footer text-center" v-if="!disabled">
          <button type="button" class="btn btn-primary" @click="checkAndGo()">Continue <i class="fa fa-arrow-right"></i></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modal',
  props: [ 'onAccept' ],
  data () {
    return {
      checkLimits: false,
      checkStranger: false,
      checkAge: false,
      checkFunds: false,
      checkRate: false,
      checkDoubt: false,
      checkFees: false,
      checkDataStorage: false,
      checkRegulation: false
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    checkAndGo () {
      this.onAccept()
      window.jQuery('#getXRPModal').modal('hide')
      setTimeout(x => {
        if (this.$route.name !== 'sendxrp') {
          this.$router.push({ name: 'sendxrp' })
        }
      }, 300)
    }
  },
  computed: {
    disabled () {
      return !this.checkLimits || !this.checkStranger || !this.checkAge || !this.checkFunds || !this.checkRate || !this.checkDoubt || !this.checkFees || !this.checkDataStorage || !this.checkRegulation
    }
  },
  watch: {
    disabled () {
      const top = this.disabled ? 0 : 9999
      this.$nextTick(() => {
        document.querySelector('#getXRPModal').scroll({ top: top, left: 0, behavior: 'smooth' })
      })
    }
  },
  filters: {
  }
}
</script>

<style lang="scss">
  #getXRPModal { z-index: 999999999 }
  .modal-dialog {
    max-width:600px !important;
  }
  button.close { margin:2px 5px 0 0 !important; padding:0.2rem !important; }
  .list-item {
    padding-left: 5rem;
    position: relative;
    // margin-bottom: 1.3rem;
    margin-bottom:0;
    padding:0.5rem 1rem 0.5rem 5rem;
    cursor:pointer;
    border-radius:5px;
    p { margin-bottom:0px; }
    &:hover { background:#e0eaff; }
  }
  .list-item .list-item__checkbox {
    width: 2rem;
    height: 2rem;
    background-color: rgba(16, 91, 251, 0.13);
    border-radius: 4px;
    cursor: pointer;
    position: absolute;
    left: 1rem;
    top: 18px;
    -webkit-box-shadow: 0px 0px 0px 0px #105bfb;
    box-shadow: 0px 0px 0px 0px #105bfb;
    -webkit-transition: -webkit-box-shadow 100ms ease-in-out 50ms;
    transition: -webkit-box-shadow 100ms ease-in-out 50ms;
    -o-transition: box-shadow 100ms ease-in-out 50ms;
    transition: box-shadow 100ms ease-in-out 50ms;
    transition: box-shadow 100ms ease-in-out 50ms, -webkit-box-shadow 100ms ease-in-out 50ms; }
    .list-item .list-item__checkbox:before {
      content: "";
      width: 0px;
      height: 0px;
      position: absolute;
      top: 50%;
      left: 50%;
      -webkit-transform: translate3d(-50%, -50%, 0);
      transform: translate3d(-50%, -50%, 0);
      background: white;
      border-radius: 4px;
      -webkit-transition: all 100ms ease-in-out;
      -o-transition: all 100ms ease-in-out;
      transition: all 100ms ease-in-out; }
    .list-item .list-item__checkbox:after {
      content: "";
      width: 1rem;
      height: 0.5rem;
      position: absolute;
      top: 45%;
      left: 50%;
      -webkit-transform: translate3d(-50%, -50%, 0) rotate(-45deg) scale(0.5);
      transform: translate3d(-50%, -50%, 0) rotate(-45deg) scale(0.5);
      opacity: 0;
      border-bottom: 2px solid #105BFB;
      border-left: 2px solid #105BFB;
      z-index: 10;
      -webkit-transition: all 100ms ease-in-out;
      -o-transition: all 100ms ease-in-out;
      transition: all 100ms ease-in-out; }
    .list-item .list-item__checkbox.list-item__checkbox--active {
      -webkit-box-shadow: 0px 0px 0px 2px #105bfb;
      box-shadow: 0px 0px 0px 2px #105bfb; }
      .list-item .list-item__checkbox.list-item__checkbox--active:before {
        width: 100%;
        height: 100%; }
      .list-item .list-item__checkbox.list-item__checkbox--active:after {
        -webkit-transform: translate3d(-50%, -50%, 0) rotate(-45deg) scale(1);
        transform: translate3d(-50%, -50%, 0) rotate(-45deg) scale(1);
        opacity: 1; }
    .list-item .list-item__checkbox:hover {
      -webkit-box-shadow: 0px 0px 0px 2px #105bfb;
      box-shadow: 0px 0px 0px 2px #105bfb; }
  .list-item .list-item__description ul {
    list-style: none;
    margin-left: 3rem;
    margin-top: 2rem; }
    .list-item .list-item__description ul li {
      position: relative;
      padding-left: 2rem;
      margin-bottom: 0.5rem; }
      .list-item .list-item__description ul li:before {
        content: "";
        width: 8px;
        height: 8px;
        background-color: #105BFB;
        border-radius: 2px;
        position: absolute;
        left: 0;
        top: 50%;
        -webkit-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        transform: translateY(-50%); }
</style>
