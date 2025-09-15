'use client'

import { useState, useEffect } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  Alert,
  Container,
  Grid,
  Chip,
  LinearProgress,
  Paper,
  Divider,
} from '@mui/material'
import {
  CheckCircle,
  PlayArrow,
  Key,
  Code,
  Rocket,
  ContentCopy,
} from '@mui/icons-material'

interface OnboardingWelcomeProps {
  userData: any
  onComplete: () => void
}

const onboardingSteps = [
  'Welcome & API Key',
  'First API Call',
  'Explore Platform',
]

export function OnboardingWelcome({ userData, onComplete }: OnboardingWelcomeProps) {
  const [activeStep, setActiveStep] = useState(0)
  const [apiKey, setApiKey] = useState('')
  const [isGeneratingKey, setIsGeneratingKey] = useState(false)
  const [firstCallComplete, setFirstCallComplete] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const generateApiKey = async () => {
    setIsGeneratingKey(true)
    await new Promise(resolve => setTimeout(resolve, 1500))

    const mockApiKey = `sk-mara-${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 16)}`
    setApiKey(mockApiKey)
    setIsGeneratingKey(false)
    setActiveStep(1)
  }

  const simulateFirstCall = async () => {
    setFirstCallComplete(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setActiveStep(2)
  }

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Welcome to MARA AI, {userData?.name?.split(' ')[0]}! 🎉
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            Let's get you up and running in under 3 minutes
          </Typography>

          <Chip
            label={`Time: ${formatTime(timeElapsed)}`}
            color={timeElapsed < 180 ? 'success' : 'warning'}
            variant="outlined"
            sx={{ fontSize: '1rem', py: 1 }}
          />
        </Box>

        {/* Progress Stepper */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
              {onboardingSteps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <LinearProgress
              variant="determinate"
              value={(activeStep / (onboardingSteps.length - 1)) * 100}
              sx={{ height: 8, borderRadius: 4 }}
            />
          </CardContent>
        </Card>

        <Grid container spacing={4}>
          {/* Main Content */}
          <Grid item xs={12} md={8}>
            {/* Step 1: API Key Generation */}
            {activeStep === 0 && (
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Key sx={{ mr: 2, color: 'primary.main', fontSize: 32 }} />
                    <Typography variant="h5">Generate Your API Key</Typography>
                  </Box>

                  <Typography variant="body1" sx={{ mb: 3 }}>
                    Your API key is your secure access token for all MARA AI services.
                    Keep it safe and never share it publicly.
                  </Typography>

                  <Alert severity="info" sx={{ mb: 3 }}>
                    <strong>Organization:</strong> {userData?.organizationName}<br/>
                    <strong>Region:</strong> {userData?.defaultRegion}<br/>
                    <strong>Use Case:</strong> {userData?.useCase || 'General AI applications'}
                  </Alert>

                  <Button
                    variant="contained"
                    size="large"
                    onClick={generateApiKey}
                    disabled={isGeneratingKey}
                    startIcon={isGeneratingKey ? null : <Key />}
                    fullWidth
                  >
                    {isGeneratingKey ? 'Generating API Key...' : 'Generate My API Key'}
                  </Button>

                  {isGeneratingKey && <LinearProgress sx={{ mt: 2 }} />}
                </CardContent>
              </Card>
            )}

            {/* Step 2: First API Call */}
            {activeStep === 1 && (
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <PlayArrow sx={{ mr: 2, color: 'primary.main', fontSize: 32 }} />
                    <Typography variant="h5">Make Your First API Call</Typography>
                  </Box>

                  <Typography variant="body1" sx={{ mb: 3 }}>
                    Your API key is ready! Let's test it with a simple request to our fastest model.
                  </Typography>

                  <Paper sx={{ p: 2, bgcolor: 'grey.100', mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="subtitle2">Your API Key:</Typography>
                      <Button
                        size="small"
                        startIcon={<ContentCopy />}
                        onClick={copyApiKey}
                      >
                        Copy
                      </Button>
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: 'monospace',
                        backgroundColor: 'background.paper',
                        color: 'text.primary',
                        p: 1,
                        borderRadius: 1,
                        wordBreak: 'break-all',
                        border: 1,
                        borderColor: 'divider'
                      }}
                    >
                      {apiKey}
                    </Typography>
                  </Paper>

                  <Paper sx={{ p: 2, bgcolor: 'grey.900', color: 'white', mb: 3 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1, color: 'grey.300' }}>
                      Sample Request:
                    </Typography>
                    <pre style={{ margin: 0, fontSize: '0.875rem' }}>
{`curl -X POST https://api.mara.ai/v1/chat/completions \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "llama-2-70b",
    "messages": [{"role": "user", "content": "Hello MARA!"}],
    "max_tokens": 50
  }'`}
                    </pre>
                  </Paper>

                  <Button
                    variant="contained"
                    size="large"
                    onClick={simulateFirstCall}
                    disabled={firstCallComplete}
                    startIcon={firstCallComplete ? <CheckCircle /> : <PlayArrow />}
                    fullWidth
                  >
                    {firstCallComplete ? 'API Call Successful!' : 'Test API Call'}
                  </Button>

                  {firstCallComplete && (
                    <Alert severity="success" sx={{ mt: 2 }}>
                      <strong>Success!</strong> Your API call completed in 95ms with 47 tokens.
                      MARA is ready for your applications!
                    </Alert>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Step 3: Explore Platform */}
            {activeStep === 2 && (
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Rocket sx={{ mr: 2, color: 'primary.main', fontSize: 32 }} />
                    <Typography variant="h5">You're All Set!</Typography>
                  </Box>

                  <Typography variant="body1" sx={{ mb: 3 }}>
                    Congratulations! You've successfully set up your MARA AI account and made your first API call.
                    Here's what you can do next:
                  </Typography>

                  <Grid container spacing={2} sx={{ mb: 4 }}>
                    <Grid item xs={12} sm={6}>
                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<Code />}
                        sx={{ py: 2 }}
                      >
                        Explore API Playground
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<PlayArrow />}
                        sx={{ py: 2 }}
                      >
                        Browse Model Catalog
                      </Button>
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 3 }} />

                  <Alert severity="info" sx={{ mb: 3 }}>
                    <strong>Next Steps:</strong>
                    <br/>• Try different models in the playground
                    <br/>• Monitor your usage and costs
                    <br/>• Invite team members to your organization
                    <br/>• Set up billing for production use
                  </Alert>

                  <Button
                    variant="contained"
                    size="large"
                    onClick={onComplete}
                    startIcon={<Rocket />}
                    fullWidth
                  >
                    Enter MARA AI Platform
                  </Button>
                </CardContent>
              </Card>
            )}
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Onboarding Progress
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Target: Under 3 minutes
                  </Typography>
                  <Typography variant="h4" color={timeElapsed < 180 ? 'success.main' : 'warning.main'}>
                    {formatTime(timeElapsed)}
                  </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle2" gutterBottom>
                  Completed:
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Chip
                    icon={<CheckCircle />}
                    label="Account Created"
                    color="success"
                    variant="outlined"
                    size="small"
                  />
                  <Chip
                    icon={<CheckCircle />}
                    label="Organization Setup"
                    color="success"
                    variant="outlined"
                    size="small"
                  />
                  {apiKey && (
                    <Chip
                      icon={<CheckCircle />}
                      label="API Key Generated"
                      color="success"
                      variant="outlined"
                      size="small"
                    />
                  )}
                  {firstCallComplete && (
                    <Chip
                      icon={<CheckCircle />}
                      label="First API Call"
                      color="success"
                      variant="outlined"
                      size="small"
                    />
                  )}
                </Box>

                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle2" gutterBottom>
                  Quick Links:
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Button size="small" variant="text" fullWidth>
                    API Documentation
                  </Button>
                  <Button size="small" variant="text" fullWidth>
                    Pricing Information
                  </Button>
                  <Button size="small" variant="text" fullWidth>
                    Support Center
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}