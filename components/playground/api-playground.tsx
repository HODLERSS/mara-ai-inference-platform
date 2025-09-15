'use client'

import { useState, useEffect } from 'react'
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Switch,
  FormControlLabel,
  Alert,
  Divider,
  Chip,
  LinearProgress,
  Paper,
} from '@mui/material'
import { PlayArrow, Stop, History } from '@mui/icons-material'
import { CodeGenerator } from './code-generator'

const AVAILABLE_MODELS = [
  { id: 'llama-3.1-405b', name: 'Llama-3.1-405B', provider: 'Meta' },
  { id: 'llama-3.1-70b', name: 'Llama-3.1-70B', provider: 'Meta' },
  { id: 'llama-3.1-8b', name: 'Llama-3.1-8B', provider: 'Meta' },
  { id: 'mixtral-8x7b', name: 'Mixtral-8x7B', provider: 'Mistral AI' },
  { id: 'mixtral-8x22b', name: 'Mixtral-8x22B', provider: 'Mistral AI' },
  { id: 'codellama-34b', name: 'CodeLlama-34B', provider: 'Meta' },
  { id: 'qwen2-72b', name: 'Qwen2-72B', provider: 'Alibaba' },
  { id: 'phi-3-medium', name: 'Phi-3-Medium', provider: 'Microsoft' },
  { id: 'gemma-2-27b', name: 'Gemma-2-27B', provider: 'Google' },
  { id: 'falcon-180b', name: 'Falcon-180B', provider: 'TII' }
]

interface PlaygroundRequest {
  model: string
  prompt: string
  maxTokens: number
  temperature: number
  stream: boolean
}

interface PlaygroundResponse {
  id: string
  response: string
  tokensUsed: number
  latencyMs: number
  ttftMs: number
  throughput: number
  timestamp: Date
  cost: number
}

interface ApiPlaygroundProps {
  selectedModel?: string | null
}

export function ApiPlayground({ selectedModel: modelFromUrl }: ApiPlaygroundProps) {
  const [request, setRequest] = useState<PlaygroundRequest>({
    model: 'llama-3.1-70b',
    prompt: 'Explain quantum computing in simple terms.',
    maxTokens: 500,
    temperature: 0.7,
    stream: false,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState<PlaygroundResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [requestHistory, setRequestHistory] = useState<PlaygroundResponse[]>([])

  // Convert model name to ID format (e.g., "Llama-3.1-70B" -> "llama-3.1-70b")
  const convertModelNameToId = (modelName: string) => {
    return modelName.toLowerCase().replace(/[^a-z0-9]/g, '-')
  }

  // Set model from URL parameter if provided
  useEffect(() => {
    if (modelFromUrl) {
      // Try direct match first
      const directMatch = AVAILABLE_MODELS.find(model => model.id === modelFromUrl)
      if (directMatch) {
        setRequest(prev => ({ ...prev, model: modelFromUrl }))
        return
      }

      // Try converting the model name format
      const convertedId = convertModelNameToId(modelFromUrl)
      const convertedMatch = AVAILABLE_MODELS.find(model => model.id === convertedId)
      if (convertedMatch) {
        setRequest(prev => ({ ...prev, model: convertedId }))
      }
    }
  }, [modelFromUrl])

  const handleSubmit = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Simulate API call with realistic timing
      const startTime = Date.now()

      // Simulate Time to First Token
      await new Promise(resolve => setTimeout(resolve, 80 + Math.random() * 40)) // 80-120ms

      const ttft = Date.now() - startTime

      // Simulate response generation
      await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 500)) // 300-800ms total

      const totalLatency = Date.now() - startTime

      const mockResponse: PlaygroundResponse = {
        id: `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        response: `This is a simulated response for the prompt: "${request.prompt.slice(0, 50)}..."\n\nQuantum computing harnesses quantum mechanical phenomena like superposition and entanglement to process information in fundamentally different ways than classical computers. While classical bits can only be 0 or 1, quantum bits (qubits) can exist in multiple states simultaneously, allowing quantum computers to explore many computational paths at once.\n\nThis parallelism gives quantum computers the potential to solve certain types of problems exponentially faster than classical computers, particularly in areas like cryptography, optimization, and simulation of quantum systems.`,
        tokensUsed: Math.floor(Math.random() * request.maxTokens * 0.8) + 50,
        latencyMs: totalLatency,
        ttftMs: ttft,
        throughput: Math.floor(Math.random() * 5000) + 15000, // tokens/sec
        timestamp: new Date(),
        cost: (Math.floor(Math.random() * request.maxTokens * 0.8) + 50) * 0.0015 / 1000, // $0.0015 per 1K tokens
      }

      setResponse(mockResponse)
      setRequestHistory(prev => [mockResponse, ...prev.slice(0, 9)]) // Keep last 10
    } catch (err) {
      setError('Failed to process request. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const currentModel = AVAILABLE_MODELS.find(m => m.id === request.model)

  return (
    <Box sx={{ height: '100vh', overflow: 'hidden' }}>
      <Grid container sx={{ height: '100%' }}>
        {/* Left Panel - Request Configuration */}
        <Grid item xs={12} md={4} sx={{ borderRight: 1, borderColor: 'divider', height: '100%', overflow: 'auto' }}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Request Configuration
            </Typography>

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Model</InputLabel>
              <Select
                value={request.model}
                label="Model"
                onChange={(e) => setRequest(prev => ({ ...prev, model: e.target.value }))}
              >
                {AVAILABLE_MODELS.map((model) => (
                  <MenuItem key={model.id} value={model.id}>
                    <Box>
                      <Typography variant="body2">{model.name}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        by {model.provider}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              multiline
              rows={6}
              label="Prompt"
              value={request.prompt}
              onChange={(e) => setRequest(prev => ({ ...prev, prompt: e.target.value }))}
              sx={{ mb: 3 }}
              placeholder="Enter your prompt here..."
            />

            <Box sx={{ mb: 3 }}>
              <Typography gutterBottom>
                Max Tokens: {request.maxTokens}
              </Typography>
              <Slider
                value={request.maxTokens}
                onChange={(_, value) => setRequest(prev => ({ ...prev, maxTokens: value as number }))}
                min={1}
                max={4000}
                step={10}
                marks={[
                  { value: 100, label: '100' },
                  { value: 1000, label: '1K' },
                  { value: 2000, label: '2K' },
                  { value: 4000, label: '4K' }
                ]}
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography gutterBottom>
                Temperature: {request.temperature.toFixed(1)}
              </Typography>
              <Slider
                value={request.temperature}
                onChange={(_, value) => setRequest(prev => ({ ...prev, temperature: value as number }))}
                min={0}
                max={2}
                step={0.1}
                marks={[
                  { value: 0, label: '0' },
                  { value: 1, label: '1' },
                  { value: 2, label: '2' }
                ]}
              />
            </Box>

            <FormControlLabel
              control={
                <Switch
                  checked={request.stream}
                  onChange={(e) => setRequest(prev => ({ ...prev, stream: e.target.checked }))}
                />
              }
              label="Stream Response"
              sx={{ mb: 3 }}
            />

            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleSubmit}
              disabled={isLoading || !request.prompt.trim()}
              startIcon={isLoading ? <Stop /> : <PlayArrow />}
              sx={{ mb: 2 }}
            >
              {isLoading ? 'Processing...' : 'Send Request'}
            </Button>

            {currentModel && (
              <Alert severity="info" sx={{ mb: 2 }}>
                <Typography variant="caption">
                  Using {currentModel.name} • ~95μs/token • $0.0015/1K tokens
                </Typography>
              </Alert>
            )}

            {/* Request History */}
            {requestHistory.length > 0 && (
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                  <History sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Recent Requests
                </Typography>
                {requestHistory.slice(0, 3).map((req) => (
                  <Card
                    key={req.id}
                    sx={{
                      mb: 1,
                      cursor: 'pointer',
                      '&:hover': { bgcolor: 'action.hover' }
                    }}
                    onClick={() => setResponse(req)}
                  >
                    <CardContent sx={{ py: 1, '&:last-child': { pb: 1 } }}>
                      <Typography variant="caption" color="text.secondary">
                        {req.timestamp.toLocaleTimeString()}
                      </Typography>
                      <Typography variant="body2" noWrap>
                        {req.response.slice(0, 80)}...
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                        <Chip size="small" label={`${req.latencyMs}ms`} />
                        <Chip size="small" label={`${req.tokensUsed} tokens`} />
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            )}
          </Box>
        </Grid>

        {/* Right Panel - Response and Code */}
        <Grid item xs={12} md={8} sx={{ height: '100%', overflow: 'auto' }}>
          <Box sx={{ p: 3 }}>
            {isLoading && <LinearProgress sx={{ mb: 2 }} />}

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            {response ? (
              <>
                {/* Performance Metrics */}
                <Paper sx={{ p: 2, mb: 3, bgcolor: 'background.default' }}>
                  <Typography variant="h6" gutterBottom>
                    Performance Metrics
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={3}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" color="primary.main">
                          {response.ttftMs}ms
                        </Typography>
                        <Typography variant="caption">
                          Time to First Token
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={3}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" color="primary.main">
                          {response.latencyMs}ms
                        </Typography>
                        <Typography variant="caption">
                          Total Latency
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={3}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" color="primary.main">
                          {response.tokensUsed}
                        </Typography>
                        <Typography variant="caption">
                          Tokens Used
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={3}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" color="primary.main">
                          ${response.cost.toFixed(4)}
                        </Typography>
                        <Typography variant="caption">
                          Request Cost
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>

                {/* Response Display */}
                <Card sx={{ mb: 3 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Response
                    </Typography>
                    <Paper
                      sx={{
                        p: 2,
                        bgcolor: 'background.default',
                        color: 'text.primary',
                        fontFamily: 'monospace',
                        fontSize: '0.9rem',
                        whiteSpace: 'pre-wrap',
                        maxHeight: 400,
                        overflow: 'auto',
                        border: 1,
                        borderColor: 'divider',
                      }}
                    >
                      {response.response}
                    </Paper>
                  </CardContent>
                </Card>

                <Divider sx={{ my: 3 }} />

                {/* Code Generator */}
                <CodeGenerator
                  model={request.model}
                  prompt={request.prompt}
                  maxTokens={request.maxTokens}
                  temperature={request.temperature}
                />
              </>
            ) : (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <PlayArrow sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  Configure your request and click "Send Request" to see the response
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Interactive API testing with real-time performance metrics
                </Typography>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}