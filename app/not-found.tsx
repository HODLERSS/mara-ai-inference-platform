import { Container, Typography, Box, Button } from '@mui/material'
import Link from 'next/link'

export default function NotFound() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom>
          404
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Page Not Found
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          The page you are looking for does not exist.
        </Typography>
        <Button
          component={Link}
          href="/"
          variant="contained"
          color="primary"
        >
          Go Home
        </Button>
      </Box>
    </Container>
  )
}