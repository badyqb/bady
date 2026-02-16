import { useState } from 'react'
import { useAnimationStore } from './stores/animation-store'
import { Toolbar } from './components/toolbar/Toolbar'
import { AsciiGrid } from './components/canvas/AsciiGrid'
import { Timeline } from './components/timeline/Timeline'
import { PreviewPanel } from './components/panels/PreviewPanel'
import { ExportPanel } from './components/panels/ExportPanel'
import { ToggleGroup, ToggleGroupItem } from './components/ui/toggle-group'

type Tab = 'editor' | 'preview' | 'export'

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('editor')
  const { frames, activeFrameIndex } = useAnimationStore()

  const activeFrame = frames[activeFrameIndex]

  return (
    <div className="flex h-dvh flex-col bg-neutral-50">
      <header className="border-b border-neutral-200 bg-white p-4">
        <h1 className="text-xl font-bold text-balance text-neutral-900">ASCII Animation App</h1>
      </header>

      <div className="flex items-center justify-center border-b border-neutral-200 bg-white p-2">
        <ToggleGroup type="single" value={activeTab} onValueChange={(v) => v && setActiveTab(v as Tab)}>
          <ToggleGroupItem value="editor">Editor</ToggleGroupItem>
          <ToggleGroupItem value="preview">Preview</ToggleGroupItem>
          <ToggleGroupItem value="export">Export</ToggleGroupItem>
        </ToggleGroup>
      </div>

      {activeTab === 'editor' && (
        <>
          <Toolbar />
          <main className="flex-1 overflow-auto p-8">
            {activeFrame && (
              <div className="flex flex-col items-center gap-4">
                <div className="text-sm tabular-nums text-neutral-600">
                  Frame {activeFrameIndex + 1} of {frames.length}
                </div>
                <AsciiGrid frameId={activeFrame.id} grid={activeFrame.grid} editable />
              </div>
            )}
          </main>
        </>
      )}

      {activeTab === 'preview' && (
        <main className="flex-1 overflow-hidden">
          <PreviewPanel />
        </main>
      )}

      {activeTab === 'export' && (
        <main className="flex-1 overflow-hidden">
          <ExportPanel />
        </main>
      )}

      <Timeline />
    </div>
  )
}

export default App
