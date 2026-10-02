import { useToast } from '../../context/ToastContext'

/** A link-looking button for pages that do not exist in this demo. It shows a toast instead of a broken route. */
export default function DemoButton({ message = 'This page is not part of the demo.', className = '', children, ...rest }) {
  const toast = useToast()
  return (
    <button type="button" onClick={() => toast(message, 'info')} className={className} {...rest}>
      {children}
    </button>
  )
}
