import { useEffect, useRef, useState } from 'react'
import { RotateCcw, Send, Sparkles } from 'lucide-react'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import { advisorQuestions, advisorResponses, matchAdvisorQuestion } from '../../data/mock'

const GREETING = {
  id: 'greeting',
  role: 'advisor',
  content: {
    summary: 'Hi, I am the CloudFlow Advisor. Ask me about the demo data below, or pick a suggested question.',
    points: [],
    next: '',
    sources: [],
  },
}

function LoadingDots() {
  return (
    <div className="flex items-center gap-1.5 px-1 py-2" role="status" aria-label="Advisor is thinking">
      {[0, 1, 2].map((i) => (
        <span key={i} className="h-2 w-2 animate-dot rounded-full bg-flow" style={{ animationDelay: `${i * 0.15}s` }} />
      ))}
    </div>
  )
}

function AdvisorMessage({ content }) {
  return (
    <div className="space-y-3 text-[15px] leading-relaxed">
      <p>{content.summary}</p>
      {content.points.length > 0 && (
        <ul className="space-y-2.5">
          {content.points.map((p) => (
            <li key={p.title} className="rounded-xl border border-line bg-bg/50 px-3.5 py-2.5">
              <span className="block text-sm font-semibold">{p.title}</span>
              <span className="block text-sm text-muted">{p.body}</span>
            </li>
          ))}
        </ul>
      )}
      {content.next && (
        <p>
          <span className="font-semibold">Suggested next step: </span>
          {content.next}
        </p>
      )}
      {content.sources.length > 0 && (
        <p className="flex flex-wrap items-center gap-1.5 text-xs text-faint">
          Based on demo data:
          {content.sources.map((s) => (
            <Badge key={s}>{s}</Badge>
          ))}
        </p>
      )}
    </div>
  )
}

export default function AdvisorChat({ compact = false, useDashboardLabels = false }) {
  const [messages, setMessages] = useState([GREETING])
  const [busy, setBusy] = useState(false)
  const [draft, setDraft] = useState('')
  const scrollRef = useRef(null)
  const timer = useRef(null)
  const nextId = useRef(1)

  useEffect(() => () => clearTimeout(timer.current), [])

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [messages, busy])

  const ask = (text, knownId) => {
    const question = text.trim()
    if (!question || busy) return
    const id = knownId ?? matchAdvisorQuestion(question)
    setMessages((m) => [...m, { id: `u${nextId.current++}`, role: 'user', content: question }])
    setDraft('')
    setBusy(true)
    timer.current = setTimeout(() => {
      setMessages((m) => [...m, { id: `a${nextId.current++}`, role: 'advisor', content: advisorResponses[id] }])
      setBusy(false)
    }, 1300)
  }

  const reset = () => {
    clearTimeout(timer.current)
    setBusy(false)
    setMessages([GREETING])
  }

  const onSubmit = (e) => {
    e.preventDefault()
    ask(draft)
  }

  return (
    <div className="metal flex h-full flex-col rounded-xl border border-line bg-surface">
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-lg border border-line bg-raised text-ember">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
          </span>
          <div>
            <h3 className="text-sm font-semibold leading-tight">AI Cloud Advisor</h3>
            <p className="text-xs text-faint">Demo: scripted answers, not live AI</p>
          </div>
        </div>
        <button
          type="button"
          onClick={reset}
          aria-label="Clear conversation"
          className="rounded-lg p-2 text-muted transition hover:bg-raised hover:text-ink"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>

      <div
        ref={scrollRef}
        role="log"
        aria-live="polite"
        aria-label="Conversation with the Advisor"
        className={`flex-1 space-y-4 overflow-y-auto px-4 py-5 ${compact ? 'max-h-[360px] min-h-[260px]' : 'max-h-[520px] min-h-[340px]'}`}
      >
        {messages.map((m) =>
          m.role === 'user' ? (
            <div key={m.id} className="flex justify-end">
              <p className="max-w-[85%] rounded-2xl rounded-br-md bg-raised px-4 py-2.5 text-[15px]">{m.content}</p>
            </div>
          ) : (
            <div key={m.id} className="max-w-[95%] rounded-2xl rounded-bl-md border border-line bg-raised/60 px-4 py-3">
              <AdvisorMessage content={m.content} />
            </div>
          ),
        )}
        {busy && (
          <div className="max-w-[95%] rounded-2xl rounded-bl-md border border-line bg-raised/60 px-4 py-2">
            <LoadingDots />
          </div>
        )}
      </div>

      <div className="space-y-3 border-t border-line p-4">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Suggested questions">
          {advisorQuestions.map((q) => (
            <button
              key={q.id}
              type="button"
              disabled={busy}
              onClick={() => ask(useDashboardLabels ? q.dashboardLabel : q.label, q.id)}
              className="rounded-full border border-line bg-bg/40 px-3 py-1.5 text-left text-xs font-medium text-muted transition hover:border-flow/60 hover:text-ink disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
            >
              {useDashboardLabels ? q.dashboardLabel : q.label}
            </button>
          ))}
        </div>
        <form onSubmit={onSubmit} className="flex gap-2">
          <label htmlFor={compact ? 'advisor-input-compact' : 'advisor-input'} className="sr-only">
            Ask the Advisor a question
          </label>
          <input
            id={compact ? 'advisor-input-compact' : 'advisor-input'}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Ask about the demo data"
            autoComplete="off"
            className="h-11 min-w-0 flex-1 rounded-xl border border-line bg-bg/50 px-4 text-[15px] placeholder:text-faint focus:border-flow focus:outline-none"
          />
          <Button type="submit" aria-label="Send question" disabled={busy || !draft.trim()} className="w-11 shrink-0 px-0">
            <Send className="h-4 w-4" aria-hidden="true" />
          </Button>
        </form>
      </div>
    </div>
  )
}
