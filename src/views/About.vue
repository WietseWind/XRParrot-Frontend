<template>
  <div class="about container mt-1 pt-5 page">
    <h3>About XRParrot</h3>
    <p>
      XRParrot is a service by <a href="https://twitter.com/WietseWind" target="_blank">@WietseWind</a>. Wietse is a big XRP enthusiast (he loves the tech.) and the creator of
      the <a href="https://xrptipbot.com" target="_blank">XRP Tip Bot</a>. He created XRParrot to make it easier for people in Europe (with a IBAN bank account)
      to acquire some XRP.
    </p>
    <p>
      <a href="https://twitter.com/WietseWind" target="_blank">@WietseWind</a> doesn't make money with XRParrot; the (low) transaction costs
      are used to cover hosting, banking and text message costs. Of course XRParrot is registered as an official business in
      The Netherlands.
    </p>
    <p>
      For the conversion of EUR to XRP, XRParrot uses the on-ledger decentralized exchange. The Gatehub EUR IOU order book will be used (with permission Gatehub of course).
    </p>
    <p>
      Want to learn more?
      <router-link class="" to="faq">Read the FAQ</router-link>
      or
      <router-link class="" to="support">Ask a question (Support)</router-link>.
    </p>
    <div class="pt-3">
      <table class="mt-4 table table-condensed">
        <tbody>
          <tr>
            <td width="300">Company name</td>
            <td>XRParrot (registered trade name, legal entity: <q>Nodum B.V.</q>)</td>
          </tr>
          <tr>
            <td>Chamber of Commerce no. (NL)</td>
            <td><a href="https://www.kvk.nl/zoeken/?source=all&q=64731537" target="_blank">64731537</a></td>
          </tr>
          <tr>
            <td>Phone (SMS Text message only)</td>
            <td>+44 74275 1337 4<br /><small>Only plain old SMS Text messages supported, messages sent with WhatsApp, etc. will not arrive!</small></td>
          </tr>
          <tr>
            <td>E-mail</td>
            <td>support<span>&commat;</span>xrparrot.com</td>
          </tr>
          <tr>
            <td>EU VAT no.</td>
            <td>NL855805614B01</td>
          </tr>
          <tr>
            <td>Address</td>
            <td>Tolweg 5, 3741LM Baarn, The Netherlands</td>
          </tr>
        </tbody>
        <tfoot><tr><th colspan="100"></th></tr></tfoot>
      </table>
    </div>
    <p class="alert alert-warning text-center">
      <i class="fa fa-exclamation-triangle"></i> When you use XRParrot, the details you enter (phone number, payout XRP account, IBAN bank accout) will
      be stored in the XRParrot database for at least 5 (five) years.
      In response to a duly justified request, XRParrot shall provide your information to the official authorities.
    </p>
    <br />&nbsp;
  </div>
</template>
