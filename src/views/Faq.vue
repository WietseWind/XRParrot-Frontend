<template>
  <div class="container">
    <div class="col-12 faqlist">
        <div class="faq-item">
            <input id="ac-1" type="checkbox" />
            <label class="faq-header" id="faq-1" for="ac-1">
                <h4>Can I reuse my Payment reference (Payment ID)?</h4>
                <i class="fa fa-angle-down"></i>
            </label>
            <div class="faq-body">
                Yes, you can. Your Payment reference (Payment ID) should be added to your
                money transfer description (also called: Payment reference / Payment note / etc.).
                We can identify your payment using this ID. As long as the IBAN account you will be
                sending your funds from, and the destination XRP address (+ tag) are the same,
                you can use this ID over and over again.
            </div>
        </div>
        <div class="faq-item">
            <input id="ac-2" type="checkbox" />
            <label class="faq-header" id="faq-2" for="ac-2">
                <h4>What if I want to change the source IBAN / destination XRP account?</h4>
                <i class="fa fa-angle-down"></i>
            </label>
            <div class="faq-body">
                You can just enter your new details in the order form, to receive a new
                Payment reference (Payment ID) associated with your new source IBAN / destination XRP account.
            </div>
        </div>
        <div class="faq-item">
            <input id="ac-19" type="checkbox" />
            <label class="faq-header" id="faq-19" for="ac-19">
                <h4>Where is the ordered XRP stored?</h4>
                <i class="fa fa-angle-down"></i>
            </label>
            <div class="faq-body">
                The ordered XRP will be sent directly to your destination XRP account after your money arrives at XRParrot.
            </div>
        </div>
        <div class="faq-item">
            <input id="ac-20" type="checkbox" />
            <label class="faq-header" id="faq-20" for="ac-20">
                <h4>How will I know my payment arrived and my XRP is sent?</h4>
                <i class="fa fa-angle-down"></i>
            </label>
            <div class="faq-body">
                When your payment comes in, your money will be immediately converted into XRP. Your XRP will be sent to your
                destination XRP account. You will receive a text message to your phone number with a confirmation and the on-ledger transaction
                hash.
            </div>
        </div>
        <div class="faq-item">
            <input id="ac-18" type="checkbox" />
            <label class="faq-header" id="faq-18" for="ac-18">
                <h4>Can I send automated, scheduled payments?</h4>
                <i class="fa fa-angle-down"></i>
            </label>
            <div class="faq-body">
                Yes! Definitely! You can just configure an automated money transfer with your bank to the XRParrot bank account, with
                your Payment reference (Payment ID).
            </div>
        </div>
        <div class="faq-item">
            <input id="ac-21" type="checkbox" />
            <label class="faq-header" id="faq-21" for="ac-21">
                <h4>How long will you store my data and will it be shared?</h4>
                <i class="fa fa-angle-down"></i>
            </label>
            <div class="faq-body">
                Once you send a deposit to XRParrot, your source IBAN, phone number and destination XRP address will be stored (safely) for five years.
                We will not share your data with third parties. But: your data may be shared <b>upon specific request</b> in case of KYC/AML/law enforcement inquiries with:
                <ul>
                    <li>The bank XRParrot is using to receive EUR deposits</li>
                    <li>The liquidity (XRP) provider</li>
                    <li>Official authorities (finance, law)</li>
                </ul>
            </div>
        </div>
        <div class="faq-item">
            <input id="ac-9" type="checkbox" />
            <label class="faq-header" id="faq-9" for="ac-9">
                <h4>How much does XRParrot cost (what's the fee)?</h4>
                <i class="fa fa-angle-down"></i>
            </label>
            <div class="faq-body">
                After receiving your funds <span class="text-primary">0.5&percnt; with a minimum of €1</span>
                will be charged. The remaining amount will be exchanged and sent to your XRP destination account.
                <br />
                <b>Samples:</b>
                <br />
                <code class="text-muted">Deposit: </code><code>&nbsp;€75</code><code class="text-muted">, Fee: </code><code>&nbsp;€75 * 0.5&percnt; <span class="text-muted"> = </span> <span class="text-info">€0.375 (&lt; €1)</span> <span class="text-muted"> = </span></code><code class="text-primary"><b>€1</b></code>
                <br />
                <code class="text-muted">Deposit: </code><code>€250</code><code class="text-muted">, Fee: </code><code>€250 * 0.5&percnt; <span class="text-muted"> = </span></code><code class="text-primary"><b>€1.25</b></code>
                <br />
                <br />
                <span class="text-muted">When sending <span class="text-primary">non-EUR</span> funds (like CHF, GBP) <b>our</b> bank also charges a currency conversion fee of <span class="text-primary">1.5&percnt;</span>. <b>Your</b> bank may also charge a fee.</span>
            </div>
        </div>
        <div class="faq-item">
            <input id="ac-25" type="checkbox" />
            <label class="faq-header" id="faq-25" for="ac-25">
                <h4>How does the monthly limit work? When does my <q>new month</q> start?</h4>
                <i class="fa fa-angle-down"></i>
            </label>
            <div class="faq-body">
                XRParrot works with a <i>rolling limit</i>, meaning 30 days after a payment the value of that payment becomes available for you to deposit again.
                Imagine sending €500 every week, the fifth week you can deposit €500 again, because your first payment isn't part of your <i>last 30 days rolling limit</i>. Your full €2000 monthly limit will be available 30 days after your last payment.
            </div>
        </div>
        <div class="faq-item">
            <input id="ac-3" type="checkbox" />
            <label class="faq-header" id="faq-3" for="ac-3">
                <h4>What happens if exceed monthly limit?</h4>
                <i class="fa fa-angle-down"></i>
            </label>
            <div class="faq-body">
                Your payment will be completely returned (refunded) to you within one working day, minus the transaction fee.
            </div>
        </div>
        <div class="faq-item">
            <input id="ac-4" type="checkbox" />
            <label class="faq-header" id="faq-4" for="ac-4">
                <h4>What happens if I forget to add the Payment reference (Payment ID) to the deposit?</h4>
                <i class="fa fa-angle-down"></i>
            </label>
            <div class="faq-body">
                Your payment will be completely returned (refunded) to you within one working day, minus the transaction fee.
            </div>
        </div>
        <div class="faq-item">
            <input id="ac-5" type="checkbox" />
            <label class="faq-header" id="faq-5" for="ac-5">
                <h4>What happens if I send from another IBAN?</h4>
                <i class="fa fa-angle-down"></i>
            </label>
            <div class="faq-body">
                Your payment will be completely returned (refunded) to you within one working day, minus the transaction fee.
            </div>
        </div>
        <div class="faq-item">
            <input id="ac-6" type="checkbox" />
            <label class="faq-header" id="faq-6" for="ac-6">
                <h4>When is the EUR-XRP exchange rate set?</h4>
                <i class="fa fa-angle-down"></i>
            </label>
            <div class="faq-body">
                When your money arrives at the XRParrot bank account, your money will be converted to XRP at the on-ledger Gatehub-EUR rate.
            </div>
        </div>
        <div class="faq-item">
            <input id="ac-23" type="checkbox" />
            <label class="faq-header" id="faq-23" for="ac-23">
                <h4>Can I use a currency conversion service (like TransferWise)?</h4>
                <i class="fa fa-angle-down"></i>
            </label>
            <div class="faq-body">
                No, you <b>can't</b>. Services like TransferWise will use a third party bank account that's not in your name. Thus, a deposit using such a service won't work and
                result in a refund.
            </div>
        </div>
        <div class="faq-item">
            <input id="ac-8" type="checkbox" />
            <label class="faq-header" id="faq-8" for="ac-8">
                <h4>Do you perform KYC/AML checks?</h4>
                <i class="fa fa-angle-down"></i>
            </label>
            <div class="faq-body">
                Yes. That's why you need to enter your source IBAN account and verify your phone number during the order process.
                Several automated checks will be performed. If our system has any doubts about your order(s) or the legitimacy of
                your funds, your order will be rejected and your deposit will be returned (refunded) to the sending IBAN account.
            </div>
        </div>
        <div class="faq-item">
            <input id="ac-10" type="checkbox" />
            <label class="faq-header" id="faq-10" for="ac-10">
                <h4>How long does it take for my XRP to arrive?</h4>
                <i class="fa fa-angle-down"></i>
            </label>
            <div class="faq-body">
                Normally: between 4 working day hours and one working day, depending on the speed of your bank and the bank XRParrot is using.
            </div>
        </div>
        <div class="faq-item">
            <input id="ac-11" type="checkbox" />
            <label class="faq-header" id="faq-11" for="ac-11">
                <h4>Where can the XRP be sent to? My wallet? Ledger? XRP Tip Bot?</h4>
                <i class="fa fa-angle-down"></i>
            </label>
            <div class="faq-body">
                You can send your XRP to any XRP address (with or without Destination tag) you like. Please note: if you are sending
                to an exchange or custodian wallet provider, they may ask you about the origin of the funds. We advise you to
                send your XRP to your own XRP account (wallet), like a paper wallet or hardware wallet.
                Of course you can also deposit to your XRP Tip Bot account using the deposit wallet address and your personal deposit Destination tag.
            </div>
        </div>
        <div class="faq-item">
            <input id="ac-12" type="checkbox" />
            <label class="faq-header" id="faq-12" for="ac-12">
                <h4>Who is behind XRParrot?</h4>
                <i class="fa fa-angle-down"></i>
            </label>
            <div class="faq-body">
                XRP enthousiast <a href="https://twitter.com/WietseWind" target="_blank">Wietse Wind</a> (from The Netherlands). Of course
                XRParrot is a <a href="https://www.kvk.nl/zoeken/?source=all&q=xrparrot" target="_blank">legitimate registered company (link: Dutch Chamber of Commerce)</a>.
            </div>
        </div>
        <div class="faq-item">
            <input id="ac-13" type="checkbox" />
            <label class="faq-header" id="faq-13" for="ac-13">
                <h4>Why does XRParrot exist?</h4>
                <i class="fa fa-angle-down"></i>
            </label>
            <div class="faq-body">
                The XRParrot service exists to make it as easy as possible to purchase relatively low amounts of XRP using the existing SEPA banking system.
                Using XRParrot you can easily setup an automated, scheduled payment to get yourself some XRP. Also, people new to XRP can easily get started
                with platforms like the <a href="https://www.xrptipbot.com/" target="_blank">XRP Tip Bot</a> without having to register at an exchange,
                to deposit, exchange, withdraw, etc. just to get some XRP.
            </div>
        </div>
        <div class="faq-item">
            <input id="ac-14" type="checkbox" />
            <label class="faq-header" id="faq-14" for="ac-14">
                <h4>Why not use an crypto exchange?</h4>
                <i class="fa fa-angle-down"></i>
            </label>
            <div class="faq-body">
                If you already have an activated, verified exchange account, you can of course use your existing account with your exchange to get your XRP.
                XRParrot is meant to service either users new to XRP, without exchange accounts, or users wishing to make it easier to repetitively
                get some XRP.
            </div>
        </div>
        <div class="faq-item">
            <input id="ac-15" type="checkbox" />
            <label class="faq-header" id="faq-15" for="ac-15">
                <h4>What if my bank tells me my Payment reference (Payment ID) is invalid?</h4>
                <i class="fa fa-angle-down"></i>
            </label>
            <div class="faq-body">
                It's probably the dot in the Payment reference. You can just replace the dot with a space.
            </div>
        </div>
        <div class="faq-item">
            <input id="ac-16" type="checkbox" />
            <label class="faq-header" id="faq-16" for="ac-16">
                <h4>Can I send non-EUR payments?</h4>
                <i class="fa fa-angle-down"></i>
            </label>
            <div class="faq-body">
                Yes, but bank exchange fees may apply.
            </div>
        </div>
        <div class="faq-item">
            <input id="ac-17" type="checkbox" />
            <label class="faq-header" id="faq-17" for="ac-17">
                <h4>Will XRParrot launch outside of the EU (SEPA zone)?</h4>
                <i class="fa fa-angle-down"></i>
            </label>
            <div class="faq-body">
                Probably not. <a href="https://twitter.com/WietseWind/status/1061396347847368704" target="_blank">Here's a Tweet by the XRParrot creator</a> explaining why.
            </div>
        </div>
    </div>
</div>
</template>
