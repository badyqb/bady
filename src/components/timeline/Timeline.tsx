import { Plus, Play, Pause } from 'lucide-react'
import { useAnimationStore } from '@/stores/animation-store'
import { Button } from '@/components/ui/button'
import { FrameCard } from './FrameCard'

export function Timeline() {
  const {
    frames,
    activeFrameIndex,
    setActiveFrame,
    addFrame,
    deleteFrame,
    duplicateFrame,
    isPlaying,
    togglePlayback,
  } = useAnimationStore()

  return (
    <div className="border-t border-neutral-200 bg-neutral-50 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-neutral-900">Timeline</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={togglePlayback}
            aria-label={isPlaying ? 'Pause animation' : 'Play animation'}
          >
            {isPlaying ? (
              <>
                <Pause className="size-4" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="size-4" />
                <span>Play</span>
              </>
            )}
          </Button>
          <Button variant="outline" size="sm" onClick={addFrame} aria-label="Add new frame">
            <Plus className="size-4" />
            <span>Add Frame</span>
          </Button>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {frames.map((frame, index) => (
          <FrameCard
            key={frame.id}
            frame={frame}
            index={index}
            isActive={index === activeFrameIndex}
            onClick={() => setActiveFrame(index)}
            onDuplicate={() => duplicateFrame(frame.id)}
            onDelete={() => deleteFrame(frame.id)}
          />
        ))}
      </div>
    </div>
  )
}
