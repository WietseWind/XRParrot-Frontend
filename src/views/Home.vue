<template>
  <div class="container page mt-5 pt-5">
    <div class="d-lg-flex justify-content-around align-items-center text-center visuals">
      <div class="col-4 d-none d-sm-block"><img src="../assets/visual-form.svg" alt="" class="visual" /></div>
      <div class="col-4 d-none d-sm-block"><img src="../assets/visual-iban.svg" alt="" class="visual" /></div>
      <div class="col-4 d-none d-sm-block"><img src="../assets/visual-xrp.svg" alt="" class="visual" /></div>
    </div>
    <div class="d-lg-flex justify-content-around align-items-center text-center headlines">
      <h2 class="col-12 col-lg-4"><b>1</b> Fill Form</h2>
      <h2 class="col-12 col-lg-4"><b>2</b> IBAN Transfer</h2>
      <h2 class="col-12 col-lg-4"><b>3</b> Receive XRP</h2>
    </div>
    <div class="container text-center cta">
      <a href="/sendxrp" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
        <img src="../assets/xrp-icon-white.svg" alt="" /><span>SEND XRP</span>
      </a>
      <p>Converting your FIAT to XRP. All it takes is an IBAN transfer.</p>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <!-- <h5 class="modal-title" id="exampleModalLabel">Modal title</h5> -->
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="list-item" @click="checkLimits = !checkLimits">
              <div class="list-item__checkbox" :class="[{ 'list-item__checkbox--active' : checkLimits }]"></div>
              <div class="list-item__description">
                <p>
                  <strong>Limits</strong> <br>
                  Max €500 / Phone / IBAN / Monthly
                </p>
              </div>
            </div>

            <div class="list-item" @click="checkStranger = !checkStranger">
              <div class="list-item__checkbox" :class="[{ 'list-item__checkbox--active' : checkStranger }]"></div>
              <div class="list-item__description">
                <p>
                  <strong>Stranger</strong> <br>
                  I have not been asked to do so by a stranger
                </p>
              </div>
            </div>

            <div class="list-item" @click="checkAge = !checkAge">
              <div class="list-item__checkbox" :class="[{ 'list-item__checkbox--active' : checkAge }]"></div>
              <div class="list-item__description">
                <p>
                  <strong>18+</strong> <br>
                  I am 18 years old
                </p>
              </div>
            </div>

            <div class="list-item" @click="checkFunds = !checkFunds">
              <div class="list-item__checkbox" :class="[{ 'list-item__checkbox--active' : checkFunds }]"></div>
              <div class="list-item__description">
                <p>
                  <strong>Funds</strong> <br>
                  All my funds are legimate funds
                </p>
              </div>
            </div>

            <div class="list-item" @click="checkRate = !checkRate">
              <div class="list-item__checkbox" :class="[{ 'list-item__checkbox--active' : checkRate }]"></div>
              <div class="list-item__description">
                <p>
                  <strong>Rate</strong> <br>
                  Exchange rate on arivel
                </p>
              </div>
            </div>
            
            <div class="list-item" @click="checkDoubt = !checkDoubt">
              <div class="list-item__checkbox" :class="[{ 'list-item__checkbox--active' : checkDoubt }]"></div>
              <div class="list-item__description">
                <p>
                  <strong>Doubt</strong> <br>
                  When in doubt the money is returned to the IBAN
                </p>
              </div>
            </div>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary btn-block">Ok</button>
          </div>
        </div>
      </div>
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
  created: function() {
  },
  mounted: function() {
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

<style>
  .list-item {
  padding-left: 5rem;
  position: relative;
  margin-bottom: 1.3rem; }
  .list-item .list-item__checkbox {
    width: 2rem;
    height: 2rem;
    background-color: rgba(16, 91, 251, 0.13);
    border-radius: 4px;
    cursor: pointer;
    position: absolute;
    left: 1rem;
    top: 3px;
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
