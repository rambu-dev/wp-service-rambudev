import { z } from 'zod'

export const contactServices = [
  'Custom Plugin',
  'Theme Work',
  'Maintenance',
  'Emergency Fix',
  'Other',
] as const

export const budgetRanges = [
  'Under $500',
  '$500 – $2,000',
  '$2,000 – $5,000',
  '$5,000+',
  'Not sure yet',
] as const

export const contactMethods = ['Email', 'Video call', 'Phone'] as const

export const contactFormSchema = z.object({
  name: z.string().trim()
    .min(2, 'Please enter your name.')
    .max(100, 'Name must be 100 characters or fewer.'),
  email: z.string().trim()
    .min(1, 'Please enter your email.')
    .max(254, 'Email must be 254 characters or fewer.')
    .email('Please enter a valid email.'),
  website: z.string().trim()
    .max(2_048, 'Website URL must be 2,048 characters or fewer.')
    .url('Please enter a full URL, e.g. https://example.com')
    .or(z.literal('')),
  service: z.enum(contactServices, { error: 'Please choose a valid service.' }),
  details: z.string().trim()
    .min(20, 'Please share a little more detail (20 characters minimum).')
    .max(2_000, 'Project details must be 2,000 characters or fewer.'),
  budget: z.enum(budgetRanges, { error: 'Please choose a valid budget range.' }),
  contact: z.enum(contactMethods, { error: 'Please choose a valid contact method.' }),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>
