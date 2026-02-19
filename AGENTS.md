# AGENTS.md - Planning Poker

Guidelines for agentic coding agents working in this repository.

## Project Overview
- **Project Name**: Wind Planning Poker
- **Type**: Web Application (Next.js 14+ (App Router) + TypeScript + Vite)
- **Core Functionality**: A planning poker tool for agile estimation sessions

## Build, Lint, and Test Commands

### Development
```bash
npm run dev          # Start development server with HMR
npm run preview      # Preview production build
npm run build        # Build for production (runs TypeScript check + Vite build)
```

### Linting & Type Checking
```bash
npm run lint         # Run ESLint on entire codebase
npm run lint <file> # Lint specific file
npx tsc -b          # Run TypeScript compiler in build mode
npx tsc --noEmit    # Type check without emitting files
```

### Testing
No test framework is configured yet. When adding tests (Vitest/Jest):
```bash
npm test            # Run all tests
npm test -- <file>  # Run single test file
```

## Code Style Guidelines

### General Principles
- Keep components small and focused (single responsibility)
- Prefer functional components with hooks over class components
- Use TypeScript for all new code - avoid `any` types
- Use strict mode (`strict: true` in tsconfig)

### Imports
Order imports consistently:
1. React imports (`react`)
2. External libraries
3. Internal components/hooks/utils
4. Relative imports (local files)
5. Type imports

```typescript
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui'
import { formatDate } from '@/lib/utils'
import type { User } from '@/types'
import { MyComponent } from './MyComponent'
```

**Avoid:** unused imports, barrel file imports, deep relative imports

### Formatting
- Use 2 spaces for indentation
- Use single quotes for JSX strings, double quotes for HTML attributes
- Trailing commas on multiline objects/arrays
- Max line length: 140 characters

### Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Components | PascalCase | `UserCard`, `PlanningPoker` |
| Hooks | camelCase with `use` | `useAuth`, `usePokerSession` |
| Utilities | camelCase | `formatDate`, `calculateScore` |
| Types/Interfaces | PascalCase | `User`, `PokerCard` |
| Constants | SCREAMING_SNAKE_CASE | `MAX_PLAYERS`, `DEFAULT_DECK` |
| Files (components) | PascalCase.tsx | `UserCard.tsx` |
| Files (hooks/utils) | camelCase.ts | `useAuth.ts`, `utils.ts` |

### TypeScript Guidelines
Prefer explicit types for function parameters, return types, state, and props interfaces:

```typescript
interface UserCardProps {
  user: User
  isSelected: boolean
  onSelect: (userId: string) => void
}

function UserCard({ user, isSelected, onSelect }: UserCardProps) {
  // ...
}
```

Use utility types when appropriate: `Partial<T>`, `Readonly<T>`, `Pick<T, K>`

### Error Handling
- Use try/catch for async operations with meaningful error messages
- Create custom error types for domain-specific errors
- Handle errors at component boundaries with error boundaries

```typescript
try {
  const result = await fetchUser(id)
  setUser(result)
} catch (error) {
  if (error instanceof ApiError) {
    setError(`Failed to load user: ${error.message}`)
  } else {
    setError('An unexpected error occurred')
    console.error('Unexpected error:', error)
  }
}
```

### React/Component Guidelines

**Component Structure:**
```typescript
interface Props {}

export function MyComponent({ title }: Props) {
  const [state, setState] = useState<string>('')
  const { data } = useData()

  useEffect(() => {
    // effect logic
  }, [data])

  if (!data) return <Skeleton />

  return (
    <div>
      <h1>{title}</h1>
    </div>
  )
}
```

**Best Practices:**
- Destructure props for clarity
- Keep `useEffect` dependencies exhaustive
- Extract complex logic into custom hooks
- Use `memo`/`useMemo`/`useCallback` judiciously

### CSS/Styling
- Use CSS modules or CSS-in-JS consistently
- Follow BEM naming for CSS classes
- Keep styles co-located with components

### File Organization
```
src/
├── components/       # Reusable UI components
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
├── types/            # TypeScript type definitions
├── pages/            # Page-level components
├── services/         # API/service layers
└── App.tsx           # Root component
```

### Git Conventions
- Use meaningful commit messages
- Keep commits focused and atomic
- Follow conventional commits: `type(scope): message`

### ESLint Rules
Key rules enabled:
- `noUnusedLocals`: Error on unused variables
- `noUnusedParameters`: Error on unused function parameters
- `strict`: Full TypeScript strict mode
- `react-hooks/rules-of-hooks`: Enforce hooks rules
- `react-refresh/only-export-components`: Warn on non-components exports

Run `npm run lint` before committing.
