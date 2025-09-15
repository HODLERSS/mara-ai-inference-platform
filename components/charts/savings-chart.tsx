'use client'

import { Box, Typography } from '@mui/material'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

interface SavingsChartProps {
  data: any
  type: 'bar' | 'pie'
}


export function SavingsChart({ data, type }: SavingsChartProps) {
  if (!data) {
    return (
      <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography color="text.secondary">
          Configure parameters above to see cost comparison
        </Typography>
      </Box>
    )
  }

  if (type === 'bar') {
    const chartData = [
      {
        name: 'Monthly Cost',
        Hyperscaler: data.costs.hyperscaler.monthly,
        MARA: data.costs.mara.monthly,
        Savings: data.costs.savings.monthly
      },
      {
        name: 'Yearly Cost',
        Hyperscaler: data.costs.hyperscaler.yearly,
        MARA: data.costs.mara.yearly,
        Savings: data.costs.savings.yearly
      }
    ]

    return (
      <Box sx={{ height: 300 }}>
        <Typography variant="h6" gutterBottom>
          Cost Comparison: {data.model}
        </Typography>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} />
            <Tooltip
              formatter={(value: any, name: string) => [
                `$${value.toLocaleString()}`,
                name
              ]}
            />
            <Bar dataKey="Hyperscaler" fill="#ff6b6b" name="Hyperscaler Cost" />
            <Bar dataKey="MARA" fill="#4ecdc4" name="MARA Cost" />
            <Bar dataKey="Savings" fill="#45b7d1" name="Your Savings" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    )
  }

  if (type === 'pie') {
    const pieData = [
      { name: 'MARA Cost', value: data.costs.mara.yearly, color: '#4ecdc4' },
      { name: 'Savings', value: data.costs.savings.yearly, color: '#45b7d1' }
    ]

    return (
      <Box sx={{ height: 300 }}>
        <Typography variant="h6" gutterBottom>
          Annual Cost Breakdown
        </Typography>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value, percent }: any) =>
                `${name}: $${value.toLocaleString()} (${(percent * 100).toFixed(1)}%)`
              }
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: any) => [`$${value.toLocaleString()}`]}
            />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    )
  }

  return null
}