# Aurora Nexus Design System

## Overview
Modern, accessible design system for enterprise security integration software. Designed for security professionals including managers, technicians, and system integrators.

## Brand Identity

### Core Principles
1. **Professional & Trustworthy** - Security software requires user confidence
2. **Clarity Over Decoration** - Information density without cognitive overload
3. **Accessible First** - WCAG 2.1 AA compliance minimum
4. **Performance Focused** - Fast load times, smooth interactions

### Target Users
- Security managers (decision makers, less technical)
- Security technicians (hands-on, technical)
- System integrators (highly technical, power users)
- Operations teams (24/7 monitoring, high-stress environments)

## Color System

### Primary Colors (Black & White Foundation)
```css
/* Neutrals - Main UI */
--background: 0 0% 100%;           /* Pure white backgrounds */
--foreground: 0 0% 3.9%;          /* Near black text */
--card: 0 0% 100%;                /* Card backgrounds */
--card-foreground: 0 0% 3.9%;     /* Card text */
--popover: 0 0% 100%;             /* Popover backgrounds */
--popover-foreground: 0 0% 3.9%;  /* Popover text */
```

### Accent Colors (Blue for Actions)
```css
/* Blue - Primary Actions & Focus */
--primary: 221.2 83.2% 53.3%;     /* Vibrant blue - buttons, links */
--primary-foreground: 210 40% 98%; /* White on blue */

/* Semantic Colors */
--destructive: 0 84.2% 60.2%;     /* Red - danger actions */
--destructive-foreground: 210 40% 98%;

--success: 142 71% 45%;           /* Green - success states */
--warning: 38 92% 50%;            /* Amber - warnings */
--info: 199 89% 48%;              /* Cyan - info */
```

### Grays (Information Hierarchy)
```css
/* Borders & Dividers */
--border: 214.3 31.8% 91.4%;      /* Light gray borders */
--input: 214.3 31.8% 91.4%;       /* Input borders */

/* Backgrounds */
--secondary: 210 40% 96.1%;       /* Light gray backgrounds */
--secondary-foreground: 222.2 47.4% 11.2%; /* Dark text on light */
--muted: 210 40% 96.1%;           /* Muted backgrounds */
--muted-foreground: 215.4 16.3% 46.9%; /* Muted text */
--accent: 210 40% 96.1%;          /* Accent backgrounds */
--accent-foreground: 222.2 47.4% 11.2%; /* Accent text */
```

### Accessibility Requirements
- **Contrast Ratios**:
  - Body text: minimum 4.5:1
  - Large text (18pt+): minimum 3:1
  - UI components: minimum 3:1
- **Never use color alone** - always include icons or text labels
- **Focus indicators**: 2px solid blue outline, 2px offset

## Typography

### Font Stack
```css
--font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
             "Helvetica Neue", Arial, sans-serif;
--font-mono: "JetBrains Mono", "Fira Code", Consolas, Monaco,
             "Courier New", monospace;
```

### Type Scale (Modular Scale: 1.25 - Major Third)
```css
/* Display & Headings */
--text-xs: 0.64rem;    /* 10.24px - Labels, captions */
--text-sm: 0.8rem;     /* 12.8px - Small body, metadata */
--text-base: 1rem;     /* 16px - Body text */
--text-lg: 1.25rem;    /* 20px - H4 */
--text-xl: 1.563rem;   /* 25px - H3 */
--text-2xl: 1.953rem;  /* 31.25px - H2 */
--text-3xl: 2.441rem;  /* 39px - H1 */
--text-4xl: 3.052rem;  /* 48.83px - Display */
```

### Font Weights
```css
--font-normal: 400;    /* Body text */
--font-medium: 500;    /* Subtle emphasis */
--font-semibold: 600;  /* Headings, buttons */
--font-bold: 700;      /* Strong emphasis (use sparingly) */
```

### Line Heights
```css
--leading-none: 1;      /* Headings */
--leading-tight: 1.25;  /* Tight headings */
--leading-snug: 1.375;  /* Subheadings */
--leading-normal: 1.5;  /* Body text */
--leading-relaxed: 1.625; /* Comfortable reading */
--leading-loose: 2;     /* Very relaxed */
```

### Typography Usage
- **H1**: Page titles only, one per page
- **H2**: Major section headings
- **H3**: Subsection headings
- **H4**: Card titles, small headings
- **Body**: 16px base, never smaller than 14px
- **Mono**: Code, technical IDs, logs only

## Spacing System

### Scale (4px base unit)
```css
--spacing-0: 0;
--spacing-1: 0.25rem;  /* 4px - Tight spacing */
--spacing-2: 0.5rem;   /* 8px - Component padding */
--spacing-3: 0.75rem;  /* 12px - Small gaps */
--spacing-4: 1rem;     /* 16px - Default gaps */
--spacing-5: 1.25rem;  /* 20px - Medium gaps */
--spacing-6: 1.5rem;   /* 24px - Large gaps */
--spacing-8: 2rem;     /* 32px - Section spacing */
--spacing-10: 2.5rem;  /* 40px - Large sections */
--spacing-12: 3rem;    /* 48px - Page margins */
--spacing-16: 4rem;    /* 64px - Major sections */
--spacing-20: 5rem;    /* 80px - Hero spacing */
```

### Layout Grid
- **Container max-width**: 1440px
- **Column gap**: 24px (spacing-6)
- **Row gap**: 32px (spacing-8)
- **Page margins**: 48px desktop, 24px tablet, 16px mobile

## Elevation & Shadows

### Shadow Scale (Subtle, Professional)
```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
```

### Usage
- **Cards**: shadow-sm (subtle lift)
- **Modals**: shadow-lg (clear separation)
- **Dropdowns**: shadow-md (floating feel)
- **Sticky headers**: shadow-sm (subtle depth)

## Border Radius

### Scale
```css
--radius-sm: 0.25rem;  /* 4px - Buttons, inputs */
--radius: 0.5rem;      /* 8px - Cards, panels */
--radius-md: 0.75rem;  /* 12px - Large cards */
--radius-lg: 1rem;     /* 16px - Modals */
--radius-full: 9999px; /* Pills, avatars */
```

### Usage Guidelines
- **Buttons/Inputs**: radius-sm (4px) - professional, not playful
- **Cards**: radius (8px) - friendly but serious
- **Modals**: radius-lg (16px) - welcoming dialogs
- **Avatars/Badges**: radius-full - circular

## Component Specifications

### Buttons
```typescript
// Primary Action
<Button
  variant="default"      // Blue background
  size="default"         // h-10 px-4 py-2
  className="font-semibold"
>
  Primary Action
</Button>

// Secondary Action
<Button
  variant="outline"      // Border only
  size="default"
>
  Secondary Action
</Button>

// Destructive Action
<Button
  variant="destructive"  // Red background
  size="default"
>
  Delete
</Button>

// Ghost (Tertiary)
<Button
  variant="ghost"        // No background
  size="sm"
>
  Cancel
</Button>
```

**Button Sizing:**
- sm: h-8 px-3 text-sm (compact interfaces)
- default: h-10 px-4 py-2 (standard)
- lg: h-12 px-8 text-lg (hero CTAs)

### Form Inputs
```typescript
// Text Input
<Input
  type="text"
  placeholder="Enter value..."
  className="h-10"      // Consistent height
/>

// With Label & Helper Text
<div className="space-y-2">
  <Label htmlFor="email">Email Address</Label>
  <Input
    id="email"
    type="email"
    placeholder="name@company.com"
  />
  <p className="text-sm text-muted-foreground">
    We'll never share your email.
  </p>
</div>

// Error State
<div className="space-y-2">
  <Label htmlFor="password">Password</Label>
  <Input
    id="password"
    type="password"
    className="border-destructive focus-visible:ring-destructive"
  />
  <p className="text-sm text-destructive">
    Password must be at least 8 characters.
  </p>
</div>
```

### Cards
```typescript
// Standard Card
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Supporting description</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Main content */}
  </CardContent>
  <CardFooter className="border-t pt-6">
    {/* Actions */}
  </CardFooter>
</Card>

// Interactive Card (hover state)
<Card className="hover:shadow-md transition-shadow cursor-pointer">
  {/* content */}
</Card>
```

### Data Tables
```typescript
// Enterprise Table Pattern
<Table>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">ID</TableHead>
      <TableHead>Name</TableHead>
      <TableHead>Status</TableHead>
      <TableHead className="text-right">Actions</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-mono text-sm">001</TableCell>
      <TableCell className="font-medium">Item Name</TableCell>
      <TableCell>
        <Badge variant="outline">Active</Badge>
      </TableCell>
      <TableCell className="text-right">
        <Button variant="ghost" size="sm">Edit</Button>
      </TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### Navigation
```typescript
// Top Navigation
<nav className="border-b">
  <div className="container flex h-16 items-center px-4">
    <div className="mr-4 flex">
      <Logo />
    </div>
    <div className="flex flex-1 items-center justify-between space-x-2">
      <nav className="flex items-center space-x-6">
        <Link className="text-sm font-medium">Dashboard</Link>
        <Link className="text-sm text-muted-foreground">Devices</Link>
        <Link className="text-sm text-muted-foreground">Reports</Link>
      </nav>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm">
          <Bell className="h-4 w-4" />
        </Button>
        <Avatar />
      </div>
    </div>
  </div>
</nav>

// Sidebar Navigation
<aside className="w-64 border-r bg-muted/40">
  <nav className="space-y-1 p-4">
    <Button
      variant="ghost"
      className="w-full justify-start"
    >
      <Home className="mr-2 h-4 w-4" />
      Dashboard
    </Button>
    {/* More items */}
  </nav>
</aside>
```

### Status Indicators
```typescript
// Badges for Status
<Badge variant="default">Active</Badge>
<Badge variant="secondary">Pending</Badge>
<Badge variant="destructive">Error</Badge>
<Badge variant="outline">Inactive</Badge>

// With Dots
<div className="flex items-center gap-2">
  <div className="h-2 w-2 rounded-full bg-green-500" />
  <span className="text-sm">Online</span>
</div>

<div className="flex items-center gap-2">
  <div className="h-2 w-2 rounded-full bg-red-500" />
  <span className="text-sm">Offline</span>
</div>
```

### Alerts & Notifications
```typescript
// Info Alert
<Alert>
  <Info className="h-4 w-4" />
  <AlertTitle>Information</AlertTitle>
  <AlertDescription>
    Your session will expire in 5 minutes.
  </AlertDescription>
</Alert>

// Error Alert
<Alert variant="destructive">
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>
    Failed to save changes. Please try again.
  </AlertDescription>
</Alert>

// Toast Notification
toast({
  title: "Success",
  description: "Your changes have been saved.",
})

toast({
  variant: "destructive",
  title: "Error",
  description: "Something went wrong.",
})
```

## Layout Patterns

### Dashboard Layout
```typescript
<div className="flex min-h-screen">
  {/* Sidebar */}
  <aside className="w-64 border-r">
    {/* Navigation */}
  </aside>

  {/* Main Content */}
  <div className="flex-1">
    {/* Header */}
    <header className="sticky top-0 z-10 border-b bg-background">
      <div className="flex h-16 items-center px-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
      </div>
    </header>

    {/* Page Content */}
    <main className="p-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Stat cards */}
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {/* Charts, tables */}
      </div>
    </main>
  </div>
</div>
```

### Form Layout
```typescript
<Card className="max-w-2xl">
  <CardHeader>
    <CardTitle>Create Device</CardTitle>
    <CardDescription>
      Add a new device to your security system
    </CardDescription>
  </CardHeader>
  <CardContent>
    <form className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Device Name</Label>
          <Input id="name" placeholder="Main Entrance Camera" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="type">Device Type</Label>
          <Select>
            <SelectTrigger id="type">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="camera">Camera</SelectItem>
              <SelectItem value="access">Access Control</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input id="location" placeholder="Building A, Floor 1" />
      </div>
    </form>
  </CardContent>
  <CardFooter className="border-t pt-6">
    <div className="flex gap-4">
      <Button type="submit">Create Device</Button>
      <Button variant="outline">Cancel</Button>
    </div>
  </CardFooter>
</Card>
```

### Data Table Layout
```typescript
<Card>
  <CardHeader>
    <div className="flex items-center justify-between">
      <div>
        <CardTitle>Devices</CardTitle>
        <CardDescription>
          Manage your security devices
        </CardDescription>
      </div>
      <Button>
        <Plus className="mr-2 h-4 w-4" />
        Add Device
      </Button>
    </div>
  </CardHeader>
  <CardContent>
    {/* Filters */}
    <div className="mb-4 flex items-center gap-4">
      <Input
        placeholder="Search devices..."
        className="max-w-sm"
      />
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="inactive">Inactive</SelectItem>
        </SelectContent>
      </Select>
    </div>

    {/* Table */}
    <Table>
      {/* Table content */}
    </Table>

    {/* Pagination */}
    <div className="mt-4 flex items-center justify-between">
      <p className="text-sm text-muted-foreground">
        Showing 1-10 of 45 devices
      </p>
      <div className="flex gap-2">
        <Button variant="outline" size="sm">Previous</Button>
        <Button variant="outline" size="sm">Next</Button>
      </div>
    </div>
  </CardContent>
</Card>
```

## Accessibility Guidelines

### Keyboard Navigation
- **All interactive elements** must be keyboard accessible
- **Tab order** must be logical (top to bottom, left to right)
- **Focus indicators** must be clearly visible (2px blue outline)
- **Escape key** closes modals and dropdowns
- **Arrow keys** navigate within components (dropdowns, tabs)

### Screen Reader Support
```typescript
// Always include labels
<Label htmlFor="email">Email</Label>
<Input id="email" type="email" />

// Use aria-labels when visual labels aren't present
<Button aria-label="Close dialog">
  <X className="h-4 w-4" />
</Button>

// Describe interactive elements
<Button
  aria-label="Delete device permanently"
  variant="destructive"
>
  Delete
</Button>

// Use aria-describedby for help text
<Input
  id="password"
  aria-describedby="password-help"
/>
<p id="password-help" className="text-sm text-muted-foreground">
  Must be at least 8 characters
</p>
```

### Color Contrast
- **Test all color combinations** using WebAIM contrast checker
- **Never rely on color alone** - use icons + text
- **Error states** must have icon + color + text message

### Form Accessibility
```typescript
// Proper form structure
<form aria-labelledby="form-title">
  <h2 id="form-title">Login</h2>

  <div className="space-y-2">
    <Label htmlFor="email">
      Email <span className="text-destructive">*</span>
    </Label>
    <Input
      id="email"
      type="email"
      required
      aria-required="true"
      aria-invalid={hasError}
      aria-describedby={hasError ? "email-error" : undefined}
    />
    {hasError && (
      <p id="email-error" className="text-sm text-destructive" role="alert">
        Please enter a valid email address
      </p>
    )}
  </div>
</form>
```

## Animation & Motion

### Animation Principles
1. **Purposeful** - Animations guide attention, don't distract
2. **Fast** - Max 300ms for UI transitions
3. **Natural** - Use easing functions (ease-out for entering, ease-in for exiting)
4. **Respectful** - Honor `prefers-reduced-motion`

### Standard Transitions
```css
/* Button hover */
.button {
  transition: background-color 150ms ease-out,
              transform 150ms ease-out;
}

/* Card hover */
.card {
  transition: box-shadow 200ms ease-out;
}

/* Modal enter/exit */
.modal {
  transition: opacity 200ms ease-out,
              transform 200ms ease-out;
}

/* Page transitions */
.page {
  transition: opacity 300ms ease-out;
}
```

### Respect User Preferences
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Responsive Design

### Breakpoints
```css
/* Mobile first approach */
sm: 640px   /* Tablets */
md: 768px   /* Small laptops */
lg: 1024px  /* Desktops */
xl: 1280px  /* Large desktops */
2xl: 1536px /* Ultra-wide */
```

### Responsive Patterns
```typescript
// Stack to grid
<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
  {/* Cards */}
</div>

// Hide/show elements
<div className="hidden md:block">Desktop only</div>
<div className="md:hidden">Mobile only</div>

// Responsive text
<h1 className="text-2xl md:text-3xl lg:text-4xl">
  Responsive Heading
</h1>

// Responsive spacing
<div className="px-4 md:px-6 lg:px-8">
  {/* Content */}
</div>
```

## Performance

### Loading States
```typescript
// Skeleton loading
<Card>
  <CardHeader>
    <Skeleton className="h-8 w-[200px]" />
    <Skeleton className="h-4 w-[300px]" />
  </CardHeader>
  <CardContent>
    <Skeleton className="h-[200px] w-full" />
  </CardContent>
</Card>

// Spinner
<Button disabled>
  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  Loading...
</Button>
```

### Image Optimization
```typescript
// Always use Next.js Image
import Image from 'next/image'

<Image
  src="/device-image.jpg"
  alt="Security camera"
  width={400}
  height={300}
  loading="lazy"
  className="rounded-lg"
/>
```

## Dark Mode (Future Consideration)

While our current system uses black/white with blue accents, the token structure supports dark mode:

```css
.dark {
  --background: 0 0% 3.9%;
  --foreground: 0 0% 98%;
  --primary: 217.2 91.2% 59.8%;
  /* etc... */
}
```

## Component Checklist

When creating any component, verify:
- [ ] Uses design tokens (colors, spacing, typography)
- [ ] Responsive on mobile, tablet, desktop
- [ ] Keyboard accessible (tab navigation, focus states)
- [ ] Screen reader friendly (labels, aria attributes)
- [ ] Color contrast passes WCAG AA (4.5:1 minimum)
- [ ] Loading states implemented
- [ ] Error states handled
- [ ] Animations respect prefers-reduced-motion
- [ ] Works with form validation
- [ ] Consistent with design patterns

## Quick Reference: Common Patterns

### Status Badge
```typescript
const statusVariant = {
  active: "default",
  pending: "secondary",
  error: "destructive",
  inactive: "outline"
}

<Badge variant={statusVariant[status]}>{status}</Badge>
```

### Icon + Text Pattern
```typescript
// Always pair icons with text for clarity
<Button>
  <Plus className="mr-2 h-4 w-4" />
  Add Device
</Button>

<div className="flex items-center gap-2">
  <Camera className="h-5 w-5 text-muted-foreground" />
  <span>12 Cameras Active</span>
</div>
```

### Empty States
```typescript
<Card>
  <CardContent className="flex flex-col items-center justify-center py-12">
    <Package className="h-12 w-12 text-muted-foreground" />
    <h3 className="mt-4 text-lg font-semibold">No devices found</h3>
    <p className="mt-2 text-sm text-muted-foreground">
      Get started by adding your first device
    </p>
    <Button className="mt-4">
      <Plus className="mr-2 h-4 w-4" />
      Add Device
    </Button>
  </CardContent>
</Card>
```