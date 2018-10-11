<template>
  <div class="container">
    <div class="col-12 offset-md-3 col-md-6 pt-3">
      <form method="post">
        <div class="form-group">
          <label for="inputName">Name:</label>
          <input type="text" class="form-control form-control-lg" name="inputName" id="inputName" placeholder="Who are you?">
        </div>
        <div class="form-group">
          <label for="inputPhone">Phone:</label>
          <input type="text" class="form-control form-control-lg" name="inputPhone" id="inputPhone" placeholder="How can we call?">
        </div>
        <div class="form-group">
          <label for="inputMail">Mail:</label>
          <input type="text" class="form-control form-control-lg" name="inputMail" id="inputMail" placeholder="How can we send an e-mail?">
        </div>
        <div class="form-group">
          <label for="inputMessage">Message:</label>
          <textarea type="text" class="form-control form-control-lg" name="inputMessage" id="inputMessage" placeholder="How can we help?" rows="5"></textarea>
        </div>
        <div class="form-group text-center">
          <button type="submit" class="btn btn-block btn-primary">Send question</button>
        </div>
      </form>
    </div>
  </div>
</template>
