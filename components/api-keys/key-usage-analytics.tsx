'use client'

import { useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import {
  TrendingUp,
  Speed,
  Error,
  CheckCircle,
  Schedule,
  DataUsage,
} from '@mui/icons-material'

interface UsageMetrics {
  timeframe: string
  requests: number
  tokens: number
  avgLatency: number
  errors: number
  successRate: number
}

interface ModelUsage {
  model: string
  requests: number
  tokens: number
  latency: number
  cost: number
}

const mockUsageData: UsageMetrics[] = [
  { timeframe: '1h', requests: 142, tokens: 8947, avgLatency: 89, errors: 2, successRate: 98.6 },
  { timeframe: '6h', requests: 847, tokens: 52341, avgLatency: 92, errors: 8, successRate: 99.1 },
  { timeframe: '24h', requests: 3241, tokens: 189742, avgLatency: 87, errors: 15, successRate: 99.5 },
  { timeframe: '7d', requests: 18954, tokens: 1247832, avgLatency: 91, errors: 89, successRate: 99.3 },
]

const mockModelUsage: ModelUsage[] = [
  { model: 'llama-2-70b', requests: 1247, tokens: 75432, latency: 87, cost: 15.23 },
  { model: 'llama-2-13b', requests: 892, tokens: 48921, latency: 62, cost: 8.94 },
  { model: 'mixtral-8x7b', requests: 634, tokens: 34587, latency: 94, cost: 11.76 },
  { model: 'codellama-34b', requests: 456, tokens: 28934, latency: 78, cost: 9.45 },
]

export function KeyUsageAnalytics() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h')
  const [currentMetrics, setCurrentMetrics] = useState<UsageMetrics>(
    mockUsageData.find(d => d.timeframe === selectedTimeframe) || mockUsageData[2]
  )

  useEffect(() => {
    const metrics = mockUsageData.find(d => d.timeframe === selectedTimeframe)
    if (metrics) {
      setCurrentMetrics(metrics)
    }
  }, [selectedTimeframe])

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  return (
    <Box>
      {/* Timeframe Selector */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Usage Analytics</Typography>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Timeframe</InputLabel>
          <Select
            value={selectedTimeframe}
            label="Timeframe"
            onChange={(e) => setSelectedTimeframe(e.target.value)}
          >
            <MenuItem value="1h">Last Hour</MenuItem>
            <MenuItem value="6h">Last 6 Hours</MenuItem>
            <MenuItem value="24h">Last 24 Hours</MenuItem>
            <MenuItem value="7d">Last 7 Days</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Key Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <TrendingUp sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="subtitle2">Requests</Typography>
              </Box>
              <Typography variant="h4" color="primary.main">
                {formatNumber(currentMetrics.requests)}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                in {selectedTimeframe}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <DataUsage sx={{ mr: 1, color: 'info.main' }} />
                <Typography variant="subtitle2">Tokens</Typography>
              </Box>
              <Typography variant="h4" color="info.main">
                {formatNumber(currentMetrics.tokens)}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                total processed
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Speed sx={{ mr: 1, color: 'warning.main' }} />
                <Typography variant="subtitle2">Avg Latency</Typography>
              </Box>
              <Typography variant="h4" color="warning.main">
                {currentMetrics.avgLatency}μs
              </Typography>
              <Typography variant="caption" color="text.secondary">
                per token
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <CheckCircle sx={{ mr: 1, color: 'success.main' }} />
                <Typography variant="subtitle2">Success Rate</Typography>
              </Box>
              <Typography variant="h4" color="success.main">
                {currentMetrics.successRate}%
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {currentMetrics.errors} errors
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Model Usage Breakdown */}
        <Grid item xs={12} lg={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Usage by Model
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Model</TableCell>
                      <TableCell align="right">Requests</TableCell>
                      <TableCell align="right">Tokens</TableCell>
                      <TableCell align="right">Avg Latency</TableCell>
                      <TableCell align="right">Cost</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {mockModelUsage.map((model) => (
                      <TableRow key={model.model}>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                            {model.model}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2">
                            {formatNumber(model.requests)}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2">
                            {formatNumber(model.tokens)}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Chip
                            label={`${model.latency}μs`}
                            color={model.latency < 90 ? 'success' : model.latency < 110 ? 'warning' : 'error'}
                            size="small"
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" color="text.secondary">
                            ${model.cost.toFixed(2)}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Activity
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <CheckCircle sx={{ mr: 1, color: 'success.main', fontSize: 16 }} />
                    <Typography variant="subtitle2">High Volume Detected</Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    1,247 requests in the last hour
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={75}
                    sx={{ mt: 1, height: 4, borderRadius: 2 }}
                    color="success"
                  />
                </Paper>

                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Speed sx={{ mr: 1, color: 'warning.main', fontSize: 16 }} />
                    <Typography variant="subtitle2">Performance Alert</Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    Latency spike detected on llama-2-70b
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={60}
                    sx={{ mt: 1, height: 4, borderRadius: 2 }}
                    color="warning"
                  />
                </Paper>

                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Error sx={{ mr: 1, color: 'error.main', fontSize: 16 }} />
                    <Typography variant="subtitle2">Rate Limit Warning</Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    Approaching rate limit on API key prod-****
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={85}
                    sx={{ mt: 1, height: 4, borderRadius: 2 }}
                    color="error"
                  />
                </Paper>

                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Schedule sx={{ mr: 1, color: 'info.main', fontSize: 16 }} />
                    <Typography variant="subtitle2">Scheduled Maintenance</Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    llama-2-13b maintenance in 2 hours
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={25}
                    sx={{ mt: 1, height: 4, borderRadius: 2 }}
                    color="info"
                  />
                </Paper>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}