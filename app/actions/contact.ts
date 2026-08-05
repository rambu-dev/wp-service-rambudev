'use server'

import { contactFormSchema } from '@/lib/contact-schema'

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

  // This is the server-side processing boundary. Connect email or CRM delivery here later.
  console.info('[contact] New project enquiry received', {
    ...parsed.data,
    receivedAt: new Date().toISOString(),
  })

  return {
    status: 'success',
    message: 'Thanks — your enquiry is on its way. I’ll get back to you shortly.',
    fieldErrors: {},
  }
}
