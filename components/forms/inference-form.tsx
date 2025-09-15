'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Paper,
  Slider,
  FormControlLabel,
  Switch,
  MenuItem,
} from '@mui/material'
import { inferenceRequestSchema, type InferenceRequest } from '@/lib/schemas'

interface InferenceFormProps {
  onSubmit: (data: InferenceRequest) => Promise<void>
}

const AVAILABLE_MODELS = [
  'llama-2-70b',
  'gpt-3.5-turbo',
  'claude-3-sonnet',
]

export function InferenceForm({ onSubmit }: InferenceFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<InferenceRequest>({
    resolver: zodResolver(inferenceRequestSchema),
    defaultValues: {
      maxTokens: 100,
      temperature: 0.7,
      stream: false,
    },
  })

  const temperature = watch('temperature')
  const maxTokens = watch('maxTokens')

  const handleFormSubmit = async (data: InferenceRequest) => {
    setIsLoading(true)
    setError(null)

    try {
      await onSubmit(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Inference failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        AI Inference Request
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
        <TextField
          {...register('model')}
          select
          label="Model"
          fullWidth
          margin="normal"
          error={!!errors.model}
          helperText={errors.model?.message}
          disabled={isLoading}
        >
          {AVAILABLE_MODELS.map((model) => (
            <MenuItem key={model} value={model}>
              {model}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          {...register('prompt')}
          label="Prompt"
          multiline
          rows={4}
          fullWidth
          margin="normal"
          error={!!errors.prompt}
          helperText={errors.prompt?.message}
          disabled={isLoading}
        />

        <Box sx={{ mt: 3, mb: 2 }}>
          <Typography gutterBottom>
            Max Tokens: {maxTokens}
          </Typography>
          <Slider
            value={maxTokens}
            onChange={(_, value) => setValue('maxTokens', value as number)}
            min={1}
            max={4000}
            step={10}
            disabled={isLoading}
          />
        </Box>

        <Box sx={{ mt: 3, mb: 2 }}>
          <Typography gutterBottom>
            Temperature: {temperature.toFixed(1)}
          </Typography>
          <Slider
            value={temperature}
            onChange={(_, value) => setValue('temperature', value as number)}
            min={0}
            max={2}
            step={0.1}
            disabled={isLoading}
          />
        </Box>

        <FormControlLabel
          control={
            <Switch
              {...register('stream')}
              disabled={isLoading}
            />
          }
          label="Stream Response"
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Submit Inference Request'}
        </Button>
      </Box>
    </Paper>
  )
}