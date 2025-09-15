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
  Stepper,
  Step,
  StepLabel,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Link as MuiLink,
} from '@mui/material'
import { Google, GitHub, Business } from '@mui/icons-material'
import { registerSchema, type RegisterInput } from '@/lib/schemas'

interface RegistrationFormProps {
  onComplete: (data: any) => Promise<void>
  onBack?: () => void
}

const steps = ['Account Details', 'Organization Setup', 'Verify Email']

const regions = [
  { id: 'us-east-1', name: 'US East (Virginia)', flag: '🇺🇸' },
  { id: 'us-west-2', name: 'US West (Oregon)', flag: '🇺🇸' },
  { id: 'eu-west-1', name: 'Europe (Ireland)', flag: '🇪🇺' },
  { id: 'ap-southeast-1', name: 'Asia Pacific (Singapore)', flag: '🇸🇬' },
]

export function RegistrationForm({ onComplete, onBack }: RegistrationFormProps) {
  const [activeStep, setActiveStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [orgData, setOrgData] = useState({
    organizationName: '',
    defaultRegion: 'us-east-1',
    useCase: '',
    acceptTerms: false,
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  })

  const handleAccountSubmit = async (data: RegisterInput) => {
    setIsLoading(true)
    setError(null)

    try {
      // Simulate account creation
      await new Promise(resolve => setTimeout(resolve, 1000))
      setActiveStep(1)
    } catch (err) {
      setError('Failed to create account. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleOrganizationSubmit = async () => {
    if (!orgData.organizationName || !orgData.acceptTerms) {
      setError('Please fill in all required fields and accept the terms.')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Simulate organization setup
      await new Promise(resolve => setTimeout(resolve, 800))
      setActiveStep(2)

      // Simulate email verification (auto-complete for demo)
      setTimeout(async () => {
        await onComplete({
          ...watch(),
          ...orgData,
          emailVerified: true,
        })
      }, 2000)
    } catch (err) {
      setError('Failed to create organization. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialSignUp = (provider: string) => {
    setError(`${provider} signup will be implemented with Auth0 integration`)
  }

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 500, mx: 'auto' }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Join MARA AI
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 4 }}>
        Get started with enterprise AI inference in under 60 seconds
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Step 1: Account Details */}
      {activeStep === 0 && (
        <Box component="form" onSubmit={handleSubmit(handleAccountSubmit)}>
          <TextField
            {...register('name')}
            label="Full Name"
            fullWidth
            margin="normal"
            error={!!errors.name}
            helperText={errors.name?.message}
            disabled={isLoading}
          />

          <TextField
            {...register('email')}
            label="Work Email"
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

          <TextField
            {...register('confirmPassword')}
            label="Confirm Password"
            type="password"
            fullWidth
            margin="normal"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            disabled={isLoading}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Button>

          <Divider sx={{ my: 2 }}>
            <Typography variant="body2" color="text.secondary">
              or continue with
            </Typography>
          </Divider>

          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Google />}
              onClick={() => handleSocialSignUp('Google')}
              disabled={isLoading}
            >
              Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<GitHub />}
              onClick={() => handleSocialSignUp('GitHub')}
              disabled={isLoading}
            >
              GitHub
            </Button>
          </Box>

          {onBack && (
            <Button
              fullWidth
              variant="text"
              onClick={onBack}
              disabled={isLoading}
            >
              Back to Sign In
            </Button>
          )}
        </Box>
      )}

      {/* Step 2: Organization Setup */}
      {activeStep === 1 && (
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Business sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h6">Organization Setup</Typography>
          </Box>

          <TextField
            label="Organization Name"
            fullWidth
            margin="normal"
            value={orgData.organizationName}
            onChange={(e) => setOrgData(prev => ({ ...prev, organizationName: e.target.value }))}
            placeholder="Your Company Name"
            disabled={isLoading}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Default Region</InputLabel>
            <Select
              value={orgData.defaultRegion}
              label="Default Region"
              onChange={(e) => setOrgData(prev => ({ ...prev, defaultRegion: e.target.value }))}
              disabled={isLoading}
            >
              {regions.map((region) => (
                <MenuItem key={region.id} value={region.id}>
                  {region.flag} {region.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Primary Use Case"
            fullWidth
            margin="normal"
            value={orgData.useCase}
            onChange={(e) => setOrgData(prev => ({ ...prev, useCase: e.target.value }))}
            placeholder="e.g., Customer support, Content generation, Data analysis"
            disabled={isLoading}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={orgData.acceptTerms}
                onChange={(e) => setOrgData(prev => ({ ...prev, acceptTerms: e.target.checked }))}
                disabled={isLoading}
              />
            }
            label={
              <Typography variant="body2">
                I agree to the{' '}
                <MuiLink href="#" color="primary">
                  Terms of Service
                </MuiLink>{' '}
                and{' '}
                <MuiLink href="#" color="primary">
                  Privacy Policy
                </MuiLink>
              </Typography>
            }
            sx={{ mt: 2 }}
          />

          <Button
            fullWidth
            variant="contained"
            onClick={handleOrganizationSubmit}
            disabled={isLoading || !orgData.organizationName || !orgData.acceptTerms}
            sx={{ mt: 3 }}
          >
            {isLoading ? 'Setting up Organization...' : 'Complete Setup'}
          </Button>
        </Box>
      )}

      {/* Step 3: Email Verification */}
      {activeStep === 2 && (
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            Verify Your Email
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            We've sent a verification email to {watch('email')}.
            Please check your inbox and click the verification link.
          </Typography>

          <Alert severity="info" sx={{ mb: 2 }}>
            For this demo, email verification will auto-complete in a few seconds...
          </Alert>

          <Button
            variant="outlined"
            onClick={() => setActiveStep(1)}
            disabled={isLoading}
          >
            Back to Organization Setup
          </Button>
        </Box>
      )}
    </Paper>
  )
}