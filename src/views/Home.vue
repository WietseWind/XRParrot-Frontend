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
      <a href="/sendxrp" class="btn btn-primary">
          <img src="../assets/xrp-icon-white.svg" alt="" /><span>SEND XRP</span>
      </a>
      <p>Converting your FIAT to XRP. All it takes is an IBAN transfer.</p>
    </div>
  </div>
</template>


<script>
export default {
  name: 'home'
}
</script>

<style>
  /* h1 { color:$primary; } */
</style>
