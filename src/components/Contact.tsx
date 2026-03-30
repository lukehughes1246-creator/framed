import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const budgets = ['Under $5k', '$5k – $15k', '$15k – $30k', '$30k+']
const services = ['Brand Film', 'Commercial', 'Documentary', 'Social Content', 'Event Coverage']

interface FieldProps {
  label: string
  fieldKey: string
  type?: string
  placeholder?: string
  value: string
  onChange: (key: string, val: string) => void
}

function Field({ label, fieldKey, type = 'text', placeholder = '', value, onChange }: FieldProps) {
  return (
    <div className="group">
      <label className="block font-sans text-sm tracking-widest2 uppercase text-cream/60 mb-2">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(fieldKey, e.target.value)}
        className="w-full bg-transparent border-b border-cream/30 pb-3 font-sans text-sm text-cream placeholder:text-cream/40 focus:outline-none focus:border-cream/60 transition-colors duration-300"
        required
      />
    </div>
  )
}

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '',
    email: '',
    brand: '',
    budget: '',
    service: '',
    message: '',
  })

  const updateField = (key: string, val: string) =>
    setForm(f => ({ ...f, [key]: val }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSending(true)

    try {
      // ── Wire up your form backend here ───────────────────────────────────
      // Option A — Formspree: replace YOUR_FORM_ID with your Formspree form ID
      //   const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      //     body: JSON.stringify(form),
      //   })
      //   if (!res.ok) throw new Error('Submission failed')
      //
      // Option B — EmailJS: install @emailjs/browser and call emailjs.send(...)
      //
      // Simulated delay for now:
      await new Promise(r => setTimeout(r, 800))
      setSent(true)
    } catch {
      setError('Something went wrong — please try emailing us directly at hello@framed.com.au')
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className="py-20 md:py-32 px-5 sm:px-8 md:px-16 bg-cream">
      <div ref={ref} className="max-w-5xl mx-auto">
        <div className="mb-10 md:mb-16">
          <motion.p
            className="font-sans text-sm tracking-widest3 uppercase text-crimson/60 mb-4"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7 }}
          >
            Contact
          </motion.p>
          <motion.h2
            className="font-display font-light text-ink"
            style={{ fontSize: 'clamp(2.2rem, 7vw, 5.5rem)', lineHeight: 1.0 }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.645, 0.045, 0.355, 1] }}
          >
            Start a<br />
            <span className="italic text-ink/30">conversation.</span>
          </motion.h2>
          <div className="rule mt-6" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.645, 0.045, 0.355, 1] }}
        >
          {sent ? (
            <div className="py-20 text-center">
              <p className="font-display italic text-5xl text-crimson font-light mb-4">Got it.</p>
              <p className="font-sans text-sm text-ink/40 tracking-wider">
                We'll follow up within a day, usually sooner.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-10" noValidate>
              <div
                className="grid md:grid-cols-2 gap-7 md:gap-10"
                style={{
                  backgroundColor: '#4B0507',
                  padding: 'clamp(1.25rem, 5vw, 3rem)',
                  border: '1px solid rgba(75,5,7,0.15)',
                }}
              >
                <Field label="Your Name" fieldKey="name" placeholder="Full name" value={form.name} onChange={updateField} />
                <Field label="Email" fieldKey="email" type="email" placeholder="hello@yourbrand.com" value={form.email} onChange={updateField} />
                <Field label="Brand / Company" fieldKey="brand" placeholder="Brand name" value={form.brand} onChange={updateField} />

                <div>
                  <label className="block font-sans text-sm tracking-widest2 uppercase text-cream/60 mb-2">
                    Estimated Budget
                  </label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {budgets.map(b => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => updateField('budget', b)}
                        className="font-sans text-sm uppercase tracking-widest px-3 py-2 border transition-colors duration-300"
                        style={{
                          borderColor: form.budget === b ? '#F5EFE0' : 'rgba(245,239,224,0.25)',
                          color: form.budget === b ? '#4B0507' : 'rgba(245,239,224,0.65)',
                          backgroundColor: form.budget === b ? '#F5EFE0' : 'transparent',
                        }}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block font-sans text-sm tracking-widest2 uppercase text-cream/60 mb-3">
                    Type of Project
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {services.map(s => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => updateField('service', s)}
                        className="font-sans text-sm uppercase tracking-widest px-4 py-2.5 border transition-colors duration-300"
                        style={{
                          borderColor: form.service === s ? '#F5EFE0' : 'rgba(245,239,224,0.25)',
                          color: form.service === s ? '#4B0507' : 'rgba(245,239,224,0.65)',
                          backgroundColor: form.service === s ? '#F5EFE0' : 'transparent',
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block font-sans text-sm tracking-widest2 uppercase text-cream/60 mb-2">
                    Project brief
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Give us a rough idea of what you're after."
                    value={form.message}
                    onChange={e => updateField('message', e.target.value)}
                    className="w-full bg-transparent border-b border-cream/30 pb-3 font-sans text-sm text-cream placeholder:text-cream/40 focus:outline-none focus:border-cream/60 transition-colors duration-300 resize-none"
                  />
                </div>
              </div>

              {error && (
                <p className="font-sans text-sm text-crimson tracking-wider">{error}</p>
              )}

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <p className="font-sans text-sm text-ink/30 tracking-wider">
                  Usually back within a day.
                </p>
                <button
                  type="submit"
                  disabled={sending}
                  className="group flex items-center gap-3 font-sans text-sm tracking-widest2 uppercase bg-crimson text-cream px-6 py-3 sm:px-8 sm:py-4 hover:bg-crimson-dark transition-colors duration-300 w-full sm:w-auto justify-center sm:justify-start disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {sending ? 'Sending…' : 'Send Inquiry'}
                  {!sending && (
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  )}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
