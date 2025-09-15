'use client'

import { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  LinearProgress,
  Grid,
} from '@mui/material'
import {
  Add,
  ContentCopy,
  Visibility,
  VisibilityOff,
  Delete,
  Refresh,
  Security,
  Speed,
  TrendingUp,
} from '@mui/icons-material'
import { KeyUsageAnalytics } from './key-usage-analytics'

interface ApiKey {
  id: string
  name: string
  keyPreview: string
  fullKey?: string
  created: Date
  lastUsed: Date | null
  status: 'active' | 'inactive' | 'revoked'
  requestsToday: number
  requestsTotal: number
  environment: 'production' | 'development'
}

const mockApiKeys: ApiKey[] = [
  {
    id: '1',
    name: 'Production API Key',
    keyPreview: 'sk-mara-prod-****-****-****-****',
    created: new Date('2024-01-15'),
    lastUsed: new Date(),
    status: 'active',
    requestsToday: 1247,
    requestsTotal: 45623,
    environment: 'production',
  },
  {
    id: '2',
    name: 'Development Testing',
    keyPreview: 'sk-mara-dev-****-****-****-****',
    created: new Date('2024-02-01'),
    lastUsed: new Date(Date.now() - 3600000),
    status: 'active',
    requestsToday: 89,
    requestsTotal: 3421,
    environment: 'development',
  },
  {
    id: '3',
    name: 'Legacy Integration',
    keyPreview: 'sk-mara-legacy-****-****-****-****',
    created: new Date('2023-11-20'),
    lastUsed: new Date(Date.now() - 86400000 * 7),
    status: 'inactive',
    requestsToday: 0,
    requestsTotal: 12453,
    environment: 'production',
  },
]

export function ApiKeysDashboard() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>(mockApiKeys)
  const [isGenerating, setIsGenerating] = useState(false)
  const [showNewKeyDialog, setShowNewKeyDialog] = useState(false)
  const [newKeyName, setNewKeyName] = useState('')
  const [newKeyEnvironment, setNewKeyEnvironment] = useState<'production' | 'development'>('development')
  const [generatedKey, setGeneratedKey] = useState<string | null>(null)
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set())

  const totalRequests = apiKeys.reduce((sum, key) => sum + key.requestsToday, 0)
  const activeKeys = apiKeys.filter(key => key.status === 'active').length

  const generateApiKey = async () => {
    if (!newKeyName.trim()) return

    setIsGenerating(true)
    await new Promise(resolve => setTimeout(resolve, 800))

    const newKey = `sk-mara-${newKeyEnvironment}-${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 8)}-${Math.random().toString(36).substr(2, 8)}-${Math.random().toString(36).substr(2, 8)}`

    const apiKey: ApiKey = {
      id: Date.now().toString(),
      name: newKeyName,
      keyPreview: `${newKey.substring(0, 16)}****-****-****-****`,
      fullKey: newKey,
      created: new Date(),
      lastUsed: null,
      status: 'active',
      requestsToday: 0,
      requestsTotal: 0,
      environment: newKeyEnvironment,
    }

    setApiKeys(prev => [apiKey, ...prev])
    setGeneratedKey(newKey)
    setIsGenerating(false)
    setNewKeyName('')
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const toggleKeyVisibility = (keyId: string) => {
    setVisibleKeys(prev => {
      const newSet = new Set(prev)
      if (newSet.has(keyId)) {
        newSet.delete(keyId)
      } else {
        newSet.add(keyId)
      }
      return newSet
    })
  }

  const revokeKey = (keyId: string) => {
    setApiKeys(prev => prev.map(key =>
      key.id === keyId ? { ...key, status: 'revoked' as const } : key
    ))
  }

  const formatDate = (date: Date | null) => {
    if (!date) return 'Never'
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <Box>
      {/* Statistics Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Security sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">Active Keys</Typography>
              </Box>
              <Typography variant="h3" color="primary.main">
                {activeKeys}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                of {apiKeys.length} total keys
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <TrendingUp sx={{ mr: 1, color: 'success.main' }} />
                <Typography variant="h6">Requests Today</Typography>
              </Box>
              <Typography variant="h3" color="success.main">
                {totalRequests.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                across all active keys
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Speed sx={{ mr: 1, color: 'warning.main' }} />
                <Typography variant="h6">Avg Response</Typography>
              </Box>
              <Typography variant="h3" color="warning.main">
                87μs
              </Typography>
              <Typography variant="body2" color="text.secondary">
                per token (24h avg)
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* API Keys Management */}
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6">Your API Keys</Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setShowNewKeyDialog(true)}
            >
              Generate New Key
            </Button>
          </Box>

          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Key</TableCell>
                  <TableCell>Environment</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Requests Today</TableCell>
                  <TableCell>Last Used</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {apiKeys.map((key) => (
                  <TableRow key={key.id}>
                    <TableCell>
                      <Typography variant="subtitle2">{key.name}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Created {formatDate(key.created)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography
                          variant="body2"
                          sx={{ fontFamily: 'monospace', minWidth: 200 }}
                        >
                          {visibleKeys.has(key.id) && key.fullKey ? key.fullKey : key.keyPreview}
                        </Typography>
                        <Tooltip title="Copy to clipboard">
                          <IconButton
                            size="small"
                            onClick={() => copyToClipboard(key.fullKey || key.keyPreview)}
                          >
                            <ContentCopy fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        {key.fullKey && (
                          <Tooltip title={visibleKeys.has(key.id) ? "Hide key" : "Show key"}>
                            <IconButton
                              size="small"
                              onClick={() => toggleKeyVisibility(key.id)}
                            >
                              {visibleKeys.has(key.id) ?
                                <VisibilityOff fontSize="small" /> :
                                <Visibility fontSize="small" />
                              }
                            </IconButton>
                          </Tooltip>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={key.environment}
                        color={key.environment === 'production' ? 'error' : 'info'}
                        variant="outlined"
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={key.status}
                        color={
                          key.status === 'active' ? 'success' :
                          key.status === 'inactive' ? 'warning' : 'error'
                        }
                        variant="outlined"
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {key.requestsToday.toLocaleString()}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {key.requestsTotal.toLocaleString()} total
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {formatDate(key.lastUsed)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        <Tooltip title="Rotate key">
                          <IconButton size="small">
                            <Refresh fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Revoke key">
                          <IconButton
                            size="small"
                            onClick={() => revokeKey(key.id)}
                            disabled={key.status === 'revoked'}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Usage Analytics */}
      <Box sx={{ mt: 4 }}>
        <KeyUsageAnalytics />
      </Box>

      {/* Generate New Key Dialog */}
      <Dialog open={showNewKeyDialog} onClose={() => setShowNewKeyDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Generate New API Key</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Key Name"
            type="text"
            fullWidth
            variant="outlined"
            value={newKeyName}
            onChange={(e) => setNewKeyName(e.target.value)}
            placeholder="e.g., Production API Key"
            sx={{ mb: 2 }}
          />

          <TextField
            select
            margin="dense"
            label="Environment"
            fullWidth
            variant="outlined"
            value={newKeyEnvironment}
            onChange={(e) => setNewKeyEnvironment(e.target.value as 'production' | 'development')}
            SelectProps={{ native: true }}
          >
            <option value="development">Development</option>
            <option value="production">Production</option>
          </TextField>

          {generatedKey && (
            <Alert severity="success" sx={{ mt: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Key Generated Successfully!
              </Typography>
              <Box sx={{
                bgcolor: 'background.default',
                color: 'text.primary',
                p: 1,
                borderRadius: 1,
                fontFamily: 'monospace',
                fontSize: '0.875rem',
                wordBreak: 'break-all',
                mt: 1,
                border: 1,
                borderColor: 'divider'
              }}>
                {generatedKey}
              </Box>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                Make sure to copy your API key now. You won't be able to see it again!
              </Typography>
            </Alert>
          )}

          {isGenerating && <LinearProgress sx={{ mt: 2 }} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setShowNewKeyDialog(false)
            setGeneratedKey(null)
          }}>
            Cancel
          </Button>
          <Button
            onClick={generateApiKey}
            variant="contained"
            disabled={!newKeyName.trim() || isGenerating}
          >
            {isGenerating ? 'Generating...' : 'Generate Key'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}