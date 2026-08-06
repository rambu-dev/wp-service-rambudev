const SITEVERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

type TurnstileResult = {
  success: boolean
  action?: string
  'error-codes'?: string[]
}

export async function verifyTurnstile(token: string) {
  const secretKey = process.env.TURNSTILE_SECRET_KEY

  if (!secretKey || !token || token.length > 2_048) return false

  const body = new FormData()
  body.set('secret', secretKey)
  body.set('response', token)

  try {
    const response = await fetch(SITEVERIFY_URL, {
      method: 'POST',
      body,
      cache: 'no-store',
      signal: AbortSignal.timeout(10_000),
    })
    if (!response.ok) return false

    const result = (await response.json()) as TurnstileResult
    return result.success && result.action === 'contact'
  } catch (error) {
    console.error('[contact] Turnstile verification failed', error)
    return false
  }
}
