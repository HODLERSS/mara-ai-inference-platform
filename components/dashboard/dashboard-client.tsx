'use client'

import { useState } from 'react'
// Simplified API user dashboard like OpenAI/Claude
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material'
import {
  Add,
  Speed,
  AttachMoney,
  VpnKey,
  CheckCircle,
  TrendingUp,
  PlayArrow,
  LibraryBooks,
  Settings,
  Visibility,
  ContentCopy,
  BarChart,
  Timeline,
  TrendingDown,
} from '@mui/icons-material'
import { UsageChart } from '@/components/charts/usage-chart'

interface DashboardClientProps {
  initialInferences: any[]
}

interface ApiRequest {
  id: string
  timestamp: Date
  model: string
  tokens: number
  latency: number
  status: 'success' | 'error'
  cost: number
}

interface ModelUsage {
  model: string
  requests: number
  tokens: number
  percentage: number
}

const mockApiRequests: ApiRequest[] = [
  {
    id: '1',
    timestamp: new Date(Date.now() - 300000),
    model: 'llama-2-70b',
    tokens: 847,
    latency: 87,
    status: 'success',
    cost: 0.012
  },
  {
    id: '2',
    timestamp: new Date(Date.now() - 900000),
    model: 'mixtral-8x7b',
    tokens: 1204,
    latency: 95,
    status: 'success',
    cost: 0.018
  },
  {
    id: '3',
    timestamp: new Date(Date.now() - 1800000),
    model: 'llama-2-13b',
    tokens: 423,
    latency: 62,
    status: 'success',
    cost: 0.006
  },
  {
    id: '4',
    timestamp: new Date(Date.now() - 3600000),
    model: 'codellama-34b',
    tokens: 756,
    latency: 103,
    status: 'error',
    cost: 0.000
  },
  {
    id: '5',
    timestamp: new Date(Date.now() - 7200000),
    model: 'llama-2-70b',
    tokens: 1089,
    latency: 91,
    status: 'success',
    cost: 0.016
  }
]

const modelUsage: ModelUsage[] = [
  { model: 'llama-2-70b', requests: 847, tokens: 1247293, percentage: 45.2 },
  { model: 'mixtral-8x7b', requests: 423, tokens: 687432, percentage: 24.9 },
  { model: 'llama-2-13b', requests: 312, tokens: 456123, percentage: 16.5 },
  { model: 'codellama-34b', requests: 189, tokens: 234567, percentage: 8.5 },
  { model: 'qwen2-72b', requests: 134, tokens: 167890, percentage: 4.9 }
]

interface UsageDataPoint {
  period: string
  tokens: number
  cost: number
  requests: number
}

const dailyUsageData: UsageDataPoint[] = [
  { period: 'Sep 8', tokens: 145000, cost: 18.6, requests: 1200 },
  { period: 'Sep 9', tokens: 167000, cost: 21.4, requests: 1350 },
  { period: 'Sep 10', tokens: 189000, cost: 24.2, requests: 1580 },
  { period: 'Sep 11', tokens: 156000, cost: 19.9, requests: 1290 },
  { period: 'Sep 12', tokens: 201000, cost: 25.7, requests: 1680 },
  { period: 'Sep 13', tokens: 178000, cost: 22.8, requests: 1470 },
  { period: 'Sep 14', tokens: 193000, cost: 24.7, requests: 1590 }
]

const monthlyUsageData: UsageDataPoint[] = [
  { period: 'Jun', tokens: 3200000, cost: 410.0, requests: 26500 },
  { period: 'Jul', tokens: 3850000, cost: 493.0, requests: 31800 },
  { period: 'Aug', tokens: 4100000, cost: 525.0, requests: 33900 },
  { period: 'Sep', tokens: 1329000, cost: 170.0, requests: 10160 }
]

export function DashboardClient({ initialInferences }: DashboardClientProps) {
  const [viewMode, setViewMode] = useState<'requests' | 'cost' | 'tokens'>('tokens')
  const [timePeriod, setTimePeriod] = useState<'daily' | 'monthly'>('daily')

  const totalRequests = 12847
  const monthlySpend = 247.35
  const spendLimit = 500
  const activeApiKeys = 3
  const serviceUptime = 99.97

  const handleGenerateKey = () => {
    // Navigate to API keys page or show modal
    window.location.href = '/api-keys'
  }

  const handleCopyRequest = (requestId: string) => {
    // Copy request details to clipboard
    console.log('Copying request:', requestId)
  }

  const currentData = timePeriod === 'daily' ? dailyUsageData : monthlyUsageData

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            API Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Monitor usage, track costs, and manage your MARA AI inference platform
          </Typography>
        </Box>

        {/* Usage Trends Chart - Full Width */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Usage Trends</Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <ToggleButtonGroup
                  value={timePeriod}
                  exclusive
                  onChange={(_, value) => value && setTimePeriod(value)}
                  size="small"
                >
                  <ToggleButton value="daily">Daily</ToggleButton>
                  <ToggleButton value="monthly">Monthly</ToggleButton>
                </ToggleButtonGroup>
                <ToggleButtonGroup
                  value={viewMode}
                  exclusive
                  onChange={(_, value) => value && setViewMode(value)}
                  size="small"
                >
                  <ToggleButton value="requests">Requests</ToggleButton>
                  <ToggleButton value="cost">Cost</ToggleButton>
                  <ToggleButton value="tokens">Tokens</ToggleButton>
                </ToggleButtonGroup>
              </Box>
            </Box>

            <UsageChart
              data={currentData}
              viewMode={viewMode}
              height={300}
            />
          </CardContent>
        </Card>

        {/* Quick Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <BarChart sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h6">API Usage</Typography>
                </Box>
                <Typography variant="h3" color="primary.main">
                  {totalRequests.toLocaleString()}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <TrendingUp sx={{ fontSize: 16, color: 'success.main', mr: 0.5 }} />
                  <Typography variant="body2" color="success.main">
                    +23% this month
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <AttachMoney sx={{ mr: 1, color: 'warning.main' }} />
                  <Typography variant="h6">Current Spend</Typography>
                </Box>
                <Typography variant="h3" color="warning.main">
                  ${monthlySpend}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={(monthlySpend / spendLimit) * 100}
                  sx={{ mt: 1, height: 6, borderRadius: 3 }}
                  color={monthlySpend / spendLimit > 0.8 ? 'error' : 'warning'}
                />
                <Typography variant="caption" color="text.secondary">
                  ${monthlySpend} of ${spendLimit} limit
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <VpnKey sx={{ mr: 1, color: 'info.main' }} />
                  <Typography variant="h6">API Keys</Typography>
                </Box>
                <Typography variant="h3" color="info.main">
                  {activeApiKeys}
                </Typography>
                <Button
                  size="small"
                  startIcon={<Add />}
                  onClick={handleGenerateKey}
                  sx={{ mt: 1 }}
                >
                  Generate New
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <CheckCircle sx={{ mr: 1, color: 'success.main' }} />
                  <Typography variant="h6">Service Health</Typography>
                </Box>
                <Typography variant="h3" color="success.main">
                  {serviceUptime}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  All systems operational
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          {/* Recent API Activity */}
          <Grid item xs={12} lg={7}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">Recent API Activity</Typography>
                  <Button size="small" endIcon={<Visibility />}>
                    View All
                  </Button>
                </Box>

                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Time</TableCell>
                        <TableCell>Model</TableCell>
                        <TableCell align="right">Tokens</TableCell>
                        <TableCell align="right">Latency</TableCell>
                        <TableCell align="center">Status</TableCell>
                        <TableCell align="right">Cost</TableCell>
                        <TableCell align="center">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {mockApiRequests.map((request) => (
                        <TableRow key={request.id}>
                          <TableCell>
                            <Typography variant="body2">
                              {request.timestamp.toLocaleTimeString()}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                              {request.model}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            {request.tokens.toLocaleString()}
                          </TableCell>
                          <TableCell align="right">
                            <Typography
                              variant="body2"
                              color={request.latency > 100 ? 'warning.main' : 'text.primary'}
                            >
                              {request.latency}μs
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Chip
                              label={request.status}
                              color={request.status === 'success' ? 'success' : 'error'}
                              size="small"
                            />
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="body2">
                              ${request.cost.toFixed(3)}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Tooltip title="Copy request details">
                              <IconButton
                                size="small"
                                onClick={() => handleCopyRequest(request.id)}
                              >
                                <ContentCopy fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Quick Actions */}
          <Grid item xs={12} lg={5}>
            {/* Quick Actions */}
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Quick Actions
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<Add />}
                    onClick={handleGenerateKey}
                  >
                    Generate API Key
                  </Button>

                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<LibraryBooks />}
                    href="/api-docs"
                  >
                    View Documentation
                  </Button>

                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<PlayArrow />}
                    href="/playground"
                  >
                    API Playground
                  </Button>

                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Settings />}
                    href="/billing"
                  >
                    Billing Settings
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Model Usage Breakdown */}
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Model Usage This Month
            </Typography>

            <Grid container spacing={2}>
              {modelUsage.map((model) => (
                <Grid item xs={12} sm={6} md={2.4} key={model.model}>
                  <Box sx={{ p: 2, border: 1, borderColor: 'divider', borderRadius: 1, textAlign: 'center' }}>
                    <Typography variant="subtitle2" sx={{ fontFamily: 'monospace' }}>
                      {model.model}
                    </Typography>
                    <Typography variant="h4" color="primary.main" sx={{ my: 1 }}>
                      {model.percentage}%
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={model.percentage}
                      sx={{ mb: 1, height: 6, borderRadius: 3 }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      {model.requests} requests
                    </Typography>
                    <br />
                    <Typography variant="caption" color="text.secondary">
                      {(model.tokens / 1000000).toFixed(1)}M tokens
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Container>
  )
}