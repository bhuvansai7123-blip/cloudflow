import Button from '../ui/Button'

export default function FinalCta() {
  return (
    <section className="border-t border-line/70 py-20 sm:py-28">
      <div className="container-x flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-[clamp(2rem,4.4vw,3.4rem)] font-semibold leading-[1.05]">See your cloud clearly before the next incident.</h2>
          <p className="mt-4 text-lg text-muted">Open the demo workspace and ask the Advisor a question. No sign-up, no card.</p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">
          <Button to="/product" size="lg">Start Free</Button>
          <Button to="/contact" variant="secondary" size="lg">Talk to the team</Button>
        </div>
      </div>
    </section>
  )
}
