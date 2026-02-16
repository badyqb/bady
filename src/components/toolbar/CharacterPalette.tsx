import { useState } from 'react'
import { useAnimationStore } from '@/stores/animation-store'
import { ASCII_SETS, type CharSetKey } from '@/lib/ascii-chars'
import { cn } from '@/lib/utils'

export function CharacterPalette() {
  const { currentChar, setCurrentChar } = useAnimationStore()
  const [activeSet, setActiveSet] = useState<CharSetKey>('basic')

  const charSet = ASCII_SETS[activeSet]

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-neutral-700">Character:</span>

      <div className="flex items-center gap-1">
        <select
          value={activeSet}
          onChange={(e) => setActiveSet(e.target.value as CharSetKey)}
          className="h-8 border border-neutral-200 bg-white px-2 text-sm shadow-sm hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950"
        >
          {(Object.keys(ASCII_SETS) as CharSetKey[]).map((key) => (
            <option key={key} value={key}>
              {ASCII_SETS[key].name}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-0.5 border border-neutral-200 bg-neutral-50 p-1">
          {charSet.chars.slice(0, 10).map((char) => (
            <button
              key={char}
              onClick={() => setCurrentChar(char)}
              className={cn(
                'size-8 flex items-center justify-center font-mono text-sm tabular-nums',
                'hover:bg-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950',
                currentChar === char && 'bg-white ring-1 ring-neutral-900'
              )}
              type="button"
              aria-label={`Select character ${char === ' ' ? 'space' : char}`}
            >
              {char === ' ' ? '␣' : char}
            </button>
          ))}
        </div>

        <div className="ml-1 flex size-10 items-center justify-center border border-neutral-900 bg-white font-mono text-lg tabular-nums">
          {currentChar === ' ' ? '␣' : currentChar}
        </div>
      </div>
    </div>
  )
}
