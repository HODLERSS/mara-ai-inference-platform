'use client'

import { IconButton } from '@mui/material'
import { DarkMode, LightMode } from '@mui/icons-material'
import { useTheme } from '@/lib/theme-context'

export function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme()

  return (
    <IconButton onClick={toggleTheme} color="inherit">
      {isDarkMode ? <LightMode /> : <DarkMode />}
    </IconButton>
  )
}