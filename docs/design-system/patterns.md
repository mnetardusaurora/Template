# Design Patterns

Common usage patterns for the Aurora Nexus design system.

## Layout Patterns

### Page Container

Standard page layout with responsive padding:

```tsx
import { cn } from "@/lib/utils";

export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <div className="aurora-container py-8">
        {children}
      </div>
    </div>
  );
}
```

### Two-Column Layout

Responsive sidebar layout:

```tsx
export function TwoColumnLayout({
  sidebar,
  main,
}: {
  sidebar: React.ReactNode;
  main: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
      <aside className="hidden lg:block">{sidebar}</aside>
      <main>{main}</main>
    </div>
  );
}
```

### Grid Layout

Responsive card grid:

```tsx
export function GridLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {children}
    </div>
  );
}
```

---

## Form Patterns

### Standard Form Field

Consistent form field with label, input, and error:

```tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function FormField({
  id,
  label,
  error,
  helperText,
  ...inputProps
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : helperText ? `${id}-helper` : undefined}
        {...inputProps}
      />
      {error && (
        <p id={`${id}-error`} className="text-sm text-destructive">
          {error}
        </p>
      )}
      {helperText && !error && (
        <p id={`${id}-helper`} className="text-sm text-muted-foreground">
          {helperText}
        </p>
      )}
    </div>
  );
}
```

### Form with Validation

Using React Hook Form:

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type FormData = z.infer<typeof formSchema>;

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    // Handle submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormField
        id="email"
        label="Email"
        type="email"
        error={errors.email?.message}
        {...register("email")}
      />
      <FormField
        id="password"
        label="Password"
        type="password"
        error={errors.password?.message}
        {...register("password")}
      />
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
}
```

---

## Data Display Patterns

### Data Table with Actions

```tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function UserTable({ users }: { users: User[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <Badge variant={user.isActive ? "success" : "secondary"}>
                {user.isActive ? "Active" : "Inactive"}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="sm">
                Edit
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

### Card Grid with Loading States

```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ProductGrid({ products, isLoading }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <Card key={product.id}>
          <CardHeader>
            <CardTitle>{product.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {product.description}
            </p>
            <p className="text-lg font-semibold mt-4">${product.price}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
```

---

## Navigation Patterns

### Responsive Header

```tsx
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b bg-background">
      <div className="aurora-container">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-bold">Aurora Nexus</h1>
            <nav className="hidden md:flex gap-6">
              <a href="/dashboard" className="text-sm hover:text-primary">
                Dashboard
              </a>
              <a href="/projects" className="text-sm hover:text-primary">
                Projects
              </a>
              <a href="/settings" className="text-sm hover:text-primary">
                Settings
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="hidden md:inline-flex">
              Sign in
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
```

### Sidebar Navigation

```tsx
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: HomeIcon },
  { href: "/projects", label: "Projects", icon: FolderIcon },
  { href: "/settings", label: "Settings", icon: SettingsIcon },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r bg-muted/40 p-4">
      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
```

---

## State Management Patterns

### Loading States

```tsx
import { Spinner } from "@/components/ui/spinner";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function DataComponent({ id }: { id: string }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['data', id],
    queryFn: () => fetchData(id),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Failed to load data. Please try again.
        </AlertDescription>
      </Alert>
    );
  }

  return <div>{/* Render data */}</div>;
}
```

### Empty States

```tsx
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

export function EmptyState({
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground mt-2 max-w-sm">
        {description}
      </p>
      {action && (
        <Button className="mt-4" onClick={action.onClick}>
          <PlusIcon className="mr-2 h-4 w-4" />
          {action.label}
        </Button>
      )}
    </div>
  );
}
```

---

## Accessibility Patterns

### Focus Management

```tsx
import { useEffect, useRef } from "react";

export function Dialog({ isOpen, onClose, title, children }: DialogProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div role="dialog" aria-labelledby="dialog-title" aria-modal="true">
      <h2 id="dialog-title">{title}</h2>
      {children}
      <button ref={closeButtonRef} onClick={onClose}>
        Close
      </button>
    </div>
  );
}
```

### Keyboard Navigation

```tsx
export function Menu({ items }: MenuProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      // Focus next item
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      // Focus previous item
    } else if (e.key === "Escape") {
      // Close menu
    }
  };

  return (
    <ul role="menu" onKeyDown={handleKeyDown}>
      {items.map((item) => (
        <li key={item.id} role="menuitem" tabIndex={0}>
          {item.label}
        </li>
      ))}
    </ul>
  );
}
```

---

## Resources

- Component documentation: `docs/design-system/components.md`
- Code examples: `docs/design-system/examples.md`
- Design tokens: `frontend/src/lib/design-tokens.ts`
- Component variants: `frontend/src/lib/component-variants.ts`
