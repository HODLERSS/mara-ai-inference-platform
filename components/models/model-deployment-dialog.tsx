'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stepper,
  Step,
  StepLabel,
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Chip,
  Alert,
  LinearProgress,
  Card,
  CardContent,
  Slider,
  Switch,
  FormControlLabel,
  Divider,
} from '@mui/material'
import {
  Settings,
  Speed,
  Rocket,
  CheckCircle,
} from '@mui/icons-material'

interface ModelDeploymentDialogProps {
  open: boolean
  onClose: () => void
  model: {
    name: string
    provider: string
    pricing: {
      perToken: number
      perHour: number
    }
    platforms: string[]
  } | null
}

const deploymentSteps = ['Configuration', 'Scaling', 'Review & Deploy']

const regions = [
  { id: 'us-east-1', name: 'US East (Virginia)', flag: '🇺🇸' },
  { id: 'us-west-2', name: 'US West (Oregon)', flag: '🇺🇸' },
  { id: 'eu-west-1', name: 'Europe (Ireland)', flag: '🇪🇺' },
  { id: 'ap-southeast-1', name: 'Asia Pacific (Singapore)', flag: '🇸🇬' },
]

export function ModelDeploymentDialog({ open, onClose, model }: ModelDeploymentDialogProps) {
  const [activeStep, setActiveStep] = useState(0)
  const [isDeploying, setIsDeploying] = useState(false)
  const [deploymentConfig, setDeploymentConfig] = useState({
    name: '',
    region: 'us-east-1',
    platform: '',
    environment: 'production',
    autoScale: true,
    minInstances: 1,
    maxInstances: 10,
    targetLatency: 100,
    enableCaching: true,
    enableLogging: true,
    enableMonitoring: true,
  })

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleDeploy = async () => {
    setIsDeploying(true)
    // Simulate deployment process
    await new Promise(resolve => setTimeout(resolve, 3000))
    setIsDeploying(false)
    onClose()
    // In real app, would show success notification or redirect to deployment dashboard
  }

  const estimatedCost = deploymentConfig.minInstances * (model?.pricing.perHour || 0) * 24 * 30

  if (!model) return null

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Rocket color="primary" />
          <Typography variant="h6">Deploy {model.name}</Typography>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {deploymentSteps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Step 1: Configuration */}
        {activeStep === 0 && (
          <Box>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Settings /> Deployment Configuration
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Deployment Name"
                  value={deploymentConfig.name}
                  onChange={(e) => setDeploymentConfig(prev => ({ ...prev, name: e.target.value }))}
                  placeholder={`${model.name.toLowerCase()}-prod`}
                  helperText="Unique identifier for this deployment"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Environment</InputLabel>
                  <Select
                    value={deploymentConfig.environment}
                    label="Environment"
                    onChange={(e) => setDeploymentConfig(prev => ({ ...prev, environment: e.target.value }))}
                  >
                    <MenuItem value="development">Development</MenuItem>
                    <MenuItem value="staging">Staging</MenuItem>
                    <MenuItem value="production">Production</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Region</InputLabel>
                  <Select
                    value={deploymentConfig.region}
                    label="Region"
                    onChange={(e) => setDeploymentConfig(prev => ({ ...prev, region: e.target.value }))}
                  >
                    {regions.map((region) => (
                      <MenuItem key={region.id} value={region.id}>
                        {region.flag} {region.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Compute Platform</InputLabel>
                  <Select
                    value={deploymentConfig.platform}
                    label="Compute Platform"
                    onChange={(e) => setDeploymentConfig(prev => ({ ...prev, platform: e.target.value }))}
                  >
                    {model.platforms.map((platform) => (
                      <MenuItem key={platform} value={platform}>
                        {platform}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Advanced Settings
              </Typography>

              <FormControlLabel
                control={
                  <Switch
                    checked={deploymentConfig.enableCaching}
                    onChange={(e) => setDeploymentConfig(prev => ({ ...prev, enableCaching: e.target.checked }))}
                  />
                }
                label="Enable response caching"
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={deploymentConfig.enableLogging}
                    onChange={(e) => setDeploymentConfig(prev => ({ ...prev, enableLogging: e.target.checked }))}
                  />
                }
                label="Enable request logging"
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={deploymentConfig.enableMonitoring}
                    onChange={(e) => setDeploymentConfig(prev => ({ ...prev, enableMonitoring: e.target.checked }))}
                  />
                }
                label="Enable monitoring and alerts"
              />
            </Box>
          </Box>
        )}

        {/* Step 2: Scaling */}
        {activeStep === 1 && (
          <Box>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Speed /> Auto-Scaling Configuration
            </Typography>

            <FormControlLabel
              control={
                <Switch
                  checked={deploymentConfig.autoScale}
                  onChange={(e) => setDeploymentConfig(prev => ({ ...prev, autoScale: e.target.checked }))}
                />
              }
              label="Enable auto-scaling"
              sx={{ mb: 3 }}
            />

            {deploymentConfig.autoScale && (
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    Minimum Instances: {deploymentConfig.minInstances}
                  </Typography>
                  <Slider
                    value={deploymentConfig.minInstances}
                    onChange={(_, value) => setDeploymentConfig(prev => ({ ...prev, minInstances: value as number }))}
                    min={1}
                    max={5}
                    marks
                    valueLabelDisplay="auto"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    Maximum Instances: {deploymentConfig.maxInstances}
                  </Typography>
                  <Slider
                    value={deploymentConfig.maxInstances}
                    onChange={(_, value) => setDeploymentConfig(prev => ({ ...prev, maxInstances: value as number }))}
                    min={deploymentConfig.minInstances}
                    max={20}
                    marks
                    valueLabelDisplay="auto"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom>
                    Target Latency: {deploymentConfig.targetLatency}μs
                  </Typography>
                  <Slider
                    value={deploymentConfig.targetLatency}
                    onChange={(_, value) => setDeploymentConfig(prev => ({ ...prev, targetLatency: value as number }))}
                    min={50}
                    max={200}
                    step={10}
                    marks={[
                      { value: 50, label: '50μs' },
                      { value: 100, label: '100μs' },
                      { value: 150, label: '150μs' },
                      { value: 200, label: '200μs' },
                    ]}
                    valueLabelDisplay="auto"
                  />
                </Grid>
              </Grid>
            )}

            <Alert severity="info" sx={{ mt: 3 }}>
              Auto-scaling will automatically adjust the number of instances based on request volume and latency targets.
              You'll only pay for the compute resources you actually use.
            </Alert>
          </Box>
        )}

        {/* Step 3: Review & Deploy */}
        {activeStep === 2 && (
          <Box>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CheckCircle /> Review Deployment
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom>
                      Configuration Summary
                    </Typography>

                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">Model:</Typography>
                        <Typography variant="body2">{model.name}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">Provider:</Typography>
                        <Typography variant="body2">{model.provider}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">Deployment Name:</Typography>
                        <Typography variant="body2">{deploymentConfig.name || `${model.name.toLowerCase()}-prod`}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">Environment:</Typography>
                        <Chip size="small" label={deploymentConfig.environment} />
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">Region:</Typography>
                        <Typography variant="body2">
                          {regions.find(r => r.id === deploymentConfig.region)?.flag}{' '}
                          {regions.find(r => r.id === deploymentConfig.region)?.name}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">Platform:</Typography>
                        <Typography variant="body2">{deploymentConfig.platform}</Typography>
                      </Grid>
                    </Grid>

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="subtitle2" gutterBottom>
                      Scaling Configuration
                    </Typography>
                    <Typography variant="body2">
                      {deploymentConfig.autoScale ? (
                        <>Auto-scaling: {deploymentConfig.minInstances}-{deploymentConfig.maxInstances} instances</>
                      ) : (
                        <>Fixed: {deploymentConfig.minInstances} instance(s)</>
                      )}
                    </Typography>
                    <Typography variant="body2">
                      Target latency: {deploymentConfig.targetLatency}μs
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={4}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom>
                      Cost Estimate
                    </Typography>

                    <Typography variant="h4" color="primary.main" gutterBottom>
                      ${estimatedCost.toFixed(0)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      per month (minimum configuration)
                    </Typography>

                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Base rate: ${model.pricing.perHour}/hour per instance
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Token pricing: ${model.pricing.perToken}/1K tokens
                      </Typography>
                    </Box>

                    <Alert severity="info" sx={{ mt: 2 }}>
                      <Typography variant="caption">
                        Actual costs may vary based on usage patterns and auto-scaling.
                      </Typography>
                    </Alert>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {isDeploying && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="body2" gutterBottom>
                  Deploying model...
                </Typography>
                <LinearProgress />
              </Box>
            )}
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={isDeploying}>
          Cancel
        </Button>
        {activeStep > 0 && (
          <Button onClick={handleBack} disabled={isDeploying}>
            Back
          </Button>
        )}
        {activeStep < deploymentSteps.length - 1 ? (
          <Button
            onClick={handleNext}
            variant="contained"
            disabled={
              (activeStep === 0 && (!deploymentConfig.name && !deploymentConfig.platform)) ||
              isDeploying
            }
          >
            Next
          </Button>
        ) : (
          <Button
            onClick={handleDeploy}
            variant="contained"
            disabled={isDeploying}
            startIcon={isDeploying ? null : <Rocket />}
          >
            {isDeploying ? 'Deploying...' : 'Deploy Model'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}