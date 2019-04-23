<template>
  <div id="getxrp" class="pb-5">
    <div class="container mt-1 pt-5 page" v-if="checking">
      <div class="alert alert-warning text-center pb-5 pt-5">
        <i class="fas fa-spinner-third fa-spin"></i>
        One moment: fetching your deposit data...
      </div>
    </div>
    <div class="container mt-1 pt-5 page" v-if="!checking && !ok">
      <div class="alert alert-danger text-center pb-4 pt-5">
        <i class="fas fa-star-exclamation"></i>
          Oops. Looks like something is wrong.
        <br />
        <small class="text-muted">Ref: <code class="bg-light text-muted pl-1 pr-1">#GCBT19</code></small>
      </div>
    </div>
  </div>
</template>

<script>
const endpoint = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:3001/api/' : 'https://api.xrparrot.com/api/'

export default {
  name: 'home',
  data () {
    return {
      checking: true,
      ok: false
    }
  },
  created () {
    window.fetch(`${endpoint}token`, {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(this.$router.currentRoute.params),
      headers: { 'Content-Type': 'application/json; charset=utf-8' }
    })
      .then(r => r.json())
      .then(r => {
        this.checking = false
        this.ok = typeof r.message === 'string' && r.message.match(/^OK,/)
        // window.localStorage['token'] = document.location.href
        this.$router.push({ name: 'sendxrp', params: r.response })
      })
      .catch(e => {
        window.console.log(e)
      })
  },
  computed: {
  },
  mounted () {
  },
  destroyed () {
  },
  methods: {
  },
  watch: {
  },
  filters: {
  }
}
</script>

<style lang="scss">
</style>

<style lang="scss" scoped>
</style>
