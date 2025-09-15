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
} from '@mui/material'
import { loginSchema, type LoginInput } from '@/lib/schemas'

interface LoginFormProps {
  onSubmit: (data: LoginInput) => Promise<void>
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  })

  const handleFormSubmit = async (data: LoginInput) => {
    setIsLoading(true)
    setError(null)

    try {
      await onSubmit(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: 'auto' }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Sign In
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
        <TextField
          {...register('email')}
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          error={!!errors.email}
          helperText={errors.email?.message}
          disabled={isLoading}
        />

        <TextField
          {...register('password')}
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          error={!!errors.password}
          helperText={errors.password?.message}
          disabled={isLoading}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={isLoading}
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </Button>
      </Box>
    </Paper>
  )
}