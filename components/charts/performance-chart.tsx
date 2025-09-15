'use client'

import { Box, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface PerformanceChartProps {
  title: string
  data: any[]
  dataKey: string
  color: string
  unit?: string
}

export function PerformanceChart({ title, data, dataKey, color, unit = '' }: PerformanceChartProps) {
  const theme = useTheme()

  return (
    <Box sx={{ height: 300 }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={theme.palette.mode === 'dark' ? '#333' : '#e0e0e0'}
          />
          <XAxis
            dataKey="time"
            stroke={theme.palette.text.secondary}
            fontSize={12}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            fontSize={12}
          />
          <Tooltip
            formatter={(value: any) => [`${value}${unit}`, title]}
            labelStyle={{ color: theme.palette.text.primary }}
            contentStyle={{
              backgroundColor: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: '8px',
            }}
          />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={color || theme.palette.primary.main}
            strokeWidth={3}
            dot={false}
            activeDot={{
              r: 6,
              fill: color || theme.palette.primary.main,
              stroke: theme.palette.background.paper,
              strokeWidth: 2
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  )
}