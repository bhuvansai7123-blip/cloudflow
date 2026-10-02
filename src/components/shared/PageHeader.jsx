export default function PageHeader({ title, description, children }) {
  return (
    <header className="border-b border-line/70">
      <div className="container-x py-14 sm:py-20">
        <h1 className="max-w-3xl text-[clamp(2.2rem,5vw,3.5rem)] font-semibold leading-[1.05]">{title}</h1>
        {description && <p className="mt-5 max-w-[56ch] text-lg leading-relaxed text-muted">{description}</p>}
        {children}
      </div>
    </header>
  )
}
