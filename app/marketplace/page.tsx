'use client'

import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from '@mui/material'
import { Search } from '@mui/icons-material'
import { useState } from 'react'
import { ModelCard } from '@/components/ui/model-card'

const models = [
  {
    name: 'Llama-3.1-405B',
    provider: 'Meta',
    description: 'State-of-the-art open-source model with 405B parameters, rivaling the best closed-source models for complex reasoning.',
    performance: {
      latency: 115,
      throughput: 12,
      accuracy: 97
    },
    pricing: {
      perToken: 0.0025,
      perHour: 4.80
    },
    platforms: ['H100', 'SambaNova'],
    rating: 4.9,
    reviews: 2847,
    tags: ['Flagship', 'Reasoning', 'Open Source'],
    status: 'available' as const
  },
  {
    name: 'Llama-3.1-70B',
    provider: 'Meta',
    description: 'High-performance open-source model excellent for most tasks with optimal balance of capability and efficiency.',
    performance: {
      latency: 95,
      throughput: 18,
      accuracy: 94
    },
    pricing: {
      perToken: 0.0012,
      perHour: 2.40
    },
    platforms: ['H100', 'SambaNova', 'Etched'],
    rating: 4.8,
    reviews: 3247,
    tags: ['Conversation', 'Code', 'Open Source'],
    status: 'available' as const
  },
  {
    name: 'Llama-3.1-8B',
    provider: 'Meta',
    description: 'Compact yet powerful model perfect for edge deployment and real-time applications requiring fast responses.',
    performance: {
      latency: 45,
      throughput: 35,
      accuracy: 89
    },
    pricing: {
      perToken: 0.0003,
      perHour: 0.80
    },
    platforms: ['H100', 'SambaNova', 'Etched'],
    rating: 4.6,
    reviews: 1893,
    tags: ['Fast', 'Efficient', 'Open Source'],
    status: 'available' as const
  },
  {
    name: 'Mixtral-8x7B',
    provider: 'Mistral AI',
    description: 'Mixture of experts architecture providing excellent performance per parameter with efficient inference.',
    performance: {
      latency: 92,
      throughput: 20,
      accuracy: 93
    },
    pricing: {
      perToken: 0.0010,
      perHour: 2.10
    },
    platforms: ['H100', 'SambaNova', 'Etched'],
    rating: 4.7,
    reviews: 1456,
    tags: ['Efficient', 'MoE', 'Open Source'],
    status: 'available' as const
  },
  {
    name: 'Mixtral-8x22B',
    provider: 'Mistral AI',
    description: 'Larger mixture of experts model with enhanced capabilities for complex reasoning and multilingual tasks.',
    performance: {
      latency: 110,
      throughput: 15,
      accuracy: 95
    },
    pricing: {
      perToken: 0.0018,
      perHour: 3.60
    },
    platforms: ['H100', 'SambaNova'],
    rating: 4.8,
    reviews: 967,
    tags: ['Advanced', 'Multilingual', 'Open Source'],
    status: 'available' as const
  },
  {
    name: 'CodeLlama-34B',
    provider: 'Meta',
    description: 'Specialized code generation model built on Llama architecture, optimized for programming tasks.',
    performance: {
      latency: 78,
      throughput: 22,
      accuracy: 92
    },
    pricing: {
      perToken: 0.0008,
      perHour: 1.90
    },
    platforms: ['H100', 'SambaNova', 'Etched'],
    rating: 4.7,
    reviews: 2134,
    tags: ['Code', 'Programming', 'Open Source'],
    status: 'available' as const
  },
  {
    name: 'Qwen2-72B',
    provider: 'Alibaba',
    description: 'Multilingual large language model with strong performance in both English and Chinese tasks.',
    performance: {
      latency: 88,
      throughput: 19,
      accuracy: 93
    },
    pricing: {
      perToken: 0.0011,
      perHour: 2.30
    },
    platforms: ['H100', 'SambaNova'],
    rating: 4.6,
    reviews: 834,
    tags: ['Multilingual', 'Chinese', 'Open Source'],
    status: 'available' as const
  },
  {
    name: 'Phi-3-Medium',
    provider: 'Microsoft',
    description: 'Compact yet capable model designed for efficient deployment while maintaining strong performance.',
    performance: {
      latency: 52,
      throughput: 28,
      accuracy: 87
    },
    pricing: {
      perToken: 0.0005,
      perHour: 1.20
    },
    platforms: ['H100', 'SambaNova', 'Etched'],
    rating: 4.5,
    reviews: 1267,
    tags: ['Compact', 'Efficient', 'Open Source'],
    status: 'available' as const
  },
  {
    name: 'Gemma-2-27B',
    provider: 'Google',
    description: 'Open-source model based on Gemini research with excellent instruction-following capabilities.',
    performance: {
      latency: 85,
      throughput: 21,
      accuracy: 91
    },
    pricing: {
      perToken: 0.0009,
      perHour: 2.00
    },
    platforms: ['H100', 'SambaNova'],
    rating: 4.6,
    reviews: 1543,
    tags: ['Instructions', 'Reasoning', 'Open Source'],
    status: 'available' as const
  },
  {
    name: 'Falcon-180B',
    provider: 'TII',
    description: 'Large-scale open-source model trained on diverse high-quality data with strong general capabilities.',
    performance: {
      latency: 125,
      throughput: 11,
      accuracy: 96
    },
    pricing: {
      perToken: 0.0022,
      perHour: 4.20
    },
    platforms: ['H100', 'SambaNova'],
    rating: 4.7,
    reviews: 697,
    tags: ['Large Scale', 'General', 'Open Source'],
    status: 'beta' as const
  }
]

const platforms = ['All Platforms', 'H100', 'SambaNova', 'Etched']
const providers = ['All Providers', 'Meta', 'Mistral AI', 'Alibaba', 'Microsoft', 'Google', 'TII']
const categories = ['All Categories', 'Conversation', 'Code', 'Reasoning', 'Multilingual', 'Efficient']

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPlatform, setSelectedPlatform] = useState('All Platforms')
  const [selectedProvider, setSelectedProvider] = useState('All Providers')
  const [selectedCategory, setSelectedCategory] = useState('All Categories')

  const filteredModels = models.filter(model => {
    const matchesSearch = model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         model.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPlatform = selectedPlatform === 'All Platforms' ||
                           model.platforms.includes(selectedPlatform)
    const matchesProvider = selectedProvider === 'All Providers' ||
                           model.provider === selectedProvider
    const matchesCategory = selectedCategory === 'All Categories' ||
                           model.tags.some(tag => tag === selectedCategory)

    return matchesSearch && matchesPlatform && matchesProvider && matchesCategory
  })

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Open Source AI Model Marketplace
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Deploy enterprise-grade open-source AI models across multiple compute platforms with guaranteed performance and cost savings
        </Typography>

        {/* Platform Overview */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Open Source AI Infrastructure
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="primary">10</Typography>
                  <Typography variant="body2">Open Source Models</Typography>
                  <Typography variant="caption" color="text.secondary">
                    9 production ready, 1 in beta
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="primary">6</Typography>
                  <Typography variant="body2">Leading Providers</Typography>
                  <Typography variant="caption" color="text.secondary">
                    Meta, Mistral, Google, Microsoft & more
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="primary">60%</Typography>
                  <Typography variant="body2">Cost Advantage</Typography>
                  <Typography variant="caption" color="text.secondary">
                    vs closed-source alternatives
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Search and Filters */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  placeholder="Search models..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Platform</InputLabel>
                  <Select
                    value={selectedPlatform}
                    label="Platform"
                    onChange={(e) => setSelectedPlatform(e.target.value)}
                  >
                    {platforms.map((platform) => (
                      <MenuItem key={platform} value={platform}>
                        {platform}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Provider</InputLabel>
                  <Select
                    value={selectedProvider}
                    label="Provider"
                    onChange={(e) => setSelectedProvider(e.target.value)}
                  >
                    {providers.map((provider) => (
                      <MenuItem key={provider} value={provider}>
                        {provider}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={selectedCategory}
                    label="Category"
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6">
            {filteredModels.length} models found
          </Typography>
          {(searchTerm || selectedPlatform !== 'All Platforms' || selectedProvider !== 'All Providers' || selectedCategory !== 'All Categories') && (
            <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {searchTerm && (
                <Chip
                  size="small"
                  label={`Search: "${searchTerm}"`}
                  onDelete={() => setSearchTerm('')}
                />
              )}
              {selectedPlatform !== 'All Platforms' && (
                <Chip
                  size="small"
                  label={`Platform: ${selectedPlatform}`}
                  onDelete={() => setSelectedPlatform('All Platforms')}
                />
              )}
              {selectedProvider !== 'All Providers' && (
                <Chip
                  size="small"
                  label={`Provider: ${selectedProvider}`}
                  onDelete={() => setSelectedProvider('All Providers')}
                />
              )}
              {selectedCategory !== 'All Categories' && (
                <Chip
                  size="small"
                  label={`Category: ${selectedCategory}`}
                  onDelete={() => setSelectedCategory('All Categories')}
                />
              )}
            </Box>
          )}
        </Box>

        {/* Model Grid */}
        <Grid container spacing={3}>
          {filteredModels.map((model) => (
            <Grid item xs={12} md={6} lg={4} key={model.name}>
              <ModelCard {...model} />
            </Grid>
          ))}
        </Grid>

        {filteredModels.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No models found matching your criteria
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try adjusting your search terms or filters
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  )
}