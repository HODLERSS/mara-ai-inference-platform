'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

interface ThemeContextType {
  isDarkMode: boolean
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: true, // Default to dark mode
  toggleTheme: () => {},
})

export const useTheme = () => useContext(ThemeContext)

const createAppTheme = (isDark: boolean) => createTheme({
  palette: {
    mode: isDark ? 'dark' : 'light',
    primary: {
      main: '#F1A800',
      light: '#F6D483',
      dark: '#E09600',
      contrastText: isDark ? '#000000' : '#FFFFFF',
    },
    secondary: {
      main: '#F3B629',
      light: '#F6D483',
      dark: '#E09600',
      contrastText: isDark ? '#000000' : '#FFFFFF',
    },
    background: {
      default: isDark ? '#0a0a0a' : '#fafafa',
      paper: isDark ? '#1a1a1a' : '#ffffff',
    },
    // MARA Brand Extensions
    success: {
      main: '#4caf50',
      light: '#81c784',
      dark: '#388e3c',
    },
    warning: {
      main: '#ff9800',
      light: '#ffb74d',
      dark: '#f57c00',
    },
    error: {
      main: '#f44336',
      light: '#e57373',
      dark: '#d32f2f',
    },
    info: {
      main: '#2196f3',
      light: '#64b5f6',
      dark: '#1976d2',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 700,
      color: isDark ? '#ffffff' : '#1a1a1a',
    },
    h2: {
      fontWeight: 600,
      color: isDark ? '#ffffff' : '#1a1a1a',
    },
    h3: {
      fontWeight: 600,
      color: isDark ? '#ffffff' : '#1a1a1a',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          height: '100%',
        },
        body: {
          height: '100%',
        },
        '#__next': {
          height: '100%',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
        },
        containedPrimary: {
          backgroundColor: '#F1A800',
          color: '#000000',
          '&:hover': {
            backgroundColor: '#E09600',
          },
        },
        outlinedPrimary: {
          borderColor: '#F1A800',
          color: '#F1A800',
          '&:hover': {
            borderColor: '#E09600',
            backgroundColor: isDark ? 'rgba(241, 168, 0, 0.08)' : 'rgba(241, 168, 0, 0.04)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
          color: isDark ? '#ffffff' : '#1a1a1a',
          borderBottom: `1px solid ${isDark ? '#333' : '#e0e0e0'}`,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: isDark
            ? '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.18)'
            : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: '#F1A800',
          color: '#000000',
        },
        colorSecondary: {
          backgroundColor: '#F3B629',
          color: '#000000',
        },
      },
    },
  },
})

interface ThemeProviderProps {
  children: React.ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [isDarkMode, setIsDarkMode] = useState(true) // Default to dark mode

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark')
    } else {
      // Default to dark mode instead of system preference
      setIsDarkMode(true)
      localStorage.setItem('theme', 'dark')
    }
  }, [])

  const toggleTheme = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    localStorage.setItem('theme', newMode ? 'dark' : 'light')
  }

  const theme = createAppTheme(isDarkMode)

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  )
}