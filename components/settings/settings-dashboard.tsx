'use client'

import { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Chip,
  Divider,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tab,
  Tabs,
} from '@mui/material'
import {
  Person,
  Security,
  Business,
  Notifications,
  Delete,
  Add,
  Warning,
  CheckCircle,
  Schedule,
  Language,
  Storage,
} from '@mui/icons-material'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  )
}

interface IpRestriction {
  id: string
  ip: string
  description: string
  enabled: boolean
}

interface ApiLimit {
  id: string
  name: string
  limit: number
  window: string
  enabled: boolean
}

const mockIpRestrictions: IpRestriction[] = [
  { id: '1', ip: '192.168.1.0/24', description: 'Office Network', enabled: true },
  { id: '2', ip: '10.0.0.0/8', description: 'VPN Access', enabled: true },
  { id: '3', ip: '203.45.67.89', description: 'CI/CD Server', enabled: false },
]

const mockApiLimits: ApiLimit[] = [
  { id: '1', name: 'Requests per minute', limit: 1000, window: 'minute', enabled: true },
  { id: '2', name: 'Requests per hour', limit: 50000, window: 'hour', enabled: true },
  { id: '3', name: 'Tokens per day', limit: 1000000, window: 'day', enabled: true },
]

export function SettingsDashboard() {
  const [activeTab, setActiveTab] = useState(0)
  const [showIpDialog, setShowIpDialog] = useState(false)
  const [showLimitDialog, setShowLimitDialog] = useState(false)
  const [newIp, setNewIp] = useState('')
  const [newIpDescription, setNewIpDescription] = useState('')

  // Account Settings State
  const [accountSettings, setAccountSettings] = useState({
    name: 'Administrator',
    email: 'admin@mara.ai',
    timezone: 'UTC-8',
    language: 'en',
    emailNotifications: true,
    securityAlerts: true,
    usageAlerts: true,
    twoFactorEnabled: false,
  })

  // Organization Settings State
  const [orgSettings, setOrgSettings] = useState({
    organizationName: 'MARA Technologies',
    defaultRegion: 'us-east-1',
    dataRetentionDays: 90,
    allowExternalSharing: false,
    requireApprovalForNewKeys: true,
    enforceIpRestrictions: true,
  })

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  const addIpRestriction = () => {
    if (newIp && newIpDescription) {
      // Mock adding IP restriction
      setNewIp('')
      setNewIpDescription('')
      setShowIpDialog(false)
    }
  }

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab icon={<Person />} label="Account" />
          <Tab icon={<Security />} label="Security" />
          <Tab icon={<Business />} label="Organization" />
          <Tab icon={<Notifications />} label="Notifications" />
        </Tabs>
      </Box>

      {/* Account Settings Tab */}
      <CustomTabPanel value={activeTab} index={0}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Profile Information
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Full Name"
                      fullWidth
                      value={accountSettings.name}
                      onChange={(e) => setAccountSettings(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Email Address"
                      fullWidth
                      value={accountSettings.email}
                      onChange={(e) => setAccountSettings(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Timezone</InputLabel>
                      <Select
                        value={accountSettings.timezone}
                        label="Timezone"
                        onChange={(e) => setAccountSettings(prev => ({ ...prev, timezone: e.target.value }))}
                      >
                        <MenuItem value="UTC-8">Pacific Time (UTC-8)</MenuItem>
                        <MenuItem value="UTC-5">Eastern Time (UTC-5)</MenuItem>
                        <MenuItem value="UTC+0">UTC</MenuItem>
                        <MenuItem value="UTC+1">Central Europe (UTC+1)</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Language</InputLabel>
                      <Select
                        value={accountSettings.language}
                        label="Language"
                        onChange={(e) => setAccountSettings(prev => ({ ...prev, language: e.target.value }))}
                      >
                        <MenuItem value="en">English</MenuItem>
                        <MenuItem value="es">Spanish</MenuItem>
                        <MenuItem value="fr">French</MenuItem>
                        <MenuItem value="de">German</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>

                <Box sx={{ mt: 3 }}>
                  <Button variant="contained" sx={{ mr: 2 }}>
                    Save Changes
                  </Button>
                  <Button variant="outlined">
                    Cancel
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Account Status
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CheckCircle sx={{ color: 'success.main' }} />
                    <Typography variant="body2">Email Verified</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CheckCircle sx={{ color: 'success.main' }} />
                    <Typography variant="body2">Account Active</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Warning sx={{ color: 'warning.main' }} />
                    <Typography variant="body2">2FA Not Enabled</Typography>
                  </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle2" gutterBottom>
                  Member Since
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  January 15, 2024
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </CustomTabPanel>

      {/* Security Settings Tab */}
      <CustomTabPanel value={activeTab} index={1}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Authentication & Access
                </Typography>

                <Box sx={{ mb: 3 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={accountSettings.twoFactorEnabled}
                        onChange={(e) => setAccountSettings(prev => ({ ...prev, twoFactorEnabled: e.target.checked }))}
                      />
                    }
                    label="Enable Two-Factor Authentication"
                  />
                  <Typography variant="caption" display="block" color="text.secondary">
                    Add an extra layer of security to your account
                  </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle1" gutterBottom>
                  Change Password
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="Current Password"
                      type="password"
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="New Password"
                      type="password"
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Confirm New Password"
                      type="password"
                      fullWidth
                      size="small"
                    />
                  </Grid>
                </Grid>
                <Button variant="outlined" size="small" sx={{ mt: 2 }}>
                  Update Password
                </Button>
              </CardContent>
            </Card>

            <Card sx={{ mt: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  API Rate Limits
                </Typography>

                <List>
                  {mockApiLimits.map((limit) => (
                    <ListItem key={limit.id}>
                      <ListItemText
                        primary={limit.name}
                        secondary={`${limit.limit.toLocaleString()} per ${limit.window}`}
                      />
                      <ListItemSecondaryAction>
                        <Switch checked={limit.enabled} />
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>

                <Button
                  startIcon={<Add />}
                  variant="outlined"
                  size="small"
                  onClick={() => setShowLimitDialog(true)}
                >
                  Add Limit
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">IP Restrictions</Typography>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={orgSettings.enforceIpRestrictions}
                        onChange={(e) => setOrgSettings(prev => ({ ...prev, enforceIpRestrictions: e.target.checked }))}
                      />
                    }
                    label="Enforce"
                  />
                </Box>

                <Alert severity="info" sx={{ mb: 2 }}>
                  Only allow API access from specified IP addresses
                </Alert>

                <List>
                  {mockIpRestrictions.map((restriction) => (
                    <ListItem key={restriction.id}>
                      <ListItemText
                        primary={restriction.ip}
                        secondary={restriction.description}
                      />
                      <ListItemSecondaryAction>
                        <Switch checked={restriction.enabled} />
                        <IconButton size="small">
                          <Delete fontSize="small" />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>

                <Button
                  startIcon={<Add />}
                  variant="outlined"
                  size="small"
                  onClick={() => setShowIpDialog(true)}
                >
                  Add IP Address
                </Button>
              </CardContent>
            </Card>

            <Card sx={{ mt: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Active Sessions
                </Typography>

                <List>
                  <ListItem>
                    <ListItemText
                      primary="Current Session"
                      secondary="San Francisco, CA • Chrome • Now"
                    />
                    <Chip label="Active" color="success" size="small" />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="API Session"
                      secondary="AWS us-east-1 • API Client • 2 hours ago"
                    />
                    <IconButton size="small">
                      <Delete fontSize="small" />
                    </IconButton>
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </CustomTabPanel>

      {/* Organization Settings Tab */}
      <CustomTabPanel value={activeTab} index={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Organization Details
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="Organization Name"
                      fullWidth
                      value={orgSettings.organizationName}
                      onChange={(e) => setOrgSettings(prev => ({ ...prev, organizationName: e.target.value }))}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Default Region</InputLabel>
                      <Select
                        value={orgSettings.defaultRegion}
                        label="Default Region"
                        onChange={(e) => setOrgSettings(prev => ({ ...prev, defaultRegion: e.target.value }))}
                      >
                        <MenuItem value="us-east-1">🇺🇸 US East (Virginia)</MenuItem>
                        <MenuItem value="us-west-2">🇺🇸 US West (Oregon)</MenuItem>
                        <MenuItem value="eu-west-1">🇪🇺 Europe (Ireland)</MenuItem>
                        <MenuItem value="ap-southeast-1">🇸🇬 Asia Pacific (Singapore)</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Data Retention (Days)"
                      type="number"
                      fullWidth
                      value={orgSettings.dataRetentionDays}
                      onChange={(e) => setOrgSettings(prev => ({ ...prev, dataRetentionDays: parseInt(e.target.value) }))}
                    />
                  </Grid>
                </Grid>

                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Access Control
                  </Typography>

                  <FormControlLabel
                    control={
                      <Switch
                        checked={orgSettings.requireApprovalForNewKeys}
                        onChange={(e) => setOrgSettings(prev => ({ ...prev, requireApprovalForNewKeys: e.target.checked }))}
                      />
                    }
                    label="Require approval for new API keys"
                  />

                  <FormControlLabel
                    control={
                      <Switch
                        checked={orgSettings.allowExternalSharing}
                        onChange={(e) => setOrgSettings(prev => ({ ...prev, allowExternalSharing: e.target.checked }))}
                      />
                    }
                    label="Allow external data sharing"
                  />
                </Box>

                <Box sx={{ mt: 3 }}>
                  <Button variant="contained" sx={{ mr: 2 }}>
                    Save Changes
                  </Button>
                  <Button variant="outlined">
                    Cancel
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Team Members
                </Typography>

                <List>
                  <ListItem>
                    <ListItemText
                      primary="Administrator"
                      secondary="admin@mara.ai • Owner"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="API Service"
                      secondary="api@mara.ai • Service Account"
                    />
                  </ListItem>
                </List>

                <Button startIcon={<Add />} variant="outlined" size="small">
                  Invite Member
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </CustomTabPanel>

      {/* Notifications Tab */}
      <CustomTabPanel value={activeTab} index={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Email Notifications
                </Typography>

                <FormControlLabel
                  control={
                    <Switch
                      checked={accountSettings.emailNotifications}
                      onChange={(e) => setAccountSettings(prev => ({ ...prev, emailNotifications: e.target.checked }))}
                    />
                  }
                  label="General notifications"
                />

                <FormControlLabel
                  control={
                    <Switch
                      checked={accountSettings.securityAlerts}
                      onChange={(e) => setAccountSettings(prev => ({ ...prev, securityAlerts: e.target.checked }))}
                    />
                  }
                  label="Security alerts"
                />

                <FormControlLabel
                  control={
                    <Switch
                      checked={accountSettings.usageAlerts}
                      onChange={(e) => setAccountSettings(prev => ({ ...prev, usageAlerts: e.target.checked }))}
                    />
                  }
                  label="Usage and billing alerts"
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </CustomTabPanel>

      {/* Add IP Dialog */}
      <Dialog open={showIpDialog} onClose={() => setShowIpDialog(false)}>
        <DialogTitle>Add IP Restriction</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="IP Address or CIDR"
            fullWidth
            variant="outlined"
            value={newIp}
            onChange={(e) => setNewIp(e.target.value)}
            placeholder="192.168.1.0/24"
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            variant="outlined"
            value={newIpDescription}
            onChange={(e) => setNewIpDescription(e.target.value)}
            placeholder="Office Network"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowIpDialog(false)}>Cancel</Button>
          <Button onClick={addIpRestriction} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}