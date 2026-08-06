import type { ContactFormValues } from '@/lib/contact-schema'

const RESEND_API_URL = 'https://api.resend.com/emails'
const CONTACT_TO_EMAIL = 'vn.nqhung@gmail.com'

function escapeHtml(value: string) {
  return value.replace(
    /[&<>'"]/g,
    (character) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;',
      })[character] ?? character,
  )
}

export async function sendContactEmail(data: ContactFormValues) {
  const apiKey = process.env.RESEND_API_KEY
  const fromEmail = process.env.CONTACT_FROM_EMAIL

  if (!apiKey || !fromEmail) {
    throw new Error('Contact email delivery is not configured.')
  }

  const website = data.website || 'Not provided'
  const subject = `New ${data.service} enquiry from ${data.name}`
  const text = [
    'New project enquiry',
    '',
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Website: ${website}`,
    `Service: ${data.service}`,
    `Budget: ${data.budget}`,
    `Preferred contact: ${data.contact}`,
    '',
    'Project details:',
    data.details,
  ].join('\n')

  const rows = [
    ['Name', data.name],
    ['Email', data.email],
    ['Website', website],
    ['Service', data.service],
    ['Budget', data.budget],
    ['Preferred contact', data.contact],
  ]
    .map(
      ([label, value]) =>
        `<tr><th align="left" style="padding:8px 16px 8px 0">${escapeHtml(label)}</th><td style="padding:8px 0">${escapeHtml(value)}</td></tr>`,
    )
    .join('')

  const response = await fetch(RESEND_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [CONTACT_TO_EMAIL],
      reply_to: data.email,
      subject,
      text,
      html: `
        <h1 style="font-size:20px">New project enquiry</h1>
        <table style="border-collapse:collapse">${rows}</table>
        <h2 style="font-size:16px;margin-top:24px">Project details</h2>
        <p style="white-space:pre-wrap">${escapeHtml(data.details)}</p>
      `,
    }),
    cache: 'no-store',
    signal: AbortSignal.timeout(10_000),
  })

  if (!response.ok) {
    const responseBody = await response.text()
    console.error('[contact] Resend delivery failed', response.status, responseBody)
    throw new Error('Email provider rejected the contact enquiry.')
  }

  const result = (await response.json()) as { id?: string }
  return result.id
}
