'use server'

import { contactFormSchema } from '@/lib/contact-schema'
import { sendContactEmail } from '@/lib/send-contact-email'

const emptyContactState = {
  status: 'idle' as const,
  message: '',
  fieldErrors: {},
}

export type ContactActionState = {
  status: 'idle' | 'error' | 'success'
  message: string
  fieldErrors: Partial<Record<'name' | 'email' | 'website' | 'service' | 'details' | 'budget' | 'contact', string[]>>
}

const MIN_FORM_COMPLETION_MS = 1_500
const MAX_FORM_COMPLETION_MS = 24 * 60 * 60 * 1_000

function isLikelySpam(formData: FormData) {
  // A hidden field catches bots that indiscriminately fill every input.
  if (String(formData.get('company') ?? '').trim()) return true

  // This is deliberately optional so the form still works when JavaScript is
  // unavailable. When present, it rejects submissions completed implausibly
  // quickly or from an abandoned form.
  const formStartedAt = String(formData.get('formStartedAt') ?? '')
  if (!formStartedAt) return false

  const startedAt = Number(formStartedAt)
  const elapsed = Date.now() - startedAt
  return !Number.isFinite(startedAt) || elapsed < MIN_FORM_COMPLETION_MS || elapsed > MAX_FORM_COMPLETION_MS
}

export async function submitContactForm(
  _previousState: ContactActionState,
  formData: FormData,
): Promise<ContactActionState> {
  if (isLikelySpam(formData)) return emptyContactState

  const parsed = contactFormSchema.safeParse({
    name: String(formData.get('name') ?? ''),
    email: String(formData.get('email') ?? ''),
    website: String(formData.get('website') ?? ''),
    service: String(formData.get('service') ?? ''),
    details: String(formData.get('details') ?? ''),
    budget: String(formData.get('budget') ?? ''),
    contact: String(formData.get('contact') ?? ''),
  })

  if (!parsed.success) {
    return {
      status: 'error',
      message: 'Please review the highlighted fields and try again.',
      fieldErrors: parsed.error.flatten().fieldErrors,
    }
  }

  try {
    const emailId = await sendContactEmail(parsed.data)
    console.info('[contact] Project enquiry delivered', { emailId })
  } catch (error) {
    console.error('[contact] Project enquiry delivery failed', error)
    return {
      status: 'error',
      message: 'Your message could not be sent right now. Please email vn.nqhung@gmail.com directly.',
      fieldErrors: {},
    }
  }

  return {
    status: 'success',
    message: 'Thanks — your enquiry is on its way. I’ll get back to you shortly.',
    fieldErrors: {},
  }
}
