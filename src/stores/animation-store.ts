import { create } from 'zustand'

export type Cell = string

export interface Frame {
  id: string
  name: string
  grid: Cell[][]
  duration: number // ms
}

export type Tool = 'pen' | 'eraser' | 'fill'

interface AnimationState {
  // State
  frames: Frame[]
  activeFrameIndex: number
  gridWidth: number
  gridHeight: number
  currentTool: Tool
  currentChar: string
  isPlaying: boolean
  fps: number

  // Actions
  addFrame: () => void
  deleteFrame: (id: string) => void
  duplicateFrame: (id: string) => void
  setActiveFrame: (index: number) => void
  updateCell: (frameId: string, row: number, col: number, char: string) => void
  fillGrid: (frameId: string, char: string) => void
  clearGrid: (frameId: string) => void
  setCurrentTool: (tool: Tool) => void
  setCurrentChar: (char: string) => void
  setGridSize: (width: number, height: number) => void
  setFrameDuration: (frameId: string, duration: number) => void
  setFps: (fps: number) => void
  togglePlayback: () => void
}

const createEmptyGrid = (width: number, height: number): Cell[][] => {
  return Array(height)
    .fill(null)
    .map(() => Array(width).fill(' '))
}

const createFrame = (width: number, height: number, name?: string): Frame => ({
  id: crypto.randomUUID(),
  name: name || `Frame ${Date.now()}`,
  grid: createEmptyGrid(width, height),
  duration: 100,
})

export const useAnimationStore = create<AnimationState>((set, get) => ({
  // Initial state
  frames: [createFrame(40, 20, 'Frame 1')],
  activeFrameIndex: 0,
  gridWidth: 40,
  gridHeight: 20,
  currentTool: 'pen',
  currentChar: '#',
  isPlaying: false,
  fps: 10,

  // Actions
  addFrame: () => {
    const { frames, gridWidth, gridHeight } = get()
    const newFrame = createFrame(gridWidth, gridHeight, `Frame ${frames.length + 1}`)
    set({ frames: [...frames, newFrame], activeFrameIndex: frames.length })
  },

  deleteFrame: (id: string) => {
    const { frames, activeFrameIndex } = get()
    if (frames.length === 1) return // Keep at least one frame

    const newFrames = frames.filter((f) => f.id !== id)
    const newActiveIndex =
      activeFrameIndex >= newFrames.length ? newFrames.length - 1 : activeFrameIndex

    set({ frames: newFrames, activeFrameIndex: Math.max(0, newActiveIndex) })
  },

  duplicateFrame: (id: string) => {
    const { frames } = get()
    const frame = frames.find((f) => f.id === id)
    if (!frame) return

    const duplicated: Frame = {
      id: crypto.randomUUID(),
      name: `${frame.name} (copy)`,
      grid: frame.grid.map((row) => [...row]),
      duration: frame.duration,
    }

    const index = frames.findIndex((f) => f.id === id)
    const newFrames = [...frames.slice(0, index + 1), duplicated, ...frames.slice(index + 1)]

    set({ frames: newFrames, activeFrameIndex: index + 1 })
  },

  setActiveFrame: (index: number) => {
    set({ activeFrameIndex: index })
  },

  updateCell: (frameId: string, row: number, col: number, char: string) => {
    const { frames } = get()
    const newFrames = frames.map((frame) => {
      if (frame.id !== frameId) return frame

      const newGrid = frame.grid.map((r, i) =>
        i === row ? r.map((c, j) => (j === col ? char : c)) : r
      )

      return { ...frame, grid: newGrid }
    })

    set({ frames: newFrames })
  },

  fillGrid: (frameId: string, char: string) => {
    const { frames } = get()
    const newFrames = frames.map((frame) => {
      if (frame.id !== frameId) return frame
      return {
        ...frame,
        grid: frame.grid.map((row) => row.map(() => char)),
      }
    })
    set({ frames: newFrames })
  },

  clearGrid: (frameId: string) => {
    const { frames } = get()
    const newFrames = frames.map((frame) => {
      if (frame.id !== frameId) return frame
      return {
        ...frame,
        grid: frame.grid.map((row) => row.map(() => ' ')),
      }
    })
    set({ frames: newFrames })
  },

  setCurrentTool: (tool: Tool) => {
    set({ currentTool: tool })
  },

  setCurrentChar: (char: string) => {
    set({ currentChar: char })
  },

  setGridSize: (width: number, height: number) => {
    const { frames } = get()
    const newFrames = frames.map((frame) => ({
      ...frame,
      grid: createEmptyGrid(width, height),
    }))
    set({ frames: newFrames, gridWidth: width, gridHeight: height })
  },

  setFrameDuration: (frameId: string, duration: number) => {
    const { frames } = get()
    const newFrames = frames.map((frame) =>
      frame.id === frameId ? { ...frame, duration } : frame
    )
    set({ frames: newFrames })
  },

  setFps: (fps: number) => {
    set({ fps })
  },

  togglePlayback: () => {
    set({ isPlaying: !get().isPlaying })
  },
}))
