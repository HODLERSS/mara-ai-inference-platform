'use client'

import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
} from '@mui/material'
import { useState } from 'react'
import { CostCalculator } from '@/components/ui/cost-calculator'
import { SavingsChart } from '@/components/charts/savings-chart'
import { MetricCard } from '@/components/ui/metric-card'
import { TrendingDown, AttachMoney } from '@mui/icons-material'

export default function CostAnalysisPage() {
  const [calculationResults, setCalculationResults] = useState<any>(null)

  const handleCalculation = (results: any) => {
    setCalculationResults(results)
  }

  const competitorComparison = [
    {
      provider: 'AWS Bedrock',
      model: 'Claude-3-Sonnet',
      costPer1K: '$3.00',
      maraEquivalent: '$1.50',
      savings: '50%'
    },
    {
      provider: 'Azure OpenAI',
      model: 'GPT-4-Turbo',
      costPer1K: '$30.00',
      maraEquivalent: '$15.00',
      savings: '50%'
    },
    {
      provider: 'Google Vertex AI',
      model: 'PaLM-2',
      costPer1K: '$2.50',
      maraEquivalent: '$1.25',
      savings: '50%'
    },
    {
      provider: 'OpenAI API',
      model: 'GPT-3.5-Turbo',
      costPer1K: '$2.00',
      maraEquivalent: '$0.80',
      savings: '60%'
    }
  ]

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Cost Analysis & ROI Calculator
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Demonstrate 30-50% cost savings compared to hyperscaler pricing with MARA's sovereign AI infrastructure
        </Typography>

        {/* Key Value Proposition */}
        <Alert severity="success" sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            🎯 Enterprise Value Proposition
          </Typography>
          <Typography>
            MARA delivers enterprise-grade AI inference with <strong>30-50% cost savings</strong> versus hyperscalers,
            while maintaining sub-120μs/token performance and 99%+ availability. Calculate your potential savings below.
          </Typography>
        </Alert>

        <Grid container spacing={4}>
          {/* Cost Calculator */}
          <Grid item xs={12} lg={6}>
            <CostCalculator onCalculate={handleCalculation} />
          </Grid>

          {/* Results Summary */}
          <Grid item xs={12} lg={6}>
            {calculationResults ? (
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Your ROI Summary
                  </Typography>

                  <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={6}>
                      <MetricCard
                        title="Monthly Savings"
                        value={`$${calculationResults.costs.savings.monthly.toLocaleString()}`}
                        status="success"
                        trend={{ value: calculationResults.costs.savings.percent, isPositive: true }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <MetricCard
                        title="Annual Savings"
                        value={`$${calculationResults.costs.savings.yearly.toLocaleString()}`}
                        status="success"
                        subtitle={`${calculationResults.costs.savings.percent.toFixed(1)}% reduction`}
                      />
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="subtitle1" gutterBottom>
                    Usage Details
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Model: {calculationResults.model}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Daily Requests: {calculationResults.usage.requestsPerDay.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Monthly Tokens: {calculationResults.usage.monthlyTokens.toLocaleString()}
                  </Typography>

                  <Box sx={{ mt: 3 }}>
                    <Typography variant="h4" color="success.main" align="center">
                      {calculationResults.costs.savings.percent.toFixed(1)}%
                    </Typography>
                    <Typography variant="body2" align="center" color="text.secondary">
                      Cost Reduction vs Hyperscalers
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent sx={{ textAlign: 'center', py: 8 }}>
                  <AttachMoney sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary">
                    Configure Your Usage
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Use the calculator on the left to see your potential cost savings
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Grid>

          {/* Charts */}
          {calculationResults && (
            <>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <SavingsChart data={calculationResults} type="bar" />
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <SavingsChart data={calculationResults} type="pie" />
                  </CardContent>
                </Card>
              </Grid>
            </>
          )}

          {/* Competitor Comparison */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Hyperscaler Pricing Comparison
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  MARA consistently delivers 30-50% cost savings across all major AI models compared to hyperscaler pricing
                </Typography>

                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Provider</TableCell>
                        <TableCell>Model</TableCell>
                        <TableCell align="right">Their Price</TableCell>
                        <TableCell align="right">MARA Price</TableCell>
                        <TableCell align="right">Your Savings</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {competitorComparison.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell component="th" scope="row">
                            {row.provider}
                          </TableCell>
                          <TableCell>{row.model}</TableCell>
                          <TableCell align="right">{row.costPer1K}</TableCell>
                          <TableCell align="right" sx={{ color: 'success.main', fontWeight: 'bold' }}>
                            {row.maraEquivalent}
                          </TableCell>
                          <TableCell align="right">
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1 }}>
                              <TrendingDown sx={{ color: 'success.main', fontSize: 16 }} />
                              <Typography color="success.main" fontWeight="bold">
                                {row.savings}
                              </Typography>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Enterprise Benefits */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Enterprise Benefits Beyond Cost Savings
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={3}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" color="primary">≤120μs</Typography>
                      <Typography variant="body2">Per Token Latency</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Faster than hyperscalers
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" color="primary">99.9%</Typography>
                      <Typography variant="body2">Availability SLA</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Enterprise-grade reliability
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" color="primary">Sovereign</Typography>
                      <Typography variant="body2">Data Control</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Your infrastructure, your control
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" color="primary">Multi</Typography>
                      <Typography variant="body2">Platform Support</Typography>
                      <Typography variant="caption" color="text.secondary">
                        H100, SambaNova, Etched
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}