// Converted from terms.html (~/workspace/nextrade-old-html/) - copy,
// sections and classes verbatim.
import PageHero from '../components/PageHero';

export default function Terms() {
  return (
    <>
      <PageHero
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Company' },
          { label: 'Terms of Use' },
        ]}
        title="Terms of Use"
        intro="The terms for using the NexTrade Prime website."
      />

      <section className="section">
        <div className="container">
          <div className="reveal" style={{ maxWidth: 760 }}>
            <h2>A demonstration website</h2>
            <p className="lead" style={{ marginBottom: 16 }}>
              This website is a demonstration front-end. Accounts, balances, deposits, withdrawals
              and trades shown here are simulated. Nothing on this site opens a real trading
              account or moves real money.
            </p>
            <h2>Trading risk</h2>
            <p style={{ marginBottom: 16 }}>
              CFDs are leveraged products and carry a high level of risk to your capital. Prices
              can move against you, and you may lose more than your initial deposit if negative
              balance protection does not apply in your jurisdiction. You should not trade with
              money you cannot afford to lose. Past performance is not a reliable indicator of
              future results.
            </p>
            <h2>Prices and availability</h2>
            <p style={{ marginBottom: 16 }}>
              Market prices on this site are indicative only, sourced from free public data
              providers, and may be delayed or unavailable. Spreads, leverage and account terms
              shown are the demo defaults published on the Accounts page and may change.
            </p>
            <h2>Platform</h2>
            <p style={{ marginBottom: 16 }}>
              Trading on NexTrade Prime accounts is offered on MetaTrader 5, a platform of
              MetaQuotes Ltd. MetaTrader 5 is a third-party product; NexTrade Prime does not own
              it.
            </p>
            <h2>Eligibility</h2>
            <p>
              You must be at least 18 years old (or the age of majority in your jurisdiction) to
              use this website.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
