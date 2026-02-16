import { Pencil, Eraser, PaintBucket } from 'lucide-react'
import { useAnimationStore } from '@/stores/animation-store'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Button } from '@/components/ui/button'
import { CharacterPalette } from './CharacterPalette'

export function Toolbar() {
  const { currentTool, setCurrentTool, frames, activeFrameIndex, clearGrid } =
    useAnimationStore()

  const activeFrame = frames[activeFrameIndex]

  const handleClearGrid = () => {
    if (activeFrame) {
      clearGrid(activeFrame.id)
    }
  }

  return (
    <div className="flex items-center gap-4 border-b border-neutral-200 bg-white p-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-neutral-700">Tool:</span>
        <ToggleGroup
          type="single"
          value={currentTool}
          onValueChange={(value) => {
            if (value) setCurrentTool(value as 'pen' | 'eraser' | 'fill')
          }}
        >
          <ToggleGroupItem value="pen" aria-label="Pen tool">
            <Pencil className="size-4" />
            <span>Pen</span>
          </ToggleGroupItem>
          <ToggleGroupItem value="eraser" aria-label="Eraser tool">
            <Eraser className="size-4" />
            <span>Eraser</span>
          </ToggleGroupItem>
          <ToggleGroupItem value="fill" aria-label="Fill tool">
            <PaintBucket className="size-4" />
            <span>Fill</span>
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="h-6 w-px bg-neutral-200" />

      <CharacterPalette />

      <div className="h-6 w-px bg-neutral-200" />

      <Button variant="outline" size="sm" onClick={handleClearGrid}>
        Clear Grid
      </Button>
    </div>
  )
}
