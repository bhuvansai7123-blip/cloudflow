export default function Card({ as: Tag = 'div', hover = false, className = '', children, ...rest }) {
  return (
    <Tag
      className={`metal metal rounded-2xl border border-line bg-surface ${hover ? 'transition-colors duration-150 hover:border-faint/60' : ''} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}
