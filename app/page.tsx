'use client'

import { Container, Typography, Box, Button, Grid, Card, CardContent, Paper } from '@mui/material'
import Link from 'next/link'
import { Dashboard, Store, TrendingUp, Description, Security, Speed } from '@mui/icons-material'
import { useSession } from 'next-auth/react'

const features = [
  {
    title: 'AI Model Hub',
    description: 'Access leading AI models optimized for enterprise workloads',
    href: '/marketplace',
    icon: <Store sx={{ fontSize: 40 }} />,
  },
  {
    title: 'Inference Dashboard',
    description: 'Monitor and manage your AI inference requests in real-time',
    href: '/dashboard',
    icon: <Dashboard sx={{ fontSize: 40 }} />,
  },
  {
    title: 'Performance Analytics',
    description: 'Track system performance and optimization opportunities',
    href: '/performance',
    icon: <Speed sx={{ fontSize: 40 }} />,
  },
  {
    title: 'Cost Optimization',
    description: 'Analyze costs and maximize ROI on your AI infrastructure',
    href: '/cost-analysis',
    icon: <TrendingUp sx={{ fontSize: 40 }} />,
  },
  {
    title: 'Developer APIs',
    description: 'Integrate MARA AI into your applications with ease',
    href: '/api-docs',
    icon: <Description sx={{ fontSize: 40 }} />,
  },
  {
    title: 'Enterprise Security',
    description: 'Sovereign AI infrastructure with enterprise-grade security',
    href: '/signin',
    icon: <Security sx={{ fontSize: 40 }} />,
  }
]

const stats = [
  { label: 'Response Time', value: '≤120μs', subtitle: 'per token' },
  { label: 'Cost Savings', value: '30-50%', subtitle: 'vs hyperscalers' },
  { label: 'Uptime SLA', value: '99.9%', subtitle: 'guaranteed' },
  { label: 'Models Available', value: '6+', subtitle: 'production ready' },
]

export default function HomePage() {
  const { data: session } = useSession()
  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 8 }}>
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Enterprise AI Inference Platform
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom color="text.secondary" sx={{ mb: 4 }}>
            Sovereign, Fast, Cost-Effective AI Infrastructure
          </Typography>
          <Typography variant="body1" sx={{ mb: 6, maxWidth: '700px', mx: 'auto', fontSize: '1.2rem' }}>
            MARA delivers enterprise-grade AI inference with guaranteed sub-120μs latency,
            99.9% uptime, and 30-50% cost savings compared to hyperscaler solutions.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            {session ? (
              // Authenticated user buttons
              <>
                <Button
                  component={Link}
                  href="/dashboard"
                  variant="contained"
                  size="large"
                  sx={{ minWidth: 160 }}
                >
                  Go to Dashboard
                </Button>
                <Button
                  component={Link}
                  href="/playground"
                  variant="outlined"
                  size="large"
                  sx={{ minWidth: 160 }}
                >
                  Try Playground
                </Button>
                <Button
                  component={Link}
                  href="/marketplace"
                  variant="outlined"
                  size="large"
                  sx={{ minWidth: 160 }}
                >
                  Browse Models
                </Button>
              </>
            ) : (
              // Unauthenticated user buttons
              <>
                <Button
                  component={Link}
                  href="/register"
                  variant="contained"
                  size="large"
                  sx={{ minWidth: 160 }}
                >
                  Get Started Free
                </Button>
                <Button
                  component={Link}
                  href="/playground"
                  variant="outlined"
                  size="large"
                  sx={{ minWidth: 160 }}
                >
                  Try Playground
                </Button>
                <Button
                  component={Link}
                  href="/signin"
                  variant="text"
                  size="large"
                  sx={{ minWidth: 160 }}
                >
                  Sign In
                </Button>
              </>
            )}
          </Box>
        </Box>

        {/* Performance Stats */}
        <Paper sx={{ p: 4, mb: 8 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
            Platform Performance
          </Typography>
          <Grid container spacing={4}>
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" component="div" color="primary.main" sx={{ fontWeight: 'bold' }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="h6" color="text.primary">
                    {stat.label}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.subtitle}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* Platform Features */}
        <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4, textAlign: 'center' }}>
          Platform Capabilities
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4
                  }
                }}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 3 }}>
                  <Box sx={{ color: 'primary.main', mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    {feature.description}
                  </Typography>
                  <Button
                    component={Link}
                    href={feature.href}
                    variant="outlined"
                    fullWidth
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Enterprise Value Proposition */}
        <Card sx={{
          mt: 8,
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          background: 'linear-gradient(135deg, #F1A800 0%, #F3B629 50%, #F6D483 100%)'
        }}>
          <CardContent sx={{ textAlign: 'center', py: 6 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#000' }}>
              Enterprise-Ready AI Infrastructure
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, color: '#000', opacity: 0.8 }}>
              Built for mission-critical applications with enterprise-grade security,
              compliance, and performance guarantees.
            </Typography>
            <Grid container spacing={4} sx={{ mt: 2 }}>
              <Grid item xs={12} md={4}>
                <Typography variant="h6" sx={{ color: '#000', fontWeight: 'bold' }}>🛡️ Sovereign Control</Typography>
                <Typography variant="body2" sx={{ color: '#000', opacity: 0.8 }}>
                  Your data, your infrastructure, your control
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h6" sx={{ color: '#000', fontWeight: 'bold' }}>⚡ Ultra-Low Latency</Typography>
                <Typography variant="body2" sx={{ color: '#000', opacity: 0.8 }}>
                  Sub-120μs response times guaranteed
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h6" sx={{ color: '#000', fontWeight: 'bold' }}>💰 Cost Optimized</Typography>
                <Typography variant="body2" sx={{ color: '#000', opacity: 0.8 }}>
                  30-50% savings vs traditional cloud providers
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Container>
  )
}