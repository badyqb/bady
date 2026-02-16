import { memo, useCallback, useRef } from 'react'
import { cn } from '@/lib/utils'
import { useAnimationStore } from '@/stores/animation-store'

interface AsciiGridProps {
  frameId: string
  grid: string[][]
  editable?: boolean
}

const Cell = memo(
  ({
    char,
    row,
    col,
    onInteract,
  }: {
    char: string
    row: number
    col: number
    onInteract: (row: number, col: number) => void
  }) => {
    return (
      <button
        className={cn(
          'size-6 hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950',
          'flex items-center justify-center font-mono text-sm tabular-nums',
          'border border-neutral-200'
        )}
        onMouseDown={() => onInteract(row, col)}
        onMouseEnter={(e) => {
          if (e.buttons === 1) onInteract(row, col)
        }}
        type="button"
        aria-label={`Cell ${row},${col}: ${char === ' ' ? 'empty' : char}`}
      >
        {char}
      </button>
    )
  }
)

Cell.displayName = 'Cell'

export function AsciiGrid({ frameId, grid, editable = true }: AsciiGridProps) {
  const { currentTool, currentChar, updateCell, fillGrid } = useAnimationStore()
  const gridRef = useRef<HTMLDivElement>(null)

  const handleCellInteract = useCallback(
    (row: number, col: number) => {
      if (!editable) return

      switch (currentTool) {
        case 'pen':
          updateCell(frameId, row, col, currentChar)
          break
        case 'eraser':
          updateCell(frameId, row, col, ' ')
          break
        case 'fill':
          fillGrid(frameId, currentChar)
          break
      }
    },
    [editable, currentTool, currentChar, frameId, updateCell, fillGrid]
  )

  return (
    <div
      ref={gridRef}
      className="inline-block select-none bg-white"
    >
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              char={cell}
              row={rowIndex}
              col={colIndex}
              onInteract={handleCellInteract}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
