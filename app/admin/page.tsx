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
  Avatar,
  Button,
  LinearProgress,
  Tab,
  Tabs,
} from '@mui/material'
import { useState } from 'react'
import { MetricCard } from '@/components/ui/metric-card'

const enterpriseCustomers = [
  {
    id: 1,
    name: 'Acme Corporation',
    logo: 'A',
    industry: 'Technology',
    monthlySpend: 45000,
    tokenUsage: 2500000,
    status: 'Active',
    contractValue: 540000,
    integrationStatus: 'Complete',
    supportTier: 'Enterprise',
    csm: 'Sarah Johnson'
  },
  {
    id: 2,
    name: 'TechFlow Industries',
    logo: 'T',
    industry: 'Manufacturing',
    monthlySpend: 32000,
    tokenUsage: 1800000,
    status: 'Active',
    contractValue: 384000,
    integrationStatus: 'In Progress',
    supportTier: 'Enterprise',
    csm: 'Mike Chen'
  },
  {
    id: 3,
    name: 'DataSync Solutions',
    logo: 'D',
    industry: 'Financial Services',
    monthlySpend: 28000,
    tokenUsage: 1600000,
    status: 'Enterprise',
    contractValue: 336000,
    integrationStatus: 'Complete',
    supportTier: 'Premium',
    csm: 'Lisa Rodriguez'
  },
  {
    id: 4,
    name: 'AI Ventures Ltd',
    logo: 'AI',
    industry: 'Healthcare',
    monthlySpend: 18000,
    tokenUsage: 1000000,
    status: 'Trial',
    contractValue: 216000,
    integrationStatus: 'Planning',
    supportTier: 'Standard',
    csm: 'David Park'
  }
]


export default function AdminPage() {
  const [tabValue, setTabValue] = useState(0)

  const totalCustomers = enterpriseCustomers.length
  const totalMonthlyUsage = enterpriseCustomers.reduce((sum, c) => sum + c.tokenUsage, 0)
  const avgLatency = 95 // μs
  const systemUptime = 99.95 // %

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Platform Administration
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Monitor platform performance, customer usage, and system health metrics
        </Typography>

        {/* Key Metrics */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              title="Total Customers"
              value={totalCustomers}
              status="success"
              subtitle="Active enterprise accounts"
              trend={{ value: 15, isPositive: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              title="Monthly Token Usage"
              value={`${(totalMonthlyUsage / 1000000).toFixed(1)}M`}
              status="success"
              subtitle="Tokens processed"
              trend={{ value: 25, isPositive: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              title="Average Latency"
              value={`${avgLatency}μs`}
              status="success"
              subtitle="Per token response time"
              trend={{ value: 8, isPositive: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              title="System Uptime"
              value={`${systemUptime}%`}
              status="success"
              subtitle="Platform availability"
              trend={{ value: 0.1, isPositive: true }}
            />
          </Grid>
        </Grid>

        {/* Tabs */}
        <Card sx={{ mb: 4 }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Customer Overview" />
            <Tab label="Usage Analytics" />
            <Tab label="Platform Health" />
          </Tabs>
        </Card>

        {/* Customer Overview Tab */}
        {tabValue === 0 && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Enterprise Customer Portfolio
                  </Typography>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Customer</TableCell>
                          <TableCell>Industry</TableCell>
                          <TableCell align="right">Monthly Spend</TableCell>
                          <TableCell align="right">Token Usage</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Integration</TableCell>
                          <TableCell>CSM</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {enterpriseCustomers.map((customer) => (
                          <TableRow key={customer.id}>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Avatar sx={{ bgcolor: 'primary.main' }}>
                                  {customer.logo}
                                </Avatar>
                                <Box>
                                  <Typography variant="subtitle2">
                                    {customer.name}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    ${customer.contractValue.toLocaleString()} ARR
                                  </Typography>
                                </Box>
                              </Box>
                            </TableCell>
                            <TableCell>{customer.industry}</TableCell>
                            <TableCell align="right">
                              ${customer.monthlySpend.toLocaleString()}
                            </TableCell>
                            <TableCell align="right">
                              {(customer.tokenUsage / 1000000).toFixed(1)}M
                            </TableCell>
                            <TableCell>
                              <Chip
                                size="small"
                                label={customer.status}
                                color={
                                  customer.status === 'Enterprise' ? 'secondary' :
                                  customer.status === 'Active' ? 'success' : 'warning'
                                }
                              />
                            </TableCell>
                            <TableCell>
                              <Chip
                                size="small"
                                label={customer.integrationStatus}
                                color={
                                  customer.integrationStatus === 'Complete' ? 'success' :
                                  customer.integrationStatus === 'In Progress' ? 'warning' : 'default'
                                }
                                variant="outlined"
                              />
                            </TableCell>
                            <TableCell>{customer.csm}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {/* Usage Analytics Tab */}
        {tabValue === 1 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Platform Usage Growth
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="h3" color="primary">
                      {(totalMonthlyUsage / 1000000).toFixed(1)}M
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Monthly Tokens Processed
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={85}
                    sx={{ mb: 1 }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    85% month-over-month growth
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Performance Metrics
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" color="success.main">
                          {avgLatency}μs
                        </Typography>
                        <Typography variant="body2">Avg Latency</Typography>
                        <Typography variant="caption" color="text.secondary">
                          Per token response
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" color="primary">
                          {systemUptime}%
                        </Typography>
                        <Typography variant="body2">System Uptime</Typography>
                        <Typography variant="caption" color="text.secondary">
                          Platform availability
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    High Usage Growth Customers
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Customers with significant usage increases
                  </Typography>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Customer</TableCell>
                          <TableCell align="right">Current Usage</TableCell>
                          <TableCell align="right">Growth Rate</TableCell>
                          <TableCell align="right">Projected Usage</TableCell>
                          <TableCell>Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>Acme Corporation</TableCell>
                          <TableCell align="right">2.5M tokens/mo</TableCell>
                          <TableCell align="right">
                            <Typography color="success.main" fontWeight="bold">+185%</Typography>
                          </TableCell>
                          <TableCell align="right">7.1M tokens/mo</TableCell>
                          <TableCell>
                            <Button size="small" variant="outlined">Monitor</Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>DataSync Solutions</TableCell>
                          <TableCell align="right">1.6M tokens/mo</TableCell>
                          <TableCell align="right">
                            <Typography color="success.main" fontWeight="bold">+240%</Typography>
                          </TableCell>
                          <TableCell align="right">5.4M tokens/mo</TableCell>
                          <TableCell>
                            <Button size="small" variant="outlined">Monitor</Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {/* Platform Health Tab */}
        {tabValue === 2 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <MetricCard
                title="System Uptime"
                value="99.95%"
                unit=""
                status="success"
                subtitle="SLA: 99.9%+ maintained"
                trend={{ value: 0.1, isPositive: true }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <MetricCard
                title="Active Models"
                value="3"
                unit=""
                status="success"
                subtitle="Llama, GPT, Claude deployed"
                trend={{ value: 50, isPositive: true }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <MetricCard
                title="Compute Platforms"
                value="3"
                unit=""
                status="success"
                subtitle="H100, SambaNova, Etched"
                trend={{ value: 200, isPositive: true }}
              />
            </Grid>

            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Platform Infrastructure Summary
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                      <Box sx={{ p: 2, textAlign: 'center', border: '1px solid', borderColor: 'success.main', borderRadius: 2 }}>
                        <Typography variant="h6" color="success.main">✅ High Availability</Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          • 99.95% uptime achieved<br/>
                          • Multi-region deployment<br/>
                          • Automatic failover enabled
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Box sx={{ p: 2, textAlign: 'center', border: '1px solid', borderColor: 'success.main', borderRadius: 2 }}>
                        <Typography variant="h6" color="success.main">✅ Model Diversity</Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          • 6+ AI models deployed<br/>
                          • 3 compute platforms<br/>
                          • Load balancing optimized
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Box sx={{ p: 2, textAlign: 'center', border: '1px solid', borderColor: 'success.main', borderRadius: 2 }}>
                        <Typography variant="h6" color="success.main">✅ Performance Excellence</Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          • Sub-120μs latency<br/>
                          • Enterprise security<br/>
                          • 24/7 monitoring
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </Box>
    </Container>
  )
}