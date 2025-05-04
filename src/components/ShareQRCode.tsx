'use client'

import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'

interface ShareQRCodeProps {
  value: string
}

export default function ShareQRCode({ value }: ShareQRCodeProps) {
  const [copied, setCopied] = useState(false)

  const handleCopyQR = () => {
    const svg = document.getElementById('qr-code-svg') as HTMLElement
    if (!svg) return

    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!
    const img = new Image()

    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(svgBlob)

    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)
      URL.revokeObjectURL(url)

      canvas.toBlob((blob) => {
        if (blob) {
          const item = new ClipboardItem({ 'image/png': blob })
          navigator.clipboard.write([item]).then(() => {
            setCopied(true)
            setTimeout(() => setCopied(false), 1500)
          })
        }
      }, 'image/png')
    }

    img.src = url
  }

  return (
    <div className="flex flex-col items-center gap-2 mt-6">
      <QRCodeSVG id="qr-code-svg" value={value} size={128} />
      <button
        onClick={handleCopyQR}
        className="text-xs text-pink-700 hover:text-pink-900 font-medium"
      >
        {copied ? 'QR Copied!' : 'Copy QR Code'}
      </button>
    </div>
  )
}
