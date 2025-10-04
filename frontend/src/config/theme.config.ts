/**
 * Aurora Nexus Theme Configuration
 *
 * Centralized theme configuration for programmatic theme switching
 * and dynamic theme generation.
 */

export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeConfig {
  mode: ThemeMode;
  customTheme?: string;
}

/**
 * Default theme configuration
 */
export const defaultThemeConfig: ThemeConfig = {
  mode: 'system',
};

/**
 * Available custom themes
 * Add custom theme names here when creating new themes in themes.css
 */
export const availableThemes = {
  default: 'default',
  // brand: 'brand',
  // highContrast: 'high-contrast',
} as const;

export type AvailableTheme = typeof availableThemes[keyof typeof availableThemes];

/**
 * Theme utility functions
 */
export const themeUtils = {
  /**
   * Get the current theme mode from localStorage or system preference
   */
  getThemeMode: (): ThemeMode => {
    if (typeof window === 'undefined') return 'system';

    const stored = localStorage.getItem('theme-mode');
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      return stored;
    }

    return 'system';
  },

  /**
   * Set theme mode and update DOM
   */
  setThemeMode: (mode: ThemeMode): void => {
    if (typeof window === 'undefined') return;

    localStorage.setItem('theme-mode', mode);

    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (mode === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(mode);
    }
  },

  /**
   * Get custom theme
   */
  getCustomTheme: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('custom-theme');
  },

  /**
   * Set custom theme
   */
  setCustomTheme: (theme: AvailableTheme | null): void => {
    if (typeof window === 'undefined') return;

    const root = window.document.documentElement;

    // Remove existing theme data attributes
    Object.values(availableThemes).forEach(t => {
      root.removeAttribute(`data-theme`);
    });

    if (theme && theme !== 'default') {
      root.setAttribute('data-theme', theme);
      localStorage.setItem('custom-theme', theme);
    } else {
      localStorage.removeItem('custom-theme');
    }
  },

  /**
   * Initialize theme on app load
   */
  initializeTheme: (): void => {
    if (typeof window === 'undefined') return;

    const mode = themeUtils.getThemeMode();
    themeUtils.setThemeMode(mode);

    const customTheme = themeUtils.getCustomTheme();
    if (customTheme) {
      themeUtils.setCustomTheme(customTheme as AvailableTheme);
    }

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
      const currentMode = themeUtils.getThemeMode();
      if (currentMode === 'system') {
        themeUtils.setThemeMode('system');
      }
    });
  },
};

/**
 * Example usage in a React component:
 *
 * import { themeUtils, type ThemeMode } from '@/config/theme.config';
 *
 * function ThemeToggle() {
 *   const [theme, setTheme] = useState<ThemeMode>('system');
 *
 *   useEffect(() => {
 *     themeUtils.initializeTheme();
 *     setTheme(themeUtils.getThemeMode());
 *   }, []);
 *
 *   const toggleTheme = (newTheme: ThemeMode) => {
 *     themeUtils.setThemeMode(newTheme);
 *     setTheme(newTheme);
 *   };
 *
 *   return (
 *     <select value={theme} onChange={(e) => toggleTheme(e.target.value as ThemeMode)}>
 *       <option value="light">Light</option>
 *       <option value="dark">Dark</option>
 *       <option value="system">System</option>
 *     </select>
 *   );
 * }
 */

export default themeUtils;
