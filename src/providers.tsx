import { ReactNode, createContext, useContext, useState, useEffect } from 'react';

type Theme = 'dark' | 'light' | 'royal';

interface ThemeContextType {
  theme: Theme;
  setTheme: (t: Theme) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark');

  useEffect(() => {
    const saved = localStorage.getItem('hes-theme') as Theme | null;
    if (saved) applyTheme(saved);
  }, []);

  const applyTheme = (t: Theme) => {
    const root = document.documentElement;
    root.classList.remove('theme-light', 'theme-royal');
    if (t === 'light') root.classList.add('theme-light');
    if (t === 'royal') root.classList.add('theme-royal');
    setThemeState(t);
    localStorage.setItem('hes-theme', t);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: applyTheme, isDark: theme === 'dark' || theme === 'royal' }}>
      {children}
    </ThemeContext.Provider>
  );
}

interface BookingState {
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}

interface BookingContextType {
  booking: BookingState;
  setBooking: React.Dispatch<React.SetStateAction<BookingState>>;
  updateBooking: (updates: Partial<BookingState>) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) throw new Error('useBooking must be used within BookingProvider');
  return context;
}

function BookingProvider({ children }: { children: ReactNode }) {
  const [booking, setBooking] = useState<BookingState>({
    location: 'All',
    checkIn: '',
    checkOut: '',
    guests: 2,
  });

  const updateBooking = (updates: Partial<BookingState>) => {
    setBooking((prev) => ({ ...prev, ...updates }));
  };

  return (
    <BookingContext.Provider value={{ booking, setBooking, updateBooking }}>
      {children}
    </BookingContext.Provider>
  );
}

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <BookingProvider>{children}</BookingProvider>
    </ThemeProvider>
  );
}
