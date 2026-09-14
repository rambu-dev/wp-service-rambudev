'use client'

import Script from 'next/script'
import { useCallback, useEffect, useRef, useState } from 'react'

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: Record<string, unknown>) => string
      reset: (widgetId: string) => void
      remove: (widgetId: string) => void
    }
  }
}

export function Turnstile({ resetKey }: { resetKey: unknown }) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)
  const [scriptReady, setScriptReady] = useState(false)
  const [error, setError] = useState('')

  const renderWidget = useCallback(() => {
    if (!siteKey || !containerRef.current || !window.turnstile) return

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      action: 'contact',
      theme: 'light',
      size: 'flexible',
      callback: () => setError(''),
      'expired-callback': () =>
        setError('Spam verification expired. Please complete it again.'),
      'timeout-callback': () =>
        setError('Spam verification timed out. Please complete it again.'),
      'error-callback': () => {
        setError('Spam verification could not load. Please disable content blockers or refresh and try again.')
        // Prevent Turnstile from raising an additional uncaught client error.
        return true
      },
    })
  }, [siteKey])

  useEffect(() => {
    if (!scriptReady || widgetIdRef.current) return

    renderWidget()

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current)
        widgetIdRef.current = null
      }
    }
  }, [renderWidget, scriptReady])

  useEffect(() => {
    if (!scriptReady || !widgetIdRef.current || !window.turnstile) return

    setError('')
    window.turnstile.reset(widgetIdRef.current)
  }, [resetKey, scriptReady])

  if (!siteKey) {
    return (
      <p className="text-xs text-destructive">
        Spam protection is not configured.
      </p>
    )
  }

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={() => setScriptReady(true)}
      />
      <div ref={containerRef} className="min-h-[65px]" />
      {error && (
        <p className="mt-2 text-xs text-destructive" role="alert">
          {error}
        </p>
      )}
    </>
  )
}
