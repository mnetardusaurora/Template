# UI Design Guide

## shadcn/ui Implementation

### Component Library Setup
```bash
# Initialize shadcn/ui
npx shadcn@latest init

# Add components as needed
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add form
```

### Design System
- **Primary Colors**: Customize in `tailwind.config.js`
- **Typography**: Inter font family (default)
- **Spacing**: Tailwind's 4px base unit system
- **Border Radius**: 0.5rem default, 0.75rem for cards

### Component Patterns

#### Button Variants
```tsx
import { Button } from "@/components/ui/button";

// Primary action
<Button>Submit</Button>

// Secondary action
<Button variant="secondary">Cancel</Button>

// Destructive action
<Button variant="destructive">Delete</Button>

// Outline style
<Button variant="outline">Learn More</Button>
```

#### Form Components
```tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const LoginForm = () => (
  <form className="space-y-4">
    <div>
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="Enter your email" />
    </div>
    <Button type="submit" className="w-full">
      Sign In
    </Button>
  </form>
);
```

## Enterprise Security UX Standards

### Authentication UI
- Clear error messaging
- Progressive disclosure for complex forms
- Visual feedback for form validation
- Secure password requirements display

### Data Visualization
- Consistent chart colors and styling
- Accessible color contrasts (WCAG AA compliant)
- Loading states for data-heavy components
- Empty states with helpful actions

### Navigation Patterns
```tsx
// Side navigation for admin interfaces
const SideNav = () => (
  <nav className="w-64 bg-slate-50 border-r border-slate-200">
    <div className="p-4">
      <h2 className="font-semibold text-slate-900">Navigation</h2>
      <ul className="mt-4 space-y-2">
        <li>
          <Link to="/dashboard" className="flex items-center p-2 text-slate-700 rounded hover:bg-slate-100">
            Dashboard
          </Link>
        </li>
      </ul>
    </div>
  </nav>
);
```

## Responsive Design

### Breakpoint Strategy
- **Mobile First**: Start with mobile design
- **Tablet**: 768px and up
- **Desktop**: 1024px and up
- **Large Desktop**: 1280px and up

### Layout Patterns
```tsx
// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => (
    <Card key={item.id} className="p-6">
      {/* Card content */}
    </Card>
  ))}
</div>

// Responsive navigation
<nav className="hidden md:flex space-x-8">
  {/* Desktop navigation */}
</nav>
<button className="md:hidden">
  {/* Mobile menu button */}
</button>
```

## Accessibility Guidelines

### WCAG Compliance
- Minimum 4.5:1 contrast ratio for normal text
- Minimum 3:1 contrast ratio for large text
- Keyboard navigation support
- Screen reader compatibility

### Implementation
```tsx
// Accessible form labels
<Label htmlFor="password" className="sr-only">
  Password
</Label>
<Input
  id="password"
  type="password"
  placeholder="Password"
  aria-describedby="password-help"
/>
<p id="password-help" className="text-sm text-slate-600 mt-1">
  Must be at least 8 characters
</p>

// Focus management
<Button
  ref={focusRef}
  onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
>
  Submit
</Button>
```

## Performance Considerations
- Lazy load components with React.lazy()
- Use React.memo for expensive components
- Optimize images with next/image or similar
- Minimize bundle size with tree shaking
- Implement skeleton loading states