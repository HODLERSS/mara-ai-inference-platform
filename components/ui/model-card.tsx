import { useState } from 'react'
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
  Rating,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { Speed, Memory, Psychology, Rocket, PlayArrow, MoreVert, Visibility, Settings, Code } from '@mui/icons-material'
import Link from 'next/link'
import { ModelDeploymentDialog } from '@/components/models/model-deployment-dialog'
import { ApiCodeDialog } from '@/components/models/api-code-dialog'

interface ModelCardProps {
  name: string
  provider: string
  description: string
  performance: {
    latency: number
    throughput: number
    accuracy: number
  }
  pricing: {
    perToken: number
    perHour: number
  }
  platforms: string[]
  rating: number
  reviews: number
  tags: string[]
  status: 'available' | 'beta' | 'coming-soon'
}

export function ModelCard({
  name,
  provider,
  description,
  performance,
  pricing,
  platforms,
  rating,
  reviews,
  tags,
  status
}: ModelCardProps) {
  const [showDeployDialog, setShowDeployDialog] = useState(false)
  const [showApiDialog, setShowApiDialog] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'success'
      case 'beta': return 'warning'
      case 'coming-soon': return 'default'
      default: return 'default'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'available': return 'Available'
      case 'beta': return 'Beta'
      case 'coming-soon': return 'Coming Soon'
      default: return status
    }
  }

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const modelData = {
    name,
    provider,
    pricing,
    platforms
  }

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="h6" component="h3">
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              by {provider}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Chip
              size="small"
              label={getStatusLabel(status)}
              color={getStatusColor(status) as any}
            />
            <IconButton size="small" onClick={handleMenuOpen}>
              <MoreVert fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        <Typography variant="body2" sx={{ mb: 2 }}>
          {description}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Rating value={rating} readOnly size="small" />
          <Typography variant="caption" sx={{ ml: 1 }}>
            ({reviews} reviews)
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
          {tags.map((tag) => (
            <Chip key={tag} size="small" variant="outlined" label={tag} />
          ))}
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Performance Metrics */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Performance
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Speed fontSize="small" color="primary" />
            <Typography variant="caption">
              {performance.latency}μs/token
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Memory fontSize="small" color="primary" />
            <Typography variant="caption">
              {performance.throughput}K req/sec
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Psychology fontSize="small" color="primary" />
            <Typography variant="caption">
              {performance.accuracy}% accuracy
            </Typography>
          </Box>
        </Box>

        {/* Pricing */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Pricing
          </Typography>
          <Typography variant="body2">
            ${pricing.perToken}/1K tokens
          </Typography>
          <Typography variant="caption" color="text.secondary">
            or ${pricing.perHour}/hour
          </Typography>
        </Box>

        {/* Supported Platforms */}
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Available on
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {platforms.map((platform) => (
              <Chip
                key={platform}
                size="small"
                label={platform}
                variant="filled"
                color="primary"
              />
            ))}
          </Box>
        </Box>
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          size="small"
          variant="contained"
          disabled={status !== 'available'}
          startIcon={<Rocket />}
          onClick={() => setShowDeployDialog(true)}
          sx={{ flex: 1 }}
        >
          {status === 'available' ? 'Deploy' : 'Request Access'}
        </Button>
        <Button
          size="small"
          variant="outlined"
          startIcon={<Code />}
          disabled={status !== 'available'}
          onClick={() => setShowApiDialog(true)}
          sx={{ flex: 1 }}
        >
          API
        </Button>
        <Button
          component={Link}
          href={`/playground?model=${encodeURIComponent(name)}`}
          size="small"
          variant="outlined"
          startIcon={<PlayArrow />}
          disabled={status !== 'available'}
          sx={{ flex: 1 }}
        >
          Playground
        </Button>
      </CardActions>

      {/* Context Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={() => { handleMenuClose(); /* Navigate to model details */ }}>
          <ListItemIcon>
            <Visibility fontSize="small" />
          </ListItemIcon>
          <ListItemText>View Details</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => { handleMenuClose(); setShowDeployDialog(true); }} disabled={status !== 'available'}>
          <ListItemIcon>
            <Rocket fontSize="small" />
          </ListItemIcon>
          <ListItemText>Deploy Model</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => { handleMenuClose(); setShowApiDialog(true); }} disabled={status !== 'available'}>
          <ListItemIcon>
            <Code fontSize="small" />
          </ListItemIcon>
          <ListItemText>API Examples</ListItemText>
        </MenuItem>
        <MenuItem
          component={Link}
          href={`/playground?model=${encodeURIComponent(name)}`}
          onClick={handleMenuClose}
          disabled={status !== 'available'}
        >
          <ListItemIcon>
            <PlayArrow fontSize="small" />
          </ListItemIcon>
          <ListItemText>Try in Playground</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => { handleMenuClose(); /* Navigate to configuration */ }}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          <ListItemText>Configuration</ListItemText>
        </MenuItem>
      </Menu>

      {/* Deployment Dialog */}
      <ModelDeploymentDialog
        open={showDeployDialog}
        onClose={() => setShowDeployDialog(false)}
        model={modelData}
      />

      {/* API Code Dialog */}
      <ApiCodeDialog
        open={showApiDialog}
        onClose={() => setShowApiDialog(false)}
        modelId={name.toLowerCase().replace(/[^a-z0-9]/g, '-')}
        modelName={name}
      />
    </Card>
  )
}