'use client'

import {
  Card,
  CardContent,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Slider,
  Button,
} from '@mui/material'
import { useState } from 'react'

interface CostCalculatorProps {
  onCalculate: (results: any) => void
}

const models = [
  { name: 'GPT-3.5-Turbo', hyperscalerCost: 0.002, maraCost: 0.0008 },
  { name: 'GPT-4-Turbo', hyperscalerCost: 0.03, maraCost: 0.015 },
  { name: 'Llama-2-70B', hyperscalerCost: 0.0015, maraCost: 0.0012 },
  { name: 'Claude-3-Sonnet', hyperscalerCost: 0.003, maraCost: 0.0015 },
]

const usagePatterns = [
  { name: 'Development/Testing', factor: 1 },
  { name: 'Production - Low', factor: 10 },
  { name: 'Production - Medium', factor: 50 },
  { name: 'Production - High', factor: 200 },
  { name: 'Enterprise Scale', factor: 1000 },
]

export function CostCalculator({ onCalculate }: CostCalculatorProps) {
  const [selectedModel, setSelectedModel] = useState(models[0])
  const [tokensPerRequest, setTokensPerRequest] = useState(500)
  const [requestsPerDay, setRequestsPerDay] = useState(1000)
  const [usagePattern, setUsagePattern] = useState(usagePatterns[1])

  const calculateCosts = () => {
    const dailyTokens = tokensPerRequest * requestsPerDay * usagePattern.factor
    const monthlyTokens = dailyTokens * 30
    const yearlyTokens = monthlyTokens * 12

    const hyperscalerMonthlyCost = (monthlyTokens / 1000) * selectedModel.hyperscalerCost
    const maraMonthlyCost = (monthlyTokens / 1000) * selectedModel.maraCost
    const monthlySavings = hyperscalerMonthlyCost - maraMonthlyCost
    const savingsPercent = ((monthlySavings / hyperscalerMonthlyCost) * 100)

    const hyperscalerYearlyCost = hyperscalerMonthlyCost * 12
    const maraYearlyCost = maraMonthlyCost * 12
    const yearlySavings = hyperscalerYearlyCost - maraYearlyCost

    const results = {
      model: selectedModel.name,
      usage: {
        tokensPerRequest,
        requestsPerDay: requestsPerDay * usagePattern.factor,
        dailyTokens,
        monthlyTokens,
        yearlyTokens
      },
      costs: {
        hyperscaler: {
          monthly: hyperscalerMonthlyCost,
          yearly: hyperscalerYearlyCost
        },
        mara: {
          monthly: maraMonthlyCost,
          yearly: maraYearlyCost
        },
        savings: {
          monthly: monthlySavings,
          yearly: yearlySavings,
          percent: savingsPercent
        }
      }
    }

    onCalculate(results)
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Cost Calculator
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>AI Model</InputLabel>
              <Select
                value={selectedModel.name}
                label="AI Model"
                onChange={(e) => {
                  const model = models.find(m => m.name === e.target.value)
                  if (model) setSelectedModel(model)
                }}
              >
                {models.map((model) => (
                  <MenuItem key={model.name} value={model.name}>
                    {model.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Usage Pattern</InputLabel>
              <Select
                value={usagePattern.name}
                label="Usage Pattern"
                onChange={(e) => {
                  const pattern = usagePatterns.find(p => p.name === e.target.value)
                  if (pattern) setUsagePattern(pattern)
                }}
              >
                {usagePatterns.map((pattern) => (
                  <MenuItem key={pattern.name} value={pattern.name}>
                    {pattern.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography gutterBottom>
              Tokens per Request: {tokensPerRequest.toLocaleString()}
            </Typography>
            <Slider
              value={tokensPerRequest}
              onChange={(_, value) => setTokensPerRequest(value as number)}
              min={100}
              max={4000}
              step={100}
              marks={[
                { value: 100, label: '100' },
                { value: 1000, label: '1K' },
                { value: 2000, label: '2K' },
                { value: 4000, label: '4K' }
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography gutterBottom>
              Base Requests per Day: {requestsPerDay.toLocaleString()}
            </Typography>
            <Slider
              value={requestsPerDay}
              onChange={(_, value) => setRequestsPerDay(value as number)}
              min={100}
              max={10000}
              step={100}
              marks={[
                { value: 100, label: '100' },
                { value: 1000, label: '1K' },
                { value: 5000, label: '5K' },
                { value: 10000, label: '10K' }
              ]}
            />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ mt: 2, mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Actual requests per day: {(requestsPerDay * usagePattern.factor).toLocaleString()}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={calculateCosts}
              fullWidth
              size="large"
            >
              Calculate ROI
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}