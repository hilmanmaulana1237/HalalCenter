# UI DEVELOPMENT RULES

## 1. Mandatory UI Library
HeroUI React v3 is the ONLY approved UI component library.
Official documentation: https://heroui.com/en/docs/react/components
All UI development MUST use existing HeroUI components.
Never create a replacement for an existing HeroUI component.

## 2. Documentation-First Development
Before implementing any UI:
1. Inspect the existing project structure.
2. Check the installed HeroUI version.
3. Use HeroUI MCP to inspect available components.
4. Use `list_components` to discover components.
5. Use `get_component_docs` to read the official API, props, composition patterns, and examples.
6. Use `get_component_source_code` when implementation details are necessary.

Never guess component names, props, variants, or APIs.
The official HeroUI documentation and installed package are the source of truth, not model memory.

## 3. Strict No Custom UI Components
DO NOT:
- Create custom Button components.
- Create custom Input components.
- Create custom Card components.
- Create custom Modal or Dialog components.
- Reimplement existing HeroUI components using div elements.
- Build custom dropdowns, tabs, tooltips, or selects.
- Create custom loading skeletons.
- Recreate existing HeroUI styles using arbitrary CSS.
- Install another UI component library without permission.

Instead, import and use the official components directly from `@heroui/react`.
If an equivalent component does not exist in HeroUI, DO NOT invent or implement a replacement. Explain the limitation and ask for approval first.
Page-level components are allowed, but their visual elements must use official HeroUI components.

## 4. Skeleton Component
For loading placeholders, ALWAYS use the official HeroUI Skeleton component.
Documentation: https://heroui.com/en/docs/react/components/skeleton
Example:
```tsx
import { Skeleton } from "@heroui/react";
<Skeleton className="h-6 w-full rounded-lg" />
```

Do not implement loading skeletons using:
- Custom animated divs.
- Handwritten shimmer animations.
- Arbitrary gradient placeholders.
- Custom pulse CSS.

Follow the official Skeleton API and examples.

## 5. Styling Restrictions
- Follow HeroUI's official design system.
- Use HeroUI theme variables.
- Use documented component variants.
- Use Tailwind CSS for layout and responsive positioning.
- Do not override component appearances unnecessarily.
- Do not invent a separate design system.
- Do not introduce arbitrary colors and styling when an existing HeroUI theme token is available.

## 6. Component Import Rules
Use:
```tsx
import { Button, Card, Skeleton, Input } from "@heroui/react";
```

Never create local copies of these components.
Do not mix HeroUI v2 APIs with HeroUI v3.
Always check the project's actual installed package version.

## 7. Implementation Workflow
Before writing UI code:
1. Identify the UI requirements.
2. Find the matching HeroUI components.
3. Read their documentation using MCP.
4. Select appropriate documented variants.
5. Compose the page using those components.
6. Verify imports, props, and TypeScript types.

If documentation cannot be accessed, do not fabricate component APIs or silently create custom alternatives.

## 8. Final Quality Check
Before completing any UI task, verify:
- Every visual primitive uses HeroUI.
- No duplicate custom UI primitives were created.
- No undocumented component props were used.
- No custom Skeleton implementation exists.
- The implementation follows HeroUI's official patterns.
- Existing project architecture has been preserved.

