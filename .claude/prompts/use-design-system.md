# use-design-system

Apply Aurora Nexus design system when creating or modifying UI components.

## Design System Rules

**ALWAYS follow these rules when creating any UI component:**

1. **Read the design system first:**
   - Reference `.claude/context/design-system.md`
   - Use design tokens from `src/lib/design-tokens.ts`
   - Apply variants from `src/lib/component-variants.ts`

2. **Color usage:**
   - Primary color (blue): Only for primary actions, links, and focus states
   - Black/White: Main UI colors (text, backgrounds, cards)
   - Semantic colors: Success (green), Destructive (red), Warning (amber), Info (cyan)
   - NEVER use arbitrary colors - only use design tokens

3. **Typography:**
   - Base font size: 16px (1rem) - NEVER smaller than 14px
   - Use font-semibold (600) for headings
   - Use font-medium (500) for emphasis
   - Use font-normal (400) for body text
   - Line height: 1.5 for body, 1.25 for headings

4. **Spacing:**
   - Use 4px base unit (spacing-1, spacing-2, etc.)
   - Component padding: spacing-4 minimum
   - Section gaps: spacing-6 to spacing-8
   - Page margins: spacing-12 on desktop

5. **Accessibility:**
   - Minimum contrast ratio: 4.5:1 for text
   - Always include focus indicators (ring-2 ring-ring)
   - Pair icons with text labels
   - Include proper ARIA labels
   - Support keyboard navigation

6. **Component patterns:**
   - Use shadcn/ui components as base
   - Apply Aurora variants from component-variants.ts
   - Follow layout patterns from design-system.md
   - Include loading and error states

## Quick Reference

### Common Components

**Button:**
```tsx
import { Button } from "@/components/ui/button";

<Button variant="default" size="default">Primary Action</Button>
<Button variant="outline">Secondary</Button>
<Button variant="destructive">Delete</Button>
<Button variant="ghost" size="sm">Cancel</Button>
```

**Card:**
```tsx
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
  <CardFooter className="border-t pt-6">
    {/* Actions */}
  </CardFooter>
</Card>
```

**Form Input:**
```tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

<div className="space-y-2">
  <Label htmlFor="email">Email Address</Label>
  <Input
    id="email"
    type="email"
    placeholder="name@company.com"
  />
  <p className="text-sm text-muted-foreground">
    Helper text
  </p>
</div>
```

**Status Badge:**
```tsx
import { Badge } from "@/components/ui/badge";

<Badge variant="default">Active</Badge>
<Badge variant="secondary">Pending</Badge>
<Badge variant="destructive">Error</Badge>
<Badge variant="outline">Inactive</Badge>
```

**Data Table:**
```tsx
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Column 1</TableHead>
      <TableHead className="text-right">Actions</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">Data</TableCell>
      <TableCell className="text-right">
        <Button variant="ghost" size="sm">Edit</Button>
      </TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### Responsive Patterns

```tsx
{/* Stack to grid */}
<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
  {/* Cards */}
</div>

{/* Responsive text */}
<h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
  Heading
</h1>

{/* Responsive spacing */}
<div className="px-4 md:px-6 lg:px-8">
  {/* Content */}
</div>

{/* Hide/show */}
<div className="hidden md:block">Desktop only</div>
<div className="md:hidden">Mobile only</div>
```

### Icons with Text

```tsx
import { Plus, Camera } from "lucide-react";

{/* Always pair icons with text */}
<Button>
  <Plus className="mr-2 h-4 w-4" />
  Add Device
</Button>

<div className="flex items-center gap-2">
  <Camera className="h-5 w-5 text-muted-foreground" />
  <span>12 Cameras Active</span>
</div>
```

### Loading States

```tsx
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

{/* Skeleton loading */}
<Card>
  <CardHeader>
    <Skeleton className="h-8 w-[200px]" />
    <Skeleton className="h-4 w-[300px]" />
  </CardHeader>
  <CardContent>
    <Skeleton className="h-[200px] w-full" />
  </CardContent>
</Card>

{/* Button loading */}
<Button disabled>
  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  Loading...
</Button>
```

### Empty States

```tsx
import { Package } from "lucide-react";

<Card>
  <CardContent className="flex flex-col items-center justify-center py-12">
    <Package className="h-12 w-12 text-muted-foreground" />
    <h3 className="mt-4 text-lg font-semibold">No devices found</h3>
    <p className="mt-2 text-sm text-muted-foreground text-center">
      Get started by adding your first device
    </p>
    <Button className="mt-4">
      <Plus className="mr-2 h-4 w-4" />
      Add Device
    </Button>
  </CardContent>
</Card>
```

## Layout Templates

### Dashboard Layout
```tsx
<div className="flex min-h-screen">
  <aside className="w-64 border-r">
    {/* Sidebar navigation */}
  </aside>

  <div className="flex-1">
    <header className="sticky top-0 z-10 border-b bg-background">
      <div className="flex h-16 items-center px-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
      </div>
    </header>

    <main className="p-6">
      {/* Page content */}
    </main>
  </div>
</div>
```

### Form Layout
```tsx
<Card className="max-w-2xl">
  <CardHeader>
    <CardTitle>Form Title</CardTitle>
    <CardDescription>Form description</CardDescription>
  </CardHeader>
  <CardContent>
    <form className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Form fields */}
      </div>
    </form>
  </CardContent>
  <CardFooter className="border-t pt-6">
    <div className="flex gap-4">
      <Button type="submit">Submit</Button>
      <Button variant="outline">Cancel</Button>
    </div>
  </CardFooter>
</Card>
```

### Data Table Layout
```tsx
<Card>
  <CardHeader>
    <div className="flex items-center justify-between">
      <div>
        <CardTitle>Table Title</CardTitle>
        <CardDescription>Description</CardDescription>
      </div>
      <Button>
        <Plus className="mr-2 h-4 w-4" />
        Add Item
      </Button>
    </div>
  </CardHeader>
  <CardContent>
    {/* Filters */}
    <div className="mb-4 flex items-center gap-4">
      <Input
        placeholder="Search..."
        className="max-w-sm"
      />
      <Select>
        {/* Filter options */}
      </Select>
    </div>

    {/* Table */}
    <Table>
      {/* Table content */}
    </Table>

    {/* Pagination */}
    <div className="mt-4 flex items-center justify-between">
      <p className="text-sm text-muted-foreground">
        Showing 1-10 of 45 items
      </p>
      <div className="flex gap-2">
        <Button variant="outline" size="sm">Previous</Button>
        <Button variant="outline" size="sm">Next</Button>
      </div>
    </div>
  </CardContent>
</Card>
```

## Accessibility Checklist

When creating components, verify:

- [ ] Color contrast meets WCAG AA (4.5:1 minimum)
- [ ] All interactive elements are keyboard accessible
- [ ] Focus indicators are visible (ring-2 ring-ring)
- [ ] Form inputs have associated labels (htmlFor + id)
- [ ] Icons have text labels or aria-label
- [ ] Error messages use aria-describedby
- [ ] Modals trap focus and close on Escape
- [ ] Animations respect prefers-reduced-motion

## Common Patterns

### Status with Icon
```tsx
<div className="flex items-center gap-2">
  <div className="h-2 w-2 rounded-full bg-green-500" />
  <span className="text-sm">Online</span>
</div>
```

### Alert/Notification
```tsx
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

<Alert variant="destructive">
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>
    Something went wrong. Please try again.
  </AlertDescription>
</Alert>
```

### Stats Card
```tsx
<Card>
  <CardHeader className="pb-3">
    <CardDescription>Total Devices</CardDescription>
    <CardTitle className="text-3xl">1,284</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="flex items-center gap-2 text-sm text-success">
      <TrendingUp className="h-4 w-4" />
      <span>12% from last month</span>
    </div>
  </CardContent>
</Card>
```

## Workflow

When implementing UI:

1. **Review requirements** - Understand the component purpose
2. **Check design system** - Reference `.claude/context/design-system.md`
3. **Use base components** - Start with shadcn/ui components
4. **Apply tokens** - Use design-tokens.ts for spacing, colors
5. **Add variants** - Use component-variants.ts for consistency
6. **Test accessibility** - Verify keyboard nav and screen readers
7. **Add states** - Include loading, error, empty states
8. **Verify responsive** - Test on mobile, tablet, desktop

## Never Do

❌ Use arbitrary colors outside design system
❌ Use font sizes smaller than 14px
❌ Create custom spacing values (use spacing tokens)
❌ Forget loading/error states
❌ Skip accessibility attributes
❌ Use form elements without labels
❌ Rely on color alone for status
❌ Create components without mobile consideration

## Always Do

✅ Reference design-system.md before coding
✅ Use design tokens for all values
✅ Include proper ARIA labels
✅ Add focus indicators to interactive elements
✅ Pair icons with text labels
✅ Support keyboard navigation
✅ Respect prefers-reduced-motion
✅ Test on multiple screen sizes
✅ Include loading and error states
✅ Follow established layout patterns
