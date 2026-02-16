import { useState } from 'react'
import { Download, Copy, Check } from 'lucide-react'
import { useAnimationStore } from '@/stores/animation-store'
import { Button } from '@/components/ui/button'
import { exportAnimation, downloadFile, copyToClipboard, type ExportFormat } from '@/lib/export'

export function ExportPanel() {
  const { frames } = useAnimationStore()
  const [format, setFormat] = useState<ExportFormat>('text')
  const [copied, setCopied] = useState(false)

  const handleExport = () => {
    const content = exportAnimation(frames, { format })
    const extension = format === 'json' ? 'json' : 'txt'
    const mimeType = format === 'json' ? 'application/json' : 'text/plain'
    downloadFile(content, `animation.${extension}`, mimeType)
  }

  const handleCopy = async () => {
    const content = exportAnimation(frames, { format })
    await copyToClipboard(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const preview = exportAnimation(frames, { format })

  return (
    <div className="flex h-full flex-col p-6">
      <h2 className="mb-4 text-lg font-semibold text-balance text-neutral-900">Export Animation</h2>

      <div className="mb-4 flex items-center gap-4">
        <label className="text-sm font-medium text-neutral-700">Format:</label>
        <select
          value={format}
          onChange={(e) => setFormat(e.target.value as ExportFormat)}
          className="h-9 border border-neutral-200 bg-white px-3 text-sm shadow-sm hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950"
        >
          <option value="text">Plain Text</option>
          <option value="json">JSON</option>
          <option value="gif-data">GIF Data (placeholder)</option>
        </select>
      </div>

      <div className="mb-4 flex gap-2">
        <Button onClick={handleExport} size="sm">
          <Download className="size-4" />
          <span>Download</span>
        </Button>
        <Button variant="outline" onClick={handleCopy} size="sm">
          {copied ? (
            <>
              <Check className="size-4" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="size-4" />
              <span>Copy to Clipboard</span>
            </>
          )}
        </Button>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="rounded border border-neutral-200 bg-neutral-50 p-4">
          <pre className="font-mono text-xs text-pretty leading-relaxed text-neutral-900">
            {preview.slice(0, 2000)}
            {preview.length > 2000 && '\n...(truncated)'}
          </pre>
        </div>
      </div>

      <div className="mt-4 text-xs text-neutral-500">
        {frames.length} frames • {preview.length} characters
      </div>
    </div>
  )
}
