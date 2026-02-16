import { Copy, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Frame } from '@/stores/animation-store'

interface FrameCardProps {
  frame: Frame
  index: number
  isActive: boolean
  onClick: () => void
  onDuplicate: () => void
  onDelete: () => void
}

export function FrameCard({
  frame,
  index,
  isActive,
  onClick,
  onDuplicate,
  onDelete,
}: FrameCardProps) {
  return (
    <div
      className={cn(
        'flex min-w-32 flex-col gap-2 border bg-white p-3 shadow-sm',
        isActive ? 'border-neutral-900 ring-1 ring-neutral-900' : 'border-neutral-200'
      )}
    >
      <button
        onClick={onClick}
        className="flex flex-col gap-1 text-left focus-visible:outline-none"
        type="button"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium tabular-nums text-neutral-900">
            Frame {index + 1}
          </span>
          <span className="text-xs tabular-nums text-neutral-500">{frame.duration}ms</span>
        </div>

        <div className="h-16 overflow-hidden border border-neutral-200 bg-neutral-50 font-mono text-[2px] leading-none">
          {frame.grid.slice(0, 10).map((row, i) => (
            <div key={i}>{row.join('')}</div>
          ))}
        </div>
      </button>

      <div className="flex gap-1">
        <Button
          variant="outline"
          size="icon"
          className="size-7"
          onClick={onDuplicate}
          aria-label="Duplicate frame"
        >
          <Copy className="size-3" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="size-7"
          onClick={onDelete}
          aria-label="Delete frame"
        >
          <Trash2 className="size-3" />
        </Button>
      </div>
    </div>
  )
}
