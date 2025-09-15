'use client'

import { Box, useTheme } from '@mui/material'
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts'

interface UsageDataPoint {
  period: string
  tokens: number
  cost: number
  requests: number
}

interface UsageChartProps {
  data: UsageDataPoint[]
  viewMode: 'requests' | 'cost' | 'tokens'
  height?: number
}

export function UsageChart({ data, viewMode, height = 280 }: UsageChartProps) {
  const theme = useTheme()

  const getDataKey = () => {
    switch (viewMode) {
      case 'requests': return 'requests'
      case 'cost': return 'cost'
      case 'tokens': return 'tokens'
      default: return 'tokens'
    }
  }

  const getColor = () => {
    switch (viewMode) {
      case 'requests': return theme.palette.primary.main
      case 'cost': return theme.palette.warning.main
      case 'tokens': return theme.palette.success.main
      default: return theme.palette.primary.main
    }
  }

  const getGradientColor = () => {
    switch (viewMode) {
      case 'requests': return { stop1: theme.palette.primary.light, stop2: theme.palette.primary.main }
      case 'cost': return { stop1: theme.palette.warning.light, stop2: theme.palette.warning.main }
      case 'tokens': return { stop1: theme.palette.success.light, stop2: theme.palette.success.main }
      default: return { stop1: theme.palette.primary.light, stop2: theme.palette.primary.main }
    }
  }

  const formatTooltipValue = (value: number) => {
    switch (viewMode) {
      case 'requests': return [`${value.toLocaleString()} requests`, 'Requests']
      case 'cost': return [`$${value.toFixed(2)}`, 'Cost']
      case 'tokens': return [`${(value / 1000).toFixed(0)}K tokens`, 'Tokens']
      default: return [value, '']
    }
  }

  const formatYAxisValue = (value: number): string => {
    switch (viewMode) {
      case 'requests': return value.toLocaleString()
      case 'cost': return `$${value}`
      case 'tokens': return `${(value / 1000).toFixed(0)}K`
      default: return value.toString()
    }
  }

  const gradientColors = getGradientColor()

  return (
    <Box sx={{ height, width: '100%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <defs>
            <linearGradient id={`gradient-${viewMode}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={gradientColors.stop1} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={gradientColors.stop2} stopOpacity={0.1}/>
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke={theme.palette.mode === 'dark' ? '#333' : '#e0e0e0'}
            opacity={0.5}
          />

          <XAxis
            dataKey="period"
            stroke={theme.palette.text.secondary}
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            stroke={theme.palette.text.secondary}
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={formatYAxisValue}
          />

          <Tooltip
            formatter={formatTooltipValue}
            labelStyle={{
              color: theme.palette.text.primary,
              fontWeight: 'bold'
            }}
            contentStyle={{
              backgroundColor: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: '12px',
              boxShadow: theme.shadows[8],
              padding: '16px'
            }}
            cursor={{
              stroke: getColor(),
              strokeWidth: 1,
              strokeDasharray: '4 4',
              opacity: 0.5
            }}
          />

          <Area
            type="monotone"
            dataKey={getDataKey()}
            stroke={getColor()}
            strokeWidth={3}
            fill={`url(#gradient-${viewMode})`}
            dot={{
              fill: getColor(),
              strokeWidth: 2,
              stroke: theme.palette.background.paper,
              r: 4
            }}
            activeDot={{
              r: 6,
              fill: getColor(),
              stroke: theme.palette.background.paper,
              strokeWidth: 3,
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  )
}