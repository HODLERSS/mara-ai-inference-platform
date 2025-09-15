'use client'

import { Container, Typography, Box } from '@mui/material'
import { SloMonitoringDashboard } from '@/components/monitoring/slo-monitoring-dashboard'

export default function SloMonitoringPage() {
  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          SLO Monitoring & Alerts
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Monitor service level objectives, track performance metrics, and manage alerts for your AI infrastructure
        </Typography>

        <SloMonitoringDashboard />
      </Box>
    </Container>
  )
}