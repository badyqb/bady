import { useEffect, useState } from 'react'
import { useAnimationStore } from '@/stores/animation-store'
import { cn } from '@/lib/utils'

export function PreviewPanel() {
  const { frames, isPlaying, fps } = useAnimationStore()
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0)

  useEffect(() => {
    if (!isPlaying || frames.length === 0) return

    const interval = setInterval(() => {
      setCurrentFrameIndex((prev) => (prev + 1) % frames.length)
    }, 1000 / fps)

    return () => clearInterval(interval)
  }, [isPlaying, frames.length, fps])

  const currentFrame = frames[currentFrameIndex]

  if (!currentFrame) return null

  return (
    <div className="flex h-full flex-col items-center justify-center bg-neutral-50 p-8">
      <div className="mb-4 flex items-center gap-2">
        <div
          className={cn(
            'size-2 rounded-full',
            isPlaying ? 'bg-green-500' : 'bg-neutral-300'
          )}
        />
        <span className="text-sm tabular-nums text-neutral-600">
          {isPlaying
            ? `Playing: Frame ${currentFrameIndex + 1} / ${frames.length}`
            : 'Paused'}
        </span>
      </div>

      <div className="inline-block border border-neutral-300 bg-white p-4 shadow-sm">
        <pre className="font-mono text-sm leading-tight tabular-nums">
          {currentFrame.grid.map((row, i) => (
            <div key={i}>{row.join('')}</div>
          ))}
        </pre>
      </div>

      <div className="mt-4 text-xs tabular-nums text-neutral-500">
        {fps} FPS • {currentFrame.duration}ms per frame
      </div>
    </div>
  )
}
