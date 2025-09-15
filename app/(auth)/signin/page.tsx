'use client'

import { Container, Box, Alert, Typography, Button } from '@mui/material'
import { LoginForm } from '@/components/forms/login-form'
import { signIn } from 'next-auth/react'
import Link from 'next/link'

async function handleLogin(data: { email: string; password: string }) {
  try {
    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    })

    if (result?.error) {
      throw new Error('Invalid credentials')
    }

    if (result?.ok) {
      window.location.href = '/dashboard'
    }
  } catch (error) {
    console.error('Login error:', error)
    throw error
  }
}

export default function SignInPage() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
          Access MARA AI Platform
        </Typography>

        <Alert severity="info" sx={{ mb: 4 }}>
          <Typography variant="subtitle2" gutterBottom>
            Enterprise Access Credentials
          </Typography>
          <Typography variant="body2">
            Email: <strong>minjAI@mara.com</strong><br/>
            Password: <strong>maradigital</strong>
          </Typography>
        </Alert>

        <LoginForm onSubmit={handleLogin} />

        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="body2" color="text.secondary">
            Don't have an account?{' '}
            <Button component={Link} href="/register" variant="text">
              Sign Up for Free
            </Button>
          </Typography>
        </Box>
      </Box>
    </Container>
  )
}