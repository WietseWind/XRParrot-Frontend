<template>
 <div class="container mt-1 pt-5 page">
    
    <div class="d-lg-flex justify-content-around align-items-center text-center sendnav">
        <div class="col-12 col-lg-3"><span @click="changePage('verify', 0)" class="link verify" :class="[{ 'active' : activePage === 'verify' }]"><b>1</b> Verify phone <i v-if="pageStep > 0 && phoneNumber.length !== 0" class="fa fa-check-circle"></i></span></div>
        <div class="col-12 col-lg-3"><span @click="changePage('iban', 1)" class="link iban" :class="[{ 'active' : activePage === 'iban' }]"><b>2</b> Enter source IBAN <i v-if="pageStep > 1" class="fa fa-check-circle"></i></span></div>
        <div class="col-12 col-lg-3"><span @click="changePage('destination', 2)" class="link destination" :class="[{ 'active' : activePage === 'destination' }]"><b>3</b> Destination <i v-if="pageStep > 2" class="fa fa-check-circle"></i></span></div>
        <div class="col-12 col-lg-3"><span @click="changePage('confirm', 3)" class="link confirm" :class="[{ 'active' : activePage === 'confirm' }]"><b>4</b> Confirm & Transfer <i v-if="pageStep > 3" class="fa fa-check-circle"></i></span></div>
    </div>
    
    <div class="mt-5 pt-5 sendflow">
        <div v-if="activePage === 'verify'" class="innerpage">
        
            <div v-if="phonestep === 0">
                <p class="text-center">Please verify your phone first</p>
                <div class="d-lg-flex justify-content-center align-items-center text-center">
                    <vue-tel-input v-model="phoneNumber" :preferredCountries="prefCountry" placeholder="Phonenumber" class="phonenumber"></vue-tel-input>
                    <button class="btn btn-success sendsms" @click="sendSMS()">Send sms</button>
                </div>
                <div class="nextnav text-center">
                  <button class="btn btn-primary" disabled>NEXT <i class="fa fa-angle-right"></i></button>
                </div>
            </div>
            
            <div v-if="phonestep === 1">
                <p class="text-center">Enter the verification code:</p>
                <div class="d-lg-flex justify-content-center align-items-center text-center">
                    <div class="phonecode">
                      <input type="text" class="form-control form-control-lg" placeholder="12345">
                    </div>
                    <button class="btn btn-light sendsms" @click="phonestep = 0, phoneNumber = ''"><i class="fa fa-redo fa-sm fa-flip-horizontal"></i> Retry</button>
                </div>
                <div class="nextnav text-center">
                  <button class="btn btn-primary next" @click="changePage('iban', 1)">NEXT <i class="fa fa-angle-right"></i></button>
                </div>
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
                  <input type="text" class="form-control form-control-lg" placeholder="Tag" v-model="tag">
                </div>
                <button class="btn btn-primary next" @click="changePage('confirm', 3)">OK</button>
            </div>
        </div>
        <div v-if="activePage === 'confirm'" class="innerpage">
           <p class="text-center">You entered this as the destination:</p>
           <p class="text-center"><b>{{ destination }}</b></p>
           <p class="text-center">And this as the IBAN:</p>
           <p class="text-center"><b>{{ iban }}</b></p>
        </div>
    </div>
</div>
</template>

<script>
import 'vue-tel-input/dist/vue-tel-input.css';
export default {
  name: 'home',
  data () {
    return {
      loading: true,
      pageStep: 0,
      activePage: 'verify',
      phonestep: 0,
      phoneNumber: '',
      prefCountry: ['nl'],
      destination: '',
      tag: '',
      iban: ''
    }
  },
  created: function() {
  },
  mounted: function() {
    this.loading = false
  },
  methods: {
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

