# Component Guidelines

Documentation for Aurora Nexus design system components.

## Overview

This project uses **shadcn/ui** as the base component library, with custom variants defined in `frontend/src/lib/component-variants.ts` for consistent styling across all projects.

## Component Philosophy

1. **Build on shadcn/ui** - Start with shadcn/ui components for accessibility and best practices
2. **Customize with variants** - Use cva (class-variance-authority) for type-safe variants
3. **Follow design tokens** - All styling uses design tokens from `design-tokens.ts`
4. **Accessibility first** - WCAG 2.1 AA compliance minimum
5. **Mobile responsive** - Mobile-first approach for all components

## Core Components

### Buttons

**Location**: `frontend/src/components/ui/button.tsx`

**Variants**: default, destructive, outline, secondary, ghost, link, success, warning

**Sizes**: default, sm, lg, icon

**Usage**:
```tsx
import { Button } from "@/components/ui/button";

<Button variant="default">Primary Action</Button>
<Button variant="outline" size="sm">Secondary</Button>
<Button variant="destructive">Delete</Button>
```

**Accessibility**:
- Always include descriptive text (not just icons)
- Use proper type="button" or type="submit"
- Include disabled state when appropriate

---

### Cards

**Location**: `frontend/src/components/ui/card.tsx`

**Components**: Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter

**Usage**:
```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content here
  </CardContent>
</Card>
```

---

### Forms

**Components**: Input, Label, Select, Checkbox, Radio, Textarea

**Location**: `frontend/src/components/ui/`

**Best Practices**:
- Always pair inputs with labels using htmlFor/id
- Include helper text when needed
- Show validation errors clearly
- Support keyboard navigation

**Example**:
```tsx
<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" />
  <p className="text-sm text-muted-foreground">Helper text</p>
</div>
```

---

### Data Display

**Tables**: `frontend/src/components/ui/table.tsx`
**Badges**: `frontend/src/components/ui/badge.tsx`
**Alerts**: `frontend/src/components/ui/alert.tsx`

---

## Component Checklist

When creating or modifying components:

- [ ] Uses shadcn/ui base component when available
- [ ] Applies design tokens (no hardcoded values)
- [ ] Includes all necessary states (hover, focus, disabled, loading)
- [ ] Responsive on mobile, tablet, desktop
- [ ] Accessible (keyboard nav, screen reader, ARIA)
- [ ] Includes TypeScript types
- [ ] Loading and error states handled
- [ ] Follows existing patterns in `.claude/patterns/frontend-patterns.md`

## Adding New Components

1. Check if shadcn/ui has the component: `npx shadcn-ui@latest add [component]`
2. If custom, create in appropriate directory under `frontend/src/components/`
3. Define variants in `frontend/src/lib/component-variants.ts` if reusable
4. Use design tokens from `frontend/src/lib/design-tokens.ts`
5. Add TypeScript types
6. Write component tests
7. Document in this file

## Resources

- shadcn/ui components: https://ui.shadcn.com
- Radix UI (underlying): https://www.radix-ui.com
- Design tokens: `frontend/src/lib/design-tokens.ts`
- Component variants: `frontend/src/lib/component-variants.ts`
- Frontend patterns: `.claude/patterns/frontend-patterns.md`
