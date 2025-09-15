'use client'

import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material'
import { MetricCard } from '@/components/ui/metric-card'
import { PerformanceChart } from '@/components/charts/performance-chart'

// Mock data for performance metrics
const generateLatencyData = () => {
  const data = []
  const now = new Date()
  for (let i = 23; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000)
    data.push({
      time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      latency: Math.floor(Math.random() * 40) + 80, // 80-120μs
      throughput: Math.floor(Math.random() * 5000) + 15000, // 15k-20k requests/sec
      availability: 99.9 + Math.random() * 0.1, // 99.9-100%
    })
  }
  return data
}

const latencyData = generateLatencyData()

const recentInferences = [
  { id: 'req_001', model: 'Llama-3.1-70B', latency: 95, tokens: 150, status: 'completed', customer: 'Acme Corp' },
  { id: 'req_002', model: 'Mixtral-8x7B', latency: 87, tokens: 230, status: 'completed', customer: 'TechFlow Inc' },
  { id: 'req_003', model: 'CodeLlama-34B', latency: 102, tokens: 180, status: 'completed', customer: 'DataSync Ltd' },
  { id: 'req_004', model: 'Llama-3.1-405B', latency: 78, tokens: 95, status: 'completed', customer: 'AI Ventures' },
  { id: 'req_005', model: 'Qwen2-72B', latency: 115, tokens: 340, status: 'processing', customer: 'InnovateCo' },
]

export default function PerformancePage() {
  const avgLatency = latencyData.reduce((sum, item) => sum + item.latency, 0) / latencyData.length
  const currentThroughput = latencyData[latencyData.length - 1]?.throughput || 0
  const currentAvailability = latencyData[latencyData.length - 1]?.availability || 0

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Performance Command Center
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Real-time monitoring of MARA AI Inference Platform performance metrics
        </Typography>

        {/* Key Metrics */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              title="Average Latency"
              value={Math.round(avgLatency)}
              unit="μs/token"
              status="success"
              subtitle="Sub-120μs target achieved"
              trend={{ value: 15, isPositive: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              title="System Availability"
              value={currentAvailability.toFixed(2)}
              unit="%"
              status="success"
              subtitle="99%+ uptime maintained"
              trend={{ value: 0.1, isPositive: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              title="Throughput"
              value={(currentThroughput / 1000).toFixed(1)}
              unit="K req/sec"
              status="success"
              subtitle="High-volume processing"
              trend={{ value: 8, isPositive: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              title="Cost Savings"
              value="47"
              unit="%"
              status="success"
              subtitle="vs hyperscaler pricing"
              trend={{ value: 3, isPositive: true }}
            />
          </Grid>
        </Grid>

        {/* Performance Charts */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <PerformanceChart
                  title="Latency Over Time (μs/token)"
                  data={latencyData}
                  dataKey="latency"
                  color="#F1A800"
                  unit="μs"
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <PerformanceChart
                  title="System Availability (%)"
                  data={latencyData}
                  dataKey="availability"
                  color="#4caf50"
                  unit="%"
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <PerformanceChart
                  title="Request Throughput (req/sec)"
                  data={latencyData}
                  dataKey="throughput"
                  color="#F3B629"
                  unit=" req/sec"
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Recent Inference Requests
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Request ID</TableCell>
                        <TableCell>Model</TableCell>
                        <TableCell>Latency (μs)</TableCell>
                        <TableCell>Tokens</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {recentInferences.map((inference) => (
                        <TableRow key={inference.id}>
                          <TableCell>{inference.id}</TableCell>
                          <TableCell>{inference.model}</TableCell>
                          <TableCell>{inference.latency}μs</TableCell>
                          <TableCell>{inference.tokens}</TableCell>
                          <TableCell>
                            <Chip
                              size="small"
                              label={inference.status}
                              color={inference.status === 'completed' ? 'success' : 'warning'}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Platform Health Summary */}
        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Multi-Platform Performance Summary
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center', p: 2 }}>
                  <Typography variant="h4" color="primary">3</Typography>
                  <Typography variant="body2" color="text.secondary">
                    LLMs Deployed
                  </Typography>
                  <Typography variant="caption" display="block">
                    Llama-2, GPT-3.5, Claude-3
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center', p: 2 }}>
                  <Typography variant="h4" color="primary">3</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Compute Platforms
                  </Typography>
                  <Typography variant="caption" display="block">
                    H100, SambaNova, Etched
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center', p: 2 }}>
                  <Typography variant="h4" color="primary">99.95%</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Uptime SLA Met
                  </Typography>
                  <Typography variant="caption" display="block">
                    Exceeding enterprise requirements
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Container>
  )
}