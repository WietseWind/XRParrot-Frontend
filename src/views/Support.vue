<template>
  <div class="container">
    <div class="col-6 offset-3">
      <br>
      <br>
      <br>
      <form>
        <div class="form-group">
          <label for="inputName">Name</label>
          <input type="text" class="form-control form-control-lg" id="inputName" placeholder="Please let us know who you are">
        </div>
        <div class="form-group">
          <label for="inputMessage">Message</label>
          <textarea type="text" class="form-control form-control-lg" id="inputMessage" placeholder="Got any questions?" rows="5"></textarea>
        </div>
        <div class="form-group text-center">
          <button type="submit" class="btn btn-primary">Send support question</button>
        </div>
      </form>
    </div>
  </div>
</template>
