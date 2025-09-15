import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Divider,
} from '@mui/material'
import { formatLatency, formatTokenCount } from '@/lib/utils'

interface InferenceCardProps {
  id: string
  model: string
  prompt: string
  response?: string | null
  tokensUsed?: number | null
  latencyMs?: number | null
  status: string
  createdAt: Date
  completedAt?: Date | null
}

export function InferenceCard({
  model,
  prompt,
  response,
  tokensUsed,
  latencyMs,
  status,
  createdAt,
  completedAt,
}: InferenceCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'success'
      case 'PROCESSING':
        return 'warning'
      case 'FAILED':
        return 'error'
      default:
        return 'default'
    }
  }

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6" component="h3">
            {model}
          </Typography>
          <Chip
            label={status}
            color={getStatusColor(status) as any}
            size="small"
          />
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          <strong>Prompt:</strong> {prompt}
        </Typography>

        {response && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body2" sx={{ mb: 2 }}>
              <strong>Response:</strong> {response}
            </Typography>
          </>
        )}

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 2 }}>
          {tokensUsed && (
            <Typography variant="caption" color="text.secondary">
              Tokens: {formatTokenCount(tokensUsed)}
            </Typography>
          )}
          {latencyMs && (
            <Typography variant="caption" color="text.secondary">
              Latency: {formatLatency(latencyMs)}
            </Typography>
          )}
          <Typography variant="caption" color="text.secondary">
            Created: {createdAt.toLocaleString()}
          </Typography>
          {completedAt && (
            <Typography variant="caption" color="text.secondary">
              Completed: {completedAt.toLocaleString()}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  )
}