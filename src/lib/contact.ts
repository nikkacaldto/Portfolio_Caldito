import { profile } from '@/data/portfolio'

/**
 * Contact submission.
 *
 * Set VITE_CONTACT_ENDPOINT in `.env` to a Formspree endpoint, for example:
 *   VITE_CONTACT_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID
 *
 * Formspree should return 2xx on success. If the variable is unset, submit
 * opens the visitor's mail client addressed to profile.email.
 */

export const ENDPOINT: string = import.meta.env.VITE_CONTACT_ENDPOINT ?? ''
export const RECIPIENT = profile.email

export const MAX_NAME = 80
export const MAX_EMAIL = 254
export const MAX_MESSAGE = 5000

const CTRL_NO_NL = new RegExp('[\\u0000-\\u001F\\u007F]', 'g')
const CTRL_KEEP_NL = new RegExp('[\\u0000-\\u0008\\u000B\\u000C\\u000E-\\u001F\\u007F]', 'g')
const ZERO_WIDTH = new RegExp('[\\u200B-\\u200F\\u202A-\\u202E\\u2060\\uFEFF]', 'g')

export function sanitize(input: string, allowNewlines = false): string {
  const controls = allowNewlines ? CTRL_KEEP_NL : CTRL_NO_NL
  return input.replace(controls, '').replace(ZERO_WIDTH, '')
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export type Lead = {
  name: string
  email: string
  message: string
  /** Honeypot. Empty for a person. */
  website: string
}

export type SubmitResult = { via: 'webhook' } | { via: 'mailto' }

export function readLead(data: FormData): Lead | null {
  const name = sanitize(String(data.get('name') ?? '').trim()).slice(0, MAX_NAME)
  const email = sanitize(String(data.get('email') ?? '').trim()).slice(0, MAX_EMAIL)
  const message = sanitize(String(data.get('message') ?? '').trim(), true).slice(0, MAX_MESSAGE)
  if (!name || !email || !message || !EMAIL_RE.test(email)) return null
  const website = String(data.get('website') ?? '')
  return { name, email, message, website }
}

export class SubmitError extends Error {}

export async function submitLead(lead: Lead): Promise<SubmitResult> {
  if (ENDPOINT) {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: lead.name,
        email: lead.email,
        message: lead.message,
        _gotcha: lead.website,
      }),
    })
    if (!res.ok) {
      const body = await res.json().catch(() => null)
      throw new SubmitError(body?.error || `The server answered ${res.status}.`)
    }
    return { via: 'webhook' }
  }

  const subject = `Portfolio inquiry from ${lead.name}`
  const body = [`Name: ${lead.name}`, `Email: ${lead.email}`, '', lead.message].join('\n')
  window.location.href = `mailto:${encodeURIComponent(RECIPIENT)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  return { via: 'mailto' }
}
