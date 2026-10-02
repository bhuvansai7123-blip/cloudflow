import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import Button from '../ui/Button'
import { useToast } from '../../context/ToastContext'

const EMPTY = { name: '', email: '', company: '', message: '' }
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(v) {
  const errors = {}
  if (!v.name.trim()) errors.name = 'Enter your name.'
  if (!v.email.trim()) errors.email = 'Enter your email address.'
  else if (!EMAIL.test(v.email.trim())) errors.email = 'Enter a valid email, like name@company.com.'
  if (v.message.trim().length < 10) errors.message = 'Write at least 10 characters so we know how to help.'
  return errors
}

function Field({ id, label, error, optional, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label} {optional && <span className="font-normal text-faint">(optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-bad">
          {error}
        </p>
      )}
    </div>
  )
}

const inputClass = (error) =>
  `w-full rounded-xl border bg-bg/50 px-4 py-3 text-[15px] placeholder:text-faint focus:outline-none ${
    error ? 'border-bad focus:border-bad' : 'border-line focus:border-flow'
  }`

export default function ContactForm() {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const toast = useToast()

  const update = (e) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }))
  }

  const submit = (e) => {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length) {
      toast('Please fix the highlighted fields.', 'error')
      document.querySelector('[aria-invalid="true"]')?.focus()
      return
    }
    setSending(true)
    setTimeout(() => {
      setSending(false)
      setSent(true)
      toast('Message sent. This is a demo, so nothing was actually delivered.', 'success')
    }, 1200)
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-ok/30 bg-ok/10 p-8 text-center" role="status">
        <CheckCircle2 className="mx-auto h-10 w-10 text-ok" aria-hidden="true" />
        <h2 className="mt-4 text-2xl font-semibold">Thanks, {values.name.split(' ')[0]}.</h2>
        <p className="mx-auto mt-2 max-w-sm text-muted">
          In a real product, our team would reply within one business day. This form does not send any data.
        </p>
        <Button
          variant="secondary"
          className="mt-6"
          onClick={() => {
            setValues(EMPTY)
            setSent(false)
          }}
        >
          Send another message
        </Button>
      </div>
    )
  }

  const describe = (id) => (errors[id] ? `${id}-error` : undefined)

  return (
    <form onSubmit={submit} noValidate className="space-y-5 rounded-2xl border border-line bg-surface/70 p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Name" error={errors.name}>
          <input id="name" name="name" autoComplete="name" value={values.name} onChange={update} aria-invalid={Boolean(errors.name)} aria-describedby={describe('name')} className={inputClass(errors.name)} placeholder="Ada Lovelace" />
        </Field>
        <Field id="email" label="Email" error={errors.email}>
          <input id="email" name="email" type="email" autoComplete="email" value={values.email} onChange={update} aria-invalid={Boolean(errors.email)} aria-describedby={describe('email')} className={inputClass(errors.email)} placeholder="ada@company.com" />
        </Field>
      </div>
      <Field id="company" label="Company" optional>
        <input id="company" name="company" autoComplete="organization" value={values.company} onChange={update} className={inputClass()} placeholder="Company name" />
      </Field>
      <Field id="message" label="Message" error={errors.message}>
        <textarea id="message" name="message" rows={5} value={values.message} onChange={update} aria-invalid={Boolean(errors.message)} aria-describedby={describe('message')} className={`${inputClass(errors.message)} resize-y`} placeholder="Tell us about your team and what you want to monitor." />
      </Field>
      <Button type="submit" size="lg" loading={sending} className="w-full sm:w-auto">
        {sending ? 'Sending' : 'Send message'}
      </Button>
    </form>
  )
}
