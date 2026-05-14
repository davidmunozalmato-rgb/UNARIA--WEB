'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {}
  }

  return (
    <button
      onClick={handleCopy}
      className={`flex items-center gap-2 text-xs font-bold transition-colors ${copied ? 'text-green-600' : 'text-brand-blue hover:text-brand-blue-dark'}`}
    >
      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      {copied ? 'COPIAT!' : 'COPIAR TEXT'}
    </button>
  )
}
