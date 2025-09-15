'use client'

import { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Tooltip,
  Divider,
} from '@mui/material'
import {
  CheckCircle,
  Warning,
  Error,
  Speed,
  TrendingUp,
  Notifications,
  Settings,
  Add,
  Edit,
  History,
  Timeline,
  NotificationsActive,
  Schedule,
} from '@mui/icons-material'

interface SLO {
  id: string
  name: string
  type: 'latency' | 'availability' | 'throughput' | 'error_rate'
  target: number
  current: number
  status: 'healthy' | 'warning' | 'critical'
  timeWindow: string
  description: string
}

interface Alert {
  id: string
  title: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  status: 'active' | 'resolved' | 'acknowledged'
  timestamp: Date
  sloId: string
  description: string
}

interface Incident {
  id: string
  title: string
  status: 'investigating' | 'identified' | 'monitoring' | 'resolved'
  severity: 'minor' | 'major' | 'critical'
  startTime: Date
  resolvedTime?: Date
  affectedSLOs: string[]
}

const mockSLOs: SLO[] = [
  {
    id: '1',
    name: 'API Response Latency',
    type: 'latency',
    target: 120,
    current: 87,
    status: 'healthy',
    timeWindow: '30d',
    description: 'Token generation latency under 120μs'
  },
  {
    id: '2',
    name: 'Service Availability',
    type: 'availability',
    target: 99.9,
    current: 99.95,
    status: 'healthy',
    timeWindow: '30d',
    description: 'Service uptime percentage'
  },
  {
    id: '3',
    name: 'Error Rate',
    type: 'error_rate',
    target: 0.1,
    current: 0.03,
    status: 'healthy',
    timeWindow: '24h',
    description: 'Request error rate percentage'
  },
  {
    id: '4',
    name: 'Request Throughput',
    type: 'throughput',
    target: 10000,
    current: 8450,
    status: 'warning',
    timeWindow: '1h',
    description: 'Requests per hour capacity'
  }
]

const mockAlerts: Alert[] = [
  {
    id: '1',
    title: 'High Latency Detected',
    severity: 'medium',
    status: 'active',
    timestamp: new Date(Date.now() - 300000),
    sloId: '1',
    description: 'Average response latency exceeded 110μs for 5 minutes'
  },
  {
    id: '2',
    title: 'Throughput Below Target',
    severity: 'low',
    status: 'acknowledged',
    timestamp: new Date(Date.now() - 1800000),
    sloId: '4',
    description: 'Request throughput dropped below target threshold'
  }
]

const mockIncidents: Incident[] = [
  {
    id: '1',
    title: 'Increased Latency on SambaNova Platform',
    status: 'monitoring',
    severity: 'minor',
    startTime: new Date(Date.now() - 3600000),
    affectedSLOs: ['1']
  },
  {
    id: '2',
    title: 'Service Degradation - H100 Cluster',
    status: 'resolved',
    severity: 'major',
    startTime: new Date(Date.now() - 86400000),
    resolvedTime: new Date(Date.now() - 82800000),
    affectedSLOs: ['2', '4']
  }
]

function TabPanel(props: { children?: React.ReactNode; index: number; value: number }) {
  const { children, value, index, ...other } = props
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`slo-tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  )
}

export function SloMonitoringDashboard() {
  const [activeTab, setActiveTab] = useState(0)
  const [showCreateSLO, setShowCreateSLO] = useState(false)
  const [showCreateAlert, setShowCreateAlert] = useState(false)

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  const getSLOStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'success'
      case 'warning': return 'warning'
      case 'critical': return 'error'
      default: return 'default'
    }
  }

  const getAlertSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'info'
      case 'medium': return 'warning'
      case 'high': return 'error'
      case 'critical': return 'error'
      default: return 'default'
    }
  }

  const getIncidentStatusColor = (status: string) => {
    switch (status) {
      case 'investigating': return 'warning'
      case 'identified': return 'info'
      case 'monitoring': return 'warning'
      case 'resolved': return 'success'
      default: return 'default'
    }
  }

  const healthySLOs = mockSLOs.filter(slo => slo.status === 'healthy').length
  const activeAlerts = mockAlerts.filter(alert => alert.status === 'active').length
  const openIncidents = mockIncidents.filter(incident => incident.status !== 'resolved').length

  return (
    <Box>
      {/* Overview Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <CheckCircle sx={{ mr: 1, color: 'success.main' }} />
                <Typography variant="h6">SLO Health</Typography>
              </Box>
              <Typography variant="h3" color="success.main">
                {healthySLOs}/{mockSLOs.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                objectives meeting targets
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <NotificationsActive sx={{ mr: 1, color: activeAlerts > 0 ? 'error.main' : 'text.secondary' }} />
                <Typography variant="h6">Active Alerts</Typography>
              </Box>
              <Typography variant="h3" color={activeAlerts > 0 ? 'error.main' : 'text.secondary'}>
                {activeAlerts}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                requiring attention
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Warning sx={{ mr: 1, color: openIncidents > 0 ? 'warning.main' : 'text.secondary' }} />
                <Typography variant="h6">Open Incidents</Typography>
              </Box>
              <Typography variant="h3" color={openIncidents > 0 ? 'warning.main' : 'text.secondary'}>
                {openIncidents}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                under investigation
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <TrendingUp sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">SLA Compliance</Typography>
              </Box>
              <Typography variant="h3" color="primary.main">
                99.97%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                30-day average
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Active Alerts Banner */}
      {activeAlerts > 0 && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          <Typography variant="subtitle2" gutterBottom>
            {activeAlerts} Active Alert{activeAlerts > 1 ? 's' : ''} Requiring Attention
          </Typography>
          <Typography variant="body2">
            Review alerts and take appropriate action to maintain service quality.
          </Typography>
        </Alert>
      )}

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab icon={<Speed />} label="SLOs" />
          <Tab icon={<Notifications />} label="Alerts" />
          <Tab icon={<History />} label="Incidents" />
          <Tab icon={<Timeline />} label="Metrics" />
        </Tabs>
      </Box>

      {/* SLOs Tab */}
      <TabPanel value={activeTab} index={0}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6">Service Level Objectives</Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setShowCreateSLO(true)}
          >
            Create SLO
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>SLO Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Target</TableCell>
                <TableCell>Current</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Time Window</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockSLOs.map((slo) => (
                <TableRow key={slo.id}>
                  <TableCell>
                    <Typography variant="subtitle2">{slo.name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {slo.description}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip label={slo.type.replace('_', ' ')} size="small" variant="outlined" />
                  </TableCell>
                  <TableCell>
                    {slo.type === 'latency' ? `${slo.target}μs` :
                     slo.type === 'availability' ? `${slo.target}%` :
                     slo.type === 'error_rate' ? `${slo.target}%` :
                     `${slo.target}/hour`}
                  </TableCell>
                  <TableCell>
                    {slo.type === 'latency' ? `${slo.current}μs` :
                     slo.type === 'availability' ? `${slo.current}%` :
                     slo.type === 'error_rate' ? `${slo.current}%` :
                     `${slo.current}/hour`}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={slo.status}
                      color={getSLOStatusColor(slo.status) as any}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{slo.timeWindow}</TableCell>
                  <TableCell>
                    <Tooltip title="Edit SLO">
                      <IconButton size="small">
                        <Edit fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="View History">
                      <IconButton size="small">
                        <History fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      {/* Alerts Tab */}
      <TabPanel value={activeTab} index={1}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6">Alert Rules & Notifications</Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setShowCreateAlert(true)}
          >
            Create Alert
          </Button>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Recent Alerts
                </Typography>
                <List>
                  {mockAlerts.map((alert) => (
                    <ListItem key={alert.id}>
                      <ListItemIcon>
                        {alert.severity === 'critical' || alert.severity === 'high' ? (
                          <Error color="error" />
                        ) : (
                          <Warning color="warning" />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={alert.title}
                        secondary={
                          <Box>
                            <Typography variant="body2">{alert.description}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              {alert.timestamp.toLocaleString()}
                            </Typography>
                          </Box>
                        }
                      />
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Chip
                          label={alert.severity}
                          color={getAlertSeverityColor(alert.severity) as any}
                          size="small"
                        />
                        <Chip
                          label={alert.status}
                          size="small"
                          variant="outlined"
                        />
                      </Box>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} lg={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Notification Settings
                </Typography>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Email notifications"
                />
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Slack integration"
                />
                <FormControlLabel
                  control={<Switch />}
                  label="SMS alerts (critical only)"
                />
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="PagerDuty integration"
                />

                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle2" gutterBottom>
                  Alert Escalation
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Unacknowledged critical alerts escalate to management after 15 minutes.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Incidents Tab */}
      <TabPanel value={activeTab} index={2}>
        <Typography variant="h6" gutterBottom>
          Incident Management
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Incident</TableCell>
                <TableCell>Severity</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Started</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Affected SLOs</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockIncidents.map((incident) => {
                const duration = incident.resolvedTime ?
                  Math.round((incident.resolvedTime.getTime() - incident.startTime.getTime()) / 60000) :
                  Math.round((Date.now() - incident.startTime.getTime()) / 60000)

                return (
                  <TableRow key={incident.id}>
                    <TableCell>
                      <Typography variant="subtitle2">{incident.title}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={incident.severity}
                        color={incident.severity === 'critical' ? 'error' : incident.severity === 'major' ? 'warning' : 'info'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={incident.status}
                        color={getIncidentStatusColor(incident.status) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{incident.startTime.toLocaleString()}</TableCell>
                    <TableCell>{duration} minutes</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                        {incident.affectedSLOs.map((sloId) => {
                          const slo = mockSLOs.find(s => s.id === sloId)
                          return slo ? (
                            <Chip key={sloId} label={slo.name} size="small" variant="outlined" />
                          ) : null
                        })}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Tooltip title="View Details">
                        <IconButton size="small">
                          <History fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      {/* Metrics Tab */}
      <TabPanel value={activeTab} index={3}>
        <Typography variant="h6" gutterBottom>
          Performance Metrics & Trends
        </Typography>

        <Grid container spacing={3}>
          {mockSLOs.map((slo) => (
            <Grid item xs={12} sm={6} md={3} key={slo.id}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom>
                    {slo.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 1 }}>
                    <Typography variant="h4" color="primary.main">
                      {slo.current}
                    </Typography>
                    <Typography variant="caption" sx={{ ml: 1 }}>
                      {slo.type === 'latency' ? 'μs' :
                       slo.type === 'availability' || slo.type === 'error_rate' ? '%' :
                       '/hour'}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Target: {slo.target}{slo.type === 'latency' ? 'μs' :
                             slo.type === 'availability' || slo.type === 'error_rate' ? '%' :
                             '/hour'}
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={slo.type === 'error_rate' ?
                      Math.max(0, 100 - (slo.current / slo.target) * 100) :
                      Math.min(100, (slo.current / slo.target) * 100)
                    }
                    color={getSLOStatusColor(slo.status) as any}
                    sx={{ height: 6, borderRadius: 3 }}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Create SLO Dialog */}
      <Dialog open={showCreateSLO} onClose={() => setShowCreateSLO(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create New SLO</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="SLO Name"
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth margin="dense" sx={{ mb: 2 }}>
            <InputLabel>SLO Type</InputLabel>
            <Select label="SLO Type">
              <MenuItem value="latency">Latency</MenuItem>
              <MenuItem value="availability">Availability</MenuItem>
              <MenuItem value="throughput">Throughput</MenuItem>
              <MenuItem value="error_rate">Error Rate</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Target Value"
            type="number"
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={2}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowCreateSLO(false)}>Cancel</Button>
          <Button variant="contained">Create SLO</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}