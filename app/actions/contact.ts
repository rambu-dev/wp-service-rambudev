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

export async function submitContactForm(
  _previousState: ContactActionState,
  formData: FormData,
): Promise<ContactActionState> {
  const honeypot = String(formData.get('company') ?? '').trim()
  if (honeypot) return emptyContactState

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
