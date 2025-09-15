'use client'

import { Container, Typography, Box, Alert } from '@mui/material'
import { ApiPlayground } from '@/components/playground/api-playground'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useSearchParams } from 'next/navigation'

export default function PlaygroundPage() {
  const { data: session, status } = useSession()
  const searchParams = useSearchParams()
  const selectedModel = searchParams.get('model')

  if (status === 'loading') {
    return (
      <Container maxWidth="xl">
        <Box sx={{ py: 4, textAlign: 'center' }}>
          <Typography>Loading...</Typography>
        </Box>
      </Container>
    )
  }

  if (!session) {
    redirect('/signin')
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Header */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 3, py: 2, bgcolor: 'background.paper' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          API Playground
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Interactive testing environment for MARA AI models with real-time performance metrics
        </Typography>

        <Alert severity="info" sx={{ mt: 2 }}>
          <Typography variant="body2">
            <strong>Quick Start:</strong> Select a model, enter your prompt, and click "Send Request" to test our API.
            All requests include performance metrics and code generation examples.
          </Typography>
        </Alert>
      </Box>

      {/* Playground */}
      <Box sx={{ flex: 1, overflow: 'hidden' }}>
        <ApiPlayground selectedModel={selectedModel} />
      </Box>
    </Box>
  )
}