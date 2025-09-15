'use client'

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Divider,
} from '@mui/material'
import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { Dashboard, Store, Calculate, AdminPanelSettings, Description, ExitToApp, PlayArrow, Key, AttachMoney, Settings, Monitor } from '@mui/icons-material'

const navigationItems = [
  { label: 'Dashboard', href: '/dashboard', icon: <Dashboard /> },
  { label: 'Playground', href: '/playground', icon: <PlayArrow /> },
  { label: 'Models', href: '/marketplace', icon: <Store /> },
  { label: 'API Keys', href: '/api-keys', icon: <Key /> },
  { label: 'Analytics', href: '/performance', icon: <Calculate /> },
  { label: 'SLO Monitoring', href: '/slo-monitoring', icon: <Monitor /> },
  { label: 'Usage & Billing', href: '/billing', icon: <AttachMoney /> },
  { label: 'API Docs', href: '/api-docs', icon: <Description /> },
]

export function Navbar() {
  const { data: session } = useSession()
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    router.push('/')
    handleMenuClose()
  }

  return (
    <AppBar position="sticky" elevation={1}>
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          href="/"
          sx={{
            textDecoration: 'none',
            color: 'inherit',
            fontWeight: 'bold',
            mr: 4
          }}
        >
          MARA AI
        </Typography>

        {session && (
          <Box sx={{ display: 'flex', gap: 2, mr: 'auto' }}>
            {navigationItems.map((item) => (
              <Button
                key={item.href}
                component={Link}
                href={item.href}
                color="inherit"
                startIcon={item.icon}
                sx={{ textTransform: 'none' }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ThemeToggle />

          {session ? (
            <>
              <IconButton onClick={handleMenuOpen} color="inherit">
                <Avatar sx={{
                  width: 32,
                  height: 32,
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  fontWeight: 'bold'
                }}>
                  {session.user?.name?.[0] || 'A'}
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <MenuItem disabled>
                  <Box>
                    <Typography variant="subtitle2">{session.user?.name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {session.user?.email}
                    </Typography>
                  </Box>
                </MenuItem>
                <Divider />
                <MenuItem component={Link} href="/settings" onClick={handleMenuClose}>
                  <Settings sx={{ mr: 1 }} />
                  Settings
                </MenuItem>
                <MenuItem component={Link} href="/cost-analysis" onClick={handleMenuClose}>
                  <Calculate sx={{ mr: 1 }} />
                  Cost Analysis
                </MenuItem>
                {session.user?.email === 'minjAI@mara.com' && (
                  <MenuItem component={Link} href="/admin" onClick={handleMenuClose}>
                    <AdminPanelSettings sx={{ mr: 1 }} />
                    Admin Panel
                  </MenuItem>
                )}
                <Divider />
                <MenuItem onClick={handleSignOut}>
                  <ExitToApp sx={{ mr: 1 }} />
                  Sign Out
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              component={Link}
              href="/signin"
              color="inherit"
              variant="outlined"
            >
              Sign In
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}