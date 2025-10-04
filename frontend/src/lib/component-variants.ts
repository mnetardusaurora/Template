/**
 * Aurora Nexus Component Variants
 * Reusable variant configurations using class-variance-authority (cva)
 */

import { cva, type VariantProps } from "class-variance-authority";

// Button variants (extends shadcn/ui)
export const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        success: "bg-success text-white hover:bg-success/90",
        warning: "bg-warning text-white hover:bg-warning/90",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-md px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;

// Badge variants
export const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        success: "border-transparent bg-success text-white",
        warning: "border-transparent bg-warning text-white",
        info: "border-transparent bg-info text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export type BadgeVariants = VariantProps<typeof badgeVariants>;

// Card variants
export const cardVariants = cva(
  "rounded-lg border bg-card text-card-foreground shadow-sm",
  {
    variants: {
      variant: {
        default: "",
        elevated: "shadow-md",
        interactive: "cursor-pointer transition-shadow hover:shadow-md",
        outline: "border-2",
      },
      padding: {
        none: "",
        sm: "p-4",
        default: "p-6",
        lg: "p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "default",
    },
  }
);

export type CardVariants = VariantProps<typeof cardVariants>;

// Alert variants
export const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
        success: "border-success/50 bg-success/10 text-success [&>svg]:text-success",
        warning: "border-warning/50 bg-warning/10 text-warning [&>svg]:text-warning",
        info: "border-info/50 bg-info/10 text-info [&>svg]:text-info",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export type AlertVariants = VariantProps<typeof alertVariants>;

// Status indicator variants
export const statusIndicatorVariants = cva(
  "inline-flex h-2 w-2 rounded-full",
  {
    variants: {
      status: {
        online: "bg-success",
        offline: "bg-destructive",
        idle: "bg-warning",
        busy: "bg-destructive animate-pulse",
        away: "bg-muted-foreground",
      },
      size: {
        sm: "h-1.5 w-1.5",
        default: "h-2 w-2",
        lg: "h-3 w-3",
      },
    },
    defaultVariants: {
      status: "online",
      size: "default",
    },
  }
);

export type StatusIndicatorVariants = VariantProps<typeof statusIndicatorVariants>;

// Input variants
export const inputVariants = cva(
  "flex w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-input",
        error: "border-destructive focus-visible:ring-destructive",
        success: "border-success focus-visible:ring-success",
      },
      inputSize: {
        sm: "h-8 text-xs",
        default: "h-10",
        lg: "h-12 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default",
    },
  }
);

export type InputVariants = VariantProps<typeof inputVariants>;

// Skeleton variants
export const skeletonVariants = cva(
  "animate-pulse rounded-md bg-muted",
  {
    variants: {
      variant: {
        default: "",
        text: "h-4 w-full",
        title: "h-6 w-2/3",
        avatar: "h-12 w-12 rounded-full",
        button: "h-10 w-24",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export type SkeletonVariants = VariantProps<typeof skeletonVariants>;

// Container variants
export const containerVariants = cva(
  "mx-auto w-full",
  {
    variants: {
      size: {
        sm: "max-w-screen-sm",
        md: "max-w-screen-md",
        lg: "max-w-screen-lg",
        xl: "max-w-screen-xl",
        "2xl": "max-w-screen-2xl",
        full: "max-w-full",
        default: "max-w-[1440px]",
      },
      padding: {
        none: "",
        sm: "px-4",
        default: "px-4 md:px-6 lg:px-8",
        lg: "px-6 md:px-8 lg:px-12",
      },
    },
    defaultVariants: {
      size: "default",
      padding: "default",
    },
  }
);

export type ContainerVariants = VariantProps<typeof containerVariants>;

// Navigation item variants
export const navItemVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "text-muted-foreground hover:text-foreground",
        active: "text-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export type NavItemVariants = VariantProps<typeof navItemVariants>;

// Loading spinner variants
export const spinnerVariants = cva(
  "animate-spin rounded-full border-2 border-current border-t-transparent",
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        default: "h-6 w-6",
        lg: "h-8 w-8",
        xl: "h-12 w-12",
      },
      variant: {
        default: "text-primary",
        secondary: "text-secondary-foreground",
        muted: "text-muted-foreground",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  }
);

export type SpinnerVariants = VariantProps<typeof spinnerVariants>;

// Typography variants
export const headingVariants = cva(
  "font-semibold tracking-tight",
  {
    variants: {
      level: {
        h1: "text-3xl lg:text-4xl",
        h2: "text-2xl lg:text-3xl",
        h3: "text-xl lg:text-2xl",
        h4: "text-lg",
      },
      color: {
        default: "text-foreground",
        muted: "text-muted-foreground",
        primary: "text-primary",
      },
    },
    defaultVariants: {
      level: "h2",
      color: "default",
    },
  }
);

export type HeadingVariants = VariantProps<typeof headingVariants>;

// Data table cell variants
export const tableCellVariants = cva(
  "px-4 py-3 text-sm",
  {
    variants: {
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      },
      weight: {
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
      },
      variant: {
        default: "",
        mono: "font-mono text-xs text-muted-foreground",
        emphasis: "font-medium",
      },
    },
    defaultVariants: {
      align: "left",
      weight: "normal",
      variant: "default",
    },
  }
);

export type TableCellVariants = VariantProps<typeof tableCellVariants>;

// Export all for convenience
export const variants = {
  button: buttonVariants,
  badge: badgeVariants,
  card: cardVariants,
  alert: alertVariants,
  statusIndicator: statusIndicatorVariants,
  input: inputVariants,
  skeleton: skeletonVariants,
  container: containerVariants,
  navItem: navItemVariants,
  spinner: spinnerVariants,
  heading: headingVariants,
  tableCell: tableCellVariants,
} as const;
