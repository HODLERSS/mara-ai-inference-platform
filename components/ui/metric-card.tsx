import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { TrendingUp, TrendingDown } from '@mui/icons-material'

interface MetricCardProps {
  title: string
  value: string | number
  unit?: string
  trend?: {
    value: number
    isPositive: boolean
  }
  status?: 'success' | 'warning' | 'error' | 'info'
  subtitle?: string
}

export function MetricCard({
  title,
  value,
  unit = '',
  trend,
  status = 'info',
  subtitle
}: MetricCardProps) {
  const theme = useTheme()

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return theme.palette.success.main
      case 'warning': return theme.palette.warning.main
      case 'error': return theme.palette.error.main
      default: return theme.palette.info.main
    }
  }

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          {title}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Typography variant="h3" component="div" sx={{ mr: 1 }}>
            {value}
          </Typography>
          {unit && (
            <Typography variant="h5" color="text.secondary">
              {unit}
            </Typography>
          )}
        </Box>

        {subtitle && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {subtitle}
          </Typography>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip
            size="small"
            label={status.toUpperCase()}
            sx={{
              backgroundColor: getStatusColor(status),
              color: 'white',
              fontWeight: 'bold'
            }}
          />

          {trend && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              {trend.isPositive ? (
                <TrendingUp sx={{ color: theme.palette.success.main, fontSize: 16 }} />
              ) : (
                <TrendingDown sx={{ color: theme.palette.error.main, fontSize: 16 }} />
              )}
              <Typography
                variant="caption"
                sx={{
                  color: trend.isPositive ? theme.palette.success.main : theme.palette.error.main,
                  fontWeight: 'bold'
                }}
              >
                {Math.abs(trend.value)}%
              </Typography>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  )
}