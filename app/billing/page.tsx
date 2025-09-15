'use client'

import { Container, Typography, Box } from '@mui/material'
import { BillingDashboard } from '@/components/billing/billing-dashboard'

export default function BillingPage() {
  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Usage & Billing
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Monitor your usage, costs, and billing details for MARA AI services
        </Typography>

        <BillingDashboard />
      </Box>
    </Container>
  )
}