'use client'

import { Container, Typography, Box } from '@mui/material'
import { SettingsDashboard } from '@/components/settings/settings-dashboard'

export default function SettingsPage() {
  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Settings
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Manage your account, security, and organization settings
        </Typography>

        <SettingsDashboard />
      </Box>
    </Container>
  )
}