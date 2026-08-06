'use client'

import Script from 'next/script'
import { useCallback, useEffect, useRef, useState } from 'react'

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: Record<string, unknown>) => string
      remove: (widgetId: string) => void
    }
  }
}

export function Turnstile({ resetKey }: { resetKey: unknown }) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)
  const [scriptReady, setScriptReady] = useState(false)

  const renderWidget = useCallback(() => {
    if (!siteKey || !containerRef.current || !window.turnstile) return

    if (widgetIdRef.current) {
      window.turnstile.remove(widgetIdRef.current)
    }

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      action: 'contact',
      theme: 'light',
      size: 'flexible',
    })
  }, [siteKey])

  useEffect(() => {
    if (scriptReady) renderWidget()

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current)
        widgetIdRef.current = null
      }
    }
  }, [renderWidget, resetKey, scriptReady])

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
    </>
  )
}
