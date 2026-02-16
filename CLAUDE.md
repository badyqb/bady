# ASCII Animation App - Project Context

## Project Overview
A sleek web-based ASCII animation creator using React + Vite + TypeScript + shadcn/ui. Users can draw ASCII art frame-by-frame, preview animations, and export them.

## Tech Stack
- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui (not a library - components live in `/src/components/ui/`)
- **State Management**: Zustand (lightweight store for animation frames)
- **Key Libraries**: Radix UI primitives (via shadcn)

## Project Structure
```
src/
├── components/
│   ├── ui/                  # shadcn/ui components (auto-generated)
│   ├── canvas/              # ASCII grid and drawing logic
│   ├── toolbar/             # Drawing tools and controls
│   ├── timeline/            # Frame management
│   └── panels/              # Editor/Preview/Export views
├── stores/
│   └── animation-store.ts   # Zustand store
├── lib/
│   ├── utils.ts             # shadcn utils + helpers
│   ├── ascii-chars.ts       # Character sets
│   └── export.ts            # Export functionality
└── main.tsx
```

## Development Workflow

### Adding shadcn/ui Components
```bash
npx shadcn@latest add [component-name]
```
Components are copied into `src/components/ui/` - you have full control to modify them.

### Running the App
```bash
npm run dev        # Start dev server
npm run build      # Production build
npm run preview    # Preview production build
```

### Code Style Preferences
- **Functional components** with hooks (no class components)
- **TypeScript strict mode** - always type props and state
- **Tailwind classes** for styling (no CSS modules)
- **Composition over inheritance** - small, focused components
- **Co-locate state** - use Zustand for global animation state, local useState for UI state

## Key Conventions

### Component Patterns
```tsx
// Preferred pattern for components
interface AsciiGridProps {
  width: number
  height: number
  onCellClick: (row: number, col: number) => void
}

export function AsciiGrid({ width, height, onCellClick }: AsciiGridProps) {
  // Component logic
}
```

### Store Pattern (Zustand)
```ts
// Preferred store structure
interface AnimationState {
  frames: Frame[]
  activeFrameIndex: number
  // ... state

  // Actions as methods
  addFrame: () => void
  deleteFrame: (id: string) => void
  updateCell: (frameId: string, row: number, col: number, char: string) => void
}
```

### File Naming
- Components: `PascalCase.tsx` (e.g., `AsciiGrid.tsx`)
- Utilities: `kebab-case.ts` (e.g., `ascii-chars.ts`)
- Stores: `kebab-case.ts` with descriptive suffix (e.g., `animation-store.ts`)

## Performance Considerations
- **Virtualize large grids** - Only render visible cells if canvas > 100x100
- **Memoize grid cells** - Use `React.memo()` for Cell components
- **Debounce rapid updates** - Mouse drag events on canvas
- **Optimize playback** - Use `requestAnimationFrame` for smooth animations

## Testing Strategy
- **Unit tests**: Utility functions (character sets, export logic)
- **Component tests**: Canvas interactions, toolbar state
- **E2E tests**: Complete flow (draw → animate → export)

## Common Tasks

### Adding a New Drawing Tool
1. Add tool type to `animation-store.ts` union type
2. Add tool button to `Toolbar.tsx` (use ToggleGroup)
3. Implement tool logic in `AsciiGrid.tsx` mouse handlers
4. Add tool icon from `lucide-react`

### Adding a Character Set
1. Define character array in `lib/ascii-chars.ts`
2. Add to character set selector in `CharPalette.tsx`
3. Update type in animation store

### Export Format
1. Implement converter in `lib/export.ts`
2. Add format option to `ExportPanel.tsx`
3. Add download/copy handler

## Dependencies Notes
- **DO NOT** install component libraries (MUI, Ant Design, etc.) - shadcn/ui provides all UI needs
- **DO** keep dependencies minimal - prefer vanilla solutions over heavy libraries
- **Avoid** animation libraries like Framer Motion initially - build custom playback first

## Token Efficiency Tips for Claude
- **Reference this file** instead of re-explaining project structure
- **Use path aliases** (@/components/...) consistently
- **Avoid reading all files** - ask for specific files when needed
- **Trust the plan** - follow the implementation steps in order
- **Batch related changes** - group similar edits together

## Known Issues & TODOs
(This section will be updated as development progresses)

---
*Last updated: 2026-02-16*
