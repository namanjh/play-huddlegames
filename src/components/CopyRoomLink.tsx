'use client'

import { useState } from 'react'

interface CopyRoomLinkProps {
  link: string
}

export default function CopyRoomLink({ link }: CopyRoomLinkProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="w-full max-w-md text-center mt-4">
      <p className="text-sm font-medium text-gray-700">Share this link with your teammates:</p>
      <div className="relative mt-2">
        <input
          type="text"
          readOnly
          value={link}
          className="w-full rounded-lg border border-pink-300 bg-white/70 px-4 py-2 text-sm text-gray-800 shadow-sm focus:outline-none"
        />
        <button
          type="button"
          onClick={handleCopy}
          className="absolute right-1 top-1/2 -translate-y-1/2 rounded-md bg-pink-200 px-3 py-1 text-xs font-medium text-pink-900 hover:bg-pink-300 transition"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  )
}
