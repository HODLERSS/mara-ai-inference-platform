'use client'

import { Container, Typography, Box } from '@mui/material'
import { ApiKeysDashboard } from '@/components/api-keys/api-keys-dashboard'

export default function ApiKeysPage() {
  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          API Keys
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Manage your API keys for secure access to MARA AI services
        </Typography>

        <ApiKeysDashboard />
      </Box>
    </Container>
  )
}