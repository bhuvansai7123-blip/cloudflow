export default function Section({ id, border = false, tight = false, className = '', children, ...rest }) {
  return (
    <section
      id={id}
      className={`${tight ? 'py-14 sm:py-16' : 'py-20 sm:py-28'} ${border ? 'border-t border-line/70' : ''} ${className}`}
      {...rest}
    >
      <div className="container-x">{children}</div>
    </section>
  )
}

export function SectionHeading({ title, description, align = 'left', className = '', as: Tag = 'h2' }) {
  const alignment = align === 'center' ? 'mx-auto text-center' : ''
  return (
    <div className={`mb-10 max-w-2xl sm:mb-14 ${alignment} ${className}`}>
      <Tag className="text-[clamp(1.85rem,3.6vw,2.65rem)] font-semibold leading-[1.1]">{title}</Tag>
      {description && <p className="mt-4 max-w-[54ch] text-base leading-relaxed text-muted sm:text-lg">{description}</p>}
    </div>
  )
}
