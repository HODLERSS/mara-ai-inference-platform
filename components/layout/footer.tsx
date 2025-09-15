'use client'

import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
  useTheme
} from '@mui/material'
import {
  LinkedIn,
  Twitter,
  Facebook,
  Instagram,
  Email,
  Phone,
  LocationOn
} from '@mui/icons-material'

const footerLinks = {
  platform: [
    { name: 'AI Model Hub', href: '/marketplace' },
    { name: 'API Documentation', href: '/api-docs' },
    { name: 'Playground', href: '/playground' },
    { name: 'Performance Analytics', href: '/performance' }
  ],
  company: [
    { name: 'About MARA', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'News & Media', href: '/media' },
    { name: 'Investor Relations', href: 'https://ir.mara.com' }
  ],
  resources: [
    { name: 'Developer Docs', href: '/api-docs' },
    { name: 'Support Center', href: '/support' },
    { name: 'Status Page', href: '/status' },
    { name: 'Security', href: '/security' }
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Compliance', href: '/compliance' }
  ]
}

const socialLinks = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/marathon-digital-holdings',
    icon: <LinkedIn />
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/marathondh',
    icon: <Twitter />
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/MARAHoldings',
    icon: <Facebook />
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/maraholdingsinc',
    icon: <Instagram />
  }
]

export function Footer() {
  const theme = useTheme()
  const currentYear = new Date().getFullYear()

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: (theme) => theme.palette.mode === 'dark' ? 'grey.900' : 'grey.100',
        mt: 'auto',
        pt: 6,
        pb: 3
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              MARA AI
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Enterprise AI Inference Platform delivering sovereign, fast, and cost-effective AI infrastructure.
            </Typography>

            {/* Contact Info */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <LocationOn sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
              <Typography variant="caption" color="text.secondary">
                Las Vegas, NV & Paris, France
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Email sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
              <Typography variant="caption" color="text.secondary">
                contact@mara.ai
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Phone sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
              <Typography variant="caption" color="text.secondary">
                1-800-MARA-AI
              </Typography>
            </Box>

            {/* Social Links */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              {socialLinks.map((social) => (
                <IconButton
                  key={social.name}
                  component="a"
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  sx={{
                    color: 'text.secondary',
                    '&:hover': {
                      color: 'primary.main',
                      bgcolor: 'action.hover'
                    }
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* Platform Links */}
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
              Platform
            </Typography>
            {footerLinks.platform.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                variant="body2"
                color="text.secondary"
                sx={{
                  display: 'block',
                  mb: 1,
                  textDecoration: 'none',
                  '&:hover': {
                    color: 'primary.main',
                    textDecoration: 'underline'
                  }
                }}
              >
                {link.name}
              </Link>
            ))}
          </Grid>

          {/* Company Links */}
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
              Company
            </Typography>
            {footerLinks.company.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                variant="body2"
                color="text.secondary"
                sx={{
                  display: 'block',
                  mb: 1,
                  textDecoration: 'none',
                  '&:hover': {
                    color: 'primary.main',
                    textDecoration: 'underline'
                  }
                }}
              >
                {link.name}
              </Link>
            ))}
          </Grid>

          {/* Resources Links */}
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
              Resources
            </Typography>
            {footerLinks.resources.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                variant="body2"
                color="text.secondary"
                sx={{
                  display: 'block',
                  mb: 1,
                  textDecoration: 'none',
                  '&:hover': {
                    color: 'primary.main',
                    textDecoration: 'underline'
                  }
                }}
              >
                {link.name}
              </Link>
            ))}
          </Grid>

          {/* Legal Links */}
          <Grid item xs={6} md={3}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
              Legal & Compliance
            </Typography>
            {footerLinks.legal.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                variant="body2"
                color="text.secondary"
                sx={{
                  display: 'block',
                  mb: 1,
                  textDecoration: 'none',
                  '&:hover': {
                    color: 'primary.main',
                    textDecoration: 'underline'
                  }
                }}
              >
                {link.name}
              </Link>
            ))}

            <Box sx={{ mt: 3 }}>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                🏛️ SOC 2 Type II Certified
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                🛡️ GDPR & CCPA Compliant
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                📊 NASDAQ: MARA
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Bottom Section */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
          <Typography variant="body2" color="text.secondary">
            © {currentYear} MARA Holdings, Inc. All rights reserved.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Powered by sustainable digital infrastructure
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}