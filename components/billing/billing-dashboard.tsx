'use client'

import { useState, useEffect } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Button,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  IconButton,
  Tooltip,
} from '@mui/material'
import {
  AttachMoney,
  TrendingUp,
  TrendingDown,
  Schedule,
  CheckCircle,
  Download,
  CreditCard,
  Analytics,
  Settings,
  CardGiftcard,
  AccountBalance,
} from '@mui/icons-material'

interface BillingPeriod {
  period: string
  usage: number
  cost: number
  tokens: number
  requests: number
  status: 'current' | 'past' | 'upcoming'
}

interface ModelCost {
  model: string
  requests: number
  tokens: number
  cost: number
  avgCostPerRequest: number
}

const mockBillingHistory: BillingPeriod[] = [
  { period: 'November 2024', usage: 89.2, cost: 2847.35, tokens: 1847293, requests: 23847, status: 'current' },
  { period: 'October 2024', usage: 95.1, cost: 3021.88, tokens: 1965432, requests: 25134, status: 'past' },
  { period: 'September 2024', usage: 76.3, cost: 2431.67, tokens: 1587643, requests: 20847, status: 'past' },
  { period: 'August 2024', usage: 82.7, cost: 2634.21, tokens: 1724531, requests: 22156, status: 'past' },
]

const mockModelCosts: ModelCost[] = [
  { model: 'llama-2-70b', requests: 8947, tokens: 487321, cost: 1247.83, avgCostPerRequest: 0.139 },
  { model: 'llama-2-13b', requests: 6823, tokens: 312847, cost: 698.45, avgCostPerRequest: 0.102 },
  { model: 'mixtral-8x7b', requests: 4721, tokens: 287934, cost: 547.32, avgCostPerRequest: 0.116 },
  { model: 'codellama-34b', requests: 3356, tokens: 198476, cost: 353.75, avgCostPerRequest: 0.105 },
]

export function BillingDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('November 2024')
  const [creditBalance, setCreditBalance] = useState(20) // Mock credit balance
  const [creditHistory, setCreditHistory] = useState([
    { date: new Date(), amount: 20, type: 'PROMOTIONAL', description: 'Welcome bonus: First token in 3 minutes!' },
    { date: new Date(Date.now() - 86400000), amount: -2.45, type: 'USAGE', description: 'API usage: llama-2-70b' },
  ])

  const currentUsage = mockBillingHistory[0]
  const previousUsage = mockBillingHistory[1]
  const usageGrowth = ((currentUsage.cost - previousUsage.cost) / previousUsage.cost) * 100

  const monthlyLimit = 5000
  const usagePercentage = (currentUsage.cost / monthlyLimit) * 100

  return (
    <Box>
      {/* Credits Alert */}
      {creditBalance > 0 && (
        <Alert
          severity="success"
          icon={<CardGiftcard />}
          sx={{ mb: 3 }}
        >
          <Typography variant="subtitle2" fontWeight="bold">
            You have ${creditBalance.toFixed(2)} in credits available!
          </Typography>
          <Typography variant="body2">
            Credits will be automatically applied to your next API calls.
          </Typography>
        </Alert>
      )}

      {/* Current Usage Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <AttachMoney sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">Current Month</Typography>
              </Box>
              <Typography variant="h3" color="primary.main">
                ${currentUsage.cost.toFixed(0)}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                {usageGrowth > 0 ? (
                  <TrendingUp sx={{ fontSize: 16, color: 'error.main', mr: 0.5 }} />
                ) : (
                  <TrendingDown sx={{ fontSize: 16, color: 'success.main', mr: 0.5 }} />
                )}
                <Typography
                  variant="caption"
                  color={usageGrowth > 0 ? 'error.main' : 'success.main'}
                >
                  {Math.abs(usageGrowth).toFixed(1)}% vs last month
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Analytics sx={{ mr: 1, color: 'info.main' }} />
                <Typography variant="h6">Usage Limit</Typography>
              </Box>
              <Typography variant="h3" color="info.main">
                {usagePercentage.toFixed(0)}%
              </Typography>
              <LinearProgress
                variant="determinate"
                value={usagePercentage}
                sx={{ mt: 1, height: 6, borderRadius: 3 }}
                color={usagePercentage > 80 ? 'error' : usagePercentage > 60 ? 'warning' : 'info'}
              />
              <Typography variant="caption" color="text.secondary">
                ${currentUsage.cost.toFixed(0)} of ${monthlyLimit} limit
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Schedule sx={{ mr: 1, color: 'success.main' }} />
                <Typography variant="h6">Avg Daily Cost</Typography>
              </Box>
              <Typography variant="h3" color="success.main">
                ${(currentUsage.cost / 30).toFixed(0)}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                based on current usage
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <CardGiftcard sx={{ mr: 1, color: 'success.main' }} />
                <Typography variant="h6">Credit Balance</Typography>
              </Box>
              <Typography variant="h3" color="success.main">
                ${creditBalance.toFixed(0)}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                available for use
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Usage Alerts */}
      {usagePercentage > 80 && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          <Typography variant="subtitle2" gutterBottom>
            High Usage Alert
          </Typography>
          You've used {usagePercentage.toFixed(0)}% of your monthly limit. Consider upgrading your plan or optimizing usage.
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Cost Breakdown by Model */}
        <Grid item xs={12} lg={8}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Cost Breakdown by Model</Typography>
                <Tooltip title="Download detailed report">
                  <IconButton size="small">
                    <Download />
                  </IconButton>
                </Tooltip>
              </Box>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Model</TableCell>
                      <TableCell align="right">Requests</TableCell>
                      <TableCell align="right">Tokens</TableCell>
                      <TableCell align="right">Total Cost</TableCell>
                      <TableCell align="right">Cost/Request</TableCell>
                      <TableCell align="right">% of Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {mockModelCosts.map((model) => {
                      const percentage = (model.cost / currentUsage.cost) * 100
                      return (
                        <TableRow key={model.model}>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                              {model.model}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            {model.requests.toLocaleString()}
                          </TableCell>
                          <TableCell align="right">
                            {model.tokens.toLocaleString()}
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                              ${model.cost.toFixed(2)}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="body2" color="text.secondary">
                              ${model.avgCostPerRequest.toFixed(3)}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                              <LinearProgress
                                variant="determinate"
                                value={percentage}
                                sx={{ width: 60, mr: 1, height: 4, borderRadius: 2 }}
                              />
                              <Typography variant="caption">
                                {percentage.toFixed(0)}%
                              </Typography>
                            </Box>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Billing Information & History */}
        <Grid item xs={12} lg={4}>
          {/* Credit History Card */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AccountBalance sx={{ mr: 1, color: 'success.main' }} />
                <Typography variant="h6">Credit History</Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Available Balance
                </Typography>
                <Typography variant="h5" color="success.main">
                  ${creditBalance.toFixed(2)}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle2" gutterBottom>
                Recent Transactions
              </Typography>
              {creditHistory.map((transaction, index) => (
                <Paper key={index} variant="outlined" sx={{ p: 1.5, mb: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="body2">
                        {transaction.description}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {transaction.date.toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Typography
                      variant="subtitle2"
                      color={transaction.amount > 0 ? 'success.main' : 'text.primary'}
                      fontWeight="bold"
                    >
                      {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                    </Typography>
                  </Box>
                </Paper>
              ))}
            </CardContent>
          </Card>

          {/* Billing Information Card */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CreditCard sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">Billing Information</Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Current Plan
                </Typography>
                <Chip label="Enterprise Pro" color="primary" sx={{ mb: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  $5,000/month • 2M tokens included
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Payment Method
                </Typography>
                <Typography variant="body2">
                  •••• •••• •••• 4242
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Expires 12/2027
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                <Button size="small" variant="outlined" startIcon={<Settings />}>
                  Manage
                </Button>
                <Button size="small" variant="outlined" startIcon={<Download />}>
                  Invoice
                </Button>
              </Box>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Billing History
              </Typography>

              <FormControl size="small" fullWidth sx={{ mb: 2 }}>
                <InputLabel>Period</InputLabel>
                <Select
                  value={selectedPeriod}
                  label="Period"
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                >
                  {mockBillingHistory.map((period) => (
                    <MenuItem key={period.period} value={period.period}>
                      {period.period}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {mockBillingHistory.map((period) => (
                <Paper
                  key={period.period}
                  variant="outlined"
                  sx={{
                    p: 2,
                    mb: 1,
                    bgcolor: period.status === 'current' ? 'action.selected' : 'background.paper'
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle2">
                      {period.period}
                    </Typography>
                    <Chip
                      icon={period.status === 'current' ? <Schedule /> : <CheckCircle />}
                      label={period.status}
                      size="small"
                      color={period.status === 'current' ? 'primary' : 'success'}
                      variant="outlined"
                    />
                  </Box>
                  <Typography variant="h6" color="primary.main">
                    ${period.cost.toFixed(2)}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {period.requests.toLocaleString()} requests • {(period.tokens / 1000000).toFixed(1)}M tokens
                  </Typography>
                </Paper>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}