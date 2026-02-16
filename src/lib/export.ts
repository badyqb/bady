import type { Frame } from '@/stores/animation-store'

export type ExportFormat = 'text' | 'json' | 'gif-data'

export interface ExportOptions {
  format: ExportFormat
  includeMetadata?: boolean
}

export function exportToText(frames: Frame[]): string {
  return frames
    .map((frame, index) => {
      const header = `=== Frame ${index + 1}: ${frame.name} (${frame.duration}ms) ===\n`
      const content = frame.grid.map((row) => row.join('')).join('\n')
      return header + content
    })
    .join('\n\n')
}

export function exportToJSON(frames: Frame[]): string {
  return JSON.stringify(
    {
      version: '1.0',
      frames: frames.map((frame) => ({
        name: frame.name,
        duration: frame.duration,
        grid: frame.grid,
      })),
    },
    null,
    2
  )
}

export function exportAnimation(frames: Frame[], options: ExportOptions): string {
  switch (options.format) {
    case 'text':
      return exportToText(frames)
    case 'json':
      return exportToJSON(frames)
    case 'gif-data':
      return JSON.stringify({
        format: 'gif-data',
        message: 'GIF export requires server-side rendering',
        frames: frames.length,
      })
    default:
      throw new Error(`Unknown export format: ${options.format}`)
  }
}

export function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

export function copyToClipboard(content: string): Promise<void> {
  return navigator.clipboard.writeText(content)
}
