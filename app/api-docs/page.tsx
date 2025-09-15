'use client'

import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Tabs,
  Tab,
  Paper,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  Divider,
} from '@mui/material'
import { useState } from 'react'
import { ContentCopy, PlayArrow } from '@mui/icons-material'

const codeExamples = {
  curl: `curl -X POST https://api.mara.ai/v1/inference \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "llama-2-70b",
    "prompt": "Explain quantum computing in simple terms",
    "max_tokens": 500,
    "temperature": 0.7
  }'`,

  python: `import requests

# MARA AI Inference API
url = "https://api.mara.ai/v1/inference"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}

payload = {
    "model": "llama-2-70b",
    "prompt": "Explain quantum computing in simple terms",
    "max_tokens": 500,
    "temperature": 0.7
}

response = requests.post(url, json=payload, headers=headers)
result = response.json()

print(f"Response: {result['response']}")
print(f"Latency: {result['latency_ms']}ms")
print(f"Tokens used: {result['tokens_used']}")`,

  javascript: `const axios = require('axios');

// MARA AI Inference API
const response = await axios.post('https://api.mara.ai/v1/inference', {
  model: 'llama-2-70b',
  prompt: 'Explain quantum computing in simple terms',
  max_tokens: 500,
  temperature: 0.7
}, {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

console.log('Response:', response.data.response);
console.log('Latency:', response.data.latency_ms + 'ms');
console.log('Tokens used:', response.data.tokens_used);`,

  go: `package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "net/http"
)

type InferenceRequest struct {
    Model       string  \`json:"model"\`
    Prompt      string  \`json:"prompt"\`
    MaxTokens   int     \`json:"max_tokens"\`
    Temperature float64 \`json:"temperature"\`
}

func main() {
    req := InferenceRequest{
        Model:       "llama-2-70b",
        Prompt:      "Explain quantum computing in simple terms",
        MaxTokens:   500,
        Temperature: 0.7,
    }

    jsonData, _ := json.Marshal(req)

    client := &http.Client{}
    httpReq, _ := http.NewRequest("POST", "https://api.mara.ai/v1/inference", bytes.NewBuffer(jsonData))
    httpReq.Header.Set("Authorization", "Bearer YOUR_API_KEY")
    httpReq.Header.Set("Content-Type", "application/json")

    resp, _ := client.Do(httpReq)
    defer resp.Body.Close()

    fmt.Println("Inference completed successfully")
}`
}

const apiEndpoints = [
  {
    method: 'POST',
    endpoint: '/v1/inference',
    description: 'Submit inference request',
    latency: '80-120μs'
  },
  {
    method: 'GET',
    endpoint: '/v1/models',
    description: 'List available models',
    latency: '<10ms'
  },
  {
    method: 'GET',
    endpoint: '/v1/inference/{id}',
    description: 'Get inference status',
    latency: '<5ms'
  },
  {
    method: 'GET',
    endpoint: '/v1/usage',
    description: 'Get usage analytics',
    latency: '<20ms'
  },
  {
    method: 'POST',
    endpoint: '/v1/batch',
    description: 'Batch inference requests',
    latency: '100-150μs'
  }
]

export default function ApiDocsPage() {
  const [tabValue, setTabValue] = useState(0)
  const [selectedLang, setSelectedLang] = useState('curl')

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          API Documentation & Integration
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Enterprise-grade APIs for seamless AI inference integration with guaranteed sub-120μs/token performance
        </Typography>

        {/* Quick Start Alert */}
        <Alert severity="info" sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            🚀 Quick Start Guide
          </Typography>
          <Typography>
            Get started in minutes with our RESTful APIs. Enterprise customers receive dedicated support,
            SLA guarantees, and priority access to new models and features.
          </Typography>
        </Alert>

        {/* Key Features */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="primary">≤120μs</Typography>
                <Typography variant="body2">Response Latency</Typography>
                <Typography variant="caption" color="text.secondary">
                  Per token processing
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="primary">99.9%</Typography>
                <Typography variant="body2">API Uptime SLA</Typography>
                <Typography variant="caption" color="text.secondary">
                  Enterprise guarantee
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="primary">6</Typography>
                <Typography variant="body2">AI Models</Typography>
                <Typography variant="caption" color="text.secondary">
                  Production ready
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="primary">3</Typography>
                <Typography variant="body2">Compute Platforms</Typography>
                <Typography variant="caption" color="text.secondary">
                  Multi-platform support
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* API Documentation Tabs */}
        <Card sx={{ mb: 4 }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Quick Start" />
            <Tab label="API Reference" />
            <Tab label="Code Examples" />
            <Tab label="Enterprise Features" />
          </Tabs>
        </Card>

        {/* Quick Start Tab */}
        {tabValue === 0 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Authentication
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    All API requests require authentication using your API key in the Authorization header:
                  </Typography>
                  <Paper sx={{
                    p: 2,
                    bgcolor: (theme) => theme.palette.mode === 'dark' ? 'grey.800' : 'grey.100',
                    color: (theme) => theme.palette.mode === 'dark' ? 'grey.100' : 'grey.900',
                    fontFamily: 'monospace'
                  }}>
                    Authorization: Bearer YOUR_API_KEY
                  </Paper>

                  <Divider sx={{ my: 3 }} />

                  <Typography variant="h6" gutterBottom>
                    Base URL
                  </Typography>
                  <Paper sx={{
                    p: 2,
                    bgcolor: (theme) => theme.palette.mode === 'dark' ? 'grey.800' : 'grey.100',
                    color: (theme) => theme.palette.mode === 'dark' ? 'grey.100' : 'grey.900',
                    fontFamily: 'monospace',
                    mb: 3
                  }}>
                    https://api.mara.ai/v1
                  </Paper>

                  <Typography variant="h6" gutterBottom>
                    First API Call
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Chip
                      size="small"
                      label="curl"
                      onClick={() => setSelectedLang('curl')}
                      color={selectedLang === 'curl' ? 'primary' : 'default'}
                      sx={{ mr: 1 }}
                    />
                    <Chip
                      size="small"
                      label="Python"
                      onClick={() => setSelectedLang('python')}
                      color={selectedLang === 'python' ? 'primary' : 'default'}
                      sx={{ mr: 1 }}
                    />
                    <Chip
                      size="small"
                      label="JavaScript"
                      onClick={() => setSelectedLang('javascript')}
                      color={selectedLang === 'javascript' ? 'primary' : 'default'}
                      sx={{ mr: 1 }}
                    />
                    <Chip
                      size="small"
                      label="Go"
                      onClick={() => setSelectedLang('go')}
                      color={selectedLang === 'go' ? 'primary' : 'default'}
                    />
                  </Box>
                  <Paper sx={{
                    p: 2,
                    bgcolor: (theme) => theme.palette.mode === 'dark' ? 'grey.900' : 'grey.900',
                    color: (theme) => theme.palette.mode === 'dark' ? 'grey.100' : 'white',
                    position: 'relative'
                  }}>
                    <Button
                      size="small"
                      onClick={() => copyToClipboard(codeExamples[selectedLang as keyof typeof codeExamples])}
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        color: (theme) => theme.palette.mode === 'dark' ? 'grey.100' : 'white'
                      }}
                    >
                      <ContentCopy fontSize="small" />
                    </Button>
                    <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: '0.875rem' }}>
                      {codeExamples[selectedLang as keyof typeof codeExamples]}
                    </pre>
                  </Paper>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Response Format
                  </Typography>
                  <Paper sx={{
                    p: 2,
                    bgcolor: (theme) => theme.palette.mode === 'dark' ? 'grey.900' : 'grey.900',
                    color: (theme) => theme.palette.mode === 'dark' ? 'grey.100' : 'white'
                  }}>
                    <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: '0.75rem' }}>
{`{
  "id": "req_abc123",
  "response": "Quantum computing is...",
  "tokens_used": 127,
  "latency_ms": 95,
  "model": "llama-2-70b",
  "timestamp": "2025-09-14T23:20:00Z",
  "cost": 0.000152
}`}
                    </pre>
                  </Paper>

                  <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                    Performance Guarantee
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    • Sub-120μs per token latency<br/>
                    • 99.9% uptime SLA<br/>
                    • Global edge deployment<br/>
                    • Real-time monitoring
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {/* API Reference Tab */}
        {tabValue === 1 && (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                API Endpoints
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Method</TableCell>
                      <TableCell>Endpoint</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Avg Latency</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {apiEndpoints.map((endpoint, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Chip
                            size="small"
                            label={endpoint.method}
                            color={endpoint.method === 'POST' ? 'primary' : 'default'}
                          />
                        </TableCell>
                        <TableCell sx={{ fontFamily: 'monospace' }}>
                          {endpoint.endpoint}
                        </TableCell>
                        <TableCell>{endpoint.description}</TableCell>
                        <TableCell>{endpoint.latency}</TableCell>
                        <TableCell>
                          <Button size="small" startIcon={<PlayArrow />}>
                            Try It
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        )}

        {/* Code Examples Tab */}
        {tabValue === 2 && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Integration Examples
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Production-ready code examples for popular programming languages and frameworks
              </Typography>
            </Grid>

            {Object.entries(codeExamples).map(([lang, code]) => (
              <Grid item xs={12} md={6} key={lang}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6" sx={{ textTransform: 'capitalize' }}>
                        {lang === 'javascript' ? 'JavaScript/Node.js' : lang}
                      </Typography>
                      <Button
                        size="small"
                        onClick={() => copyToClipboard(code)}
                        startIcon={<ContentCopy />}
                      >
                        Copy
                      </Button>
                    </Box>
                    <Paper sx={{
                      p: 2,
                      bgcolor: (theme) => theme.palette.mode === 'dark' ? 'grey.900' : 'grey.900',
                      color: (theme) => theme.palette.mode === 'dark' ? 'grey.100' : 'white'
                    }}>
                      <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: '0.75rem', overflow: 'auto' }}>
                        {code}
                      </pre>
                    </Paper>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Enterprise Features Tab */}
        {tabValue === 3 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Enterprise Security & Compliance
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    Built for enterprise-grade security and regulatory compliance
                  </Typography>
                  <Box component="ul" sx={{ pl: 2 }}>
                    <li>SOC 2 Type II certified</li>
                    <li>GDPR and CCPA compliant</li>
                    <li>End-to-end encryption</li>
                    <li>Data residency controls</li>
                    <li>Audit logging & monitoring</li>
                    <li>VPC and private endpoints</li>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Performance & Reliability
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    Industry-leading performance with enterprise SLAs
                  </Typography>
                  <Box component="ul" sx={{ pl: 2 }}>
                    <li>Sub-120μs/token guaranteed latency</li>
                    <li>99.9% uptime SLA</li>
                    <li>Global edge deployment</li>
                    <li>Auto-scaling infrastructure</li>
                    <li>Load balancing & failover</li>
                    <li>Real-time performance monitoring</li>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Enterprise Support Tiers
                  </Typography>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Feature</TableCell>
                          <TableCell>Standard</TableCell>
                          <TableCell>Enterprise</TableCell>
                          <TableCell>Premium</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>Response Time</TableCell>
                          <TableCell>24 hours</TableCell>
                          <TableCell>4 hours</TableCell>
                          <TableCell>1 hour</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Support Channels</TableCell>
                          <TableCell>Email</TableCell>
                          <TableCell>Email, Phone</TableCell>
                          <TableCell>Email, Phone, Slack</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Dedicated CSM</TableCell>
                          <TableCell>❌</TableCell>
                          <TableCell>✅</TableCell>
                          <TableCell>✅</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Custom Integration</TableCell>
                          <TableCell>❌</TableCell>
                          <TableCell>✅</TableCell>
                          <TableCell>✅ + On-site</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {/* CTA Section */}
        <Card sx={{ mt: 4, bgcolor: 'primary.main', color: 'white' }}>
          <CardContent sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h5" gutterBottom>
              Ready to Get Started?
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              Join leading enterprises already using MARA AI Inference Platform
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button variant="contained" size="large" sx={{ bgcolor: 'white', color: 'primary.main' }}>
                Get API Key
              </Button>
              <Button variant="outlined" size="large" sx={{ borderColor: 'white', color: 'white' }}>
                Schedule Demo
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  )
}