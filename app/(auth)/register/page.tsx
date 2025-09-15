'use client'

import { useState } from 'react'
import { Container, Box, Typography, Button } from '@mui/material'
import { RegistrationForm } from '@/components/forms/registration-form'
import { OnboardingWelcome } from '@/components/onboarding/onboarding-welcome'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RegisterPage() {
  const [isRegistered, setIsRegistered] = useState(false)
  const [userData, setUserData] = useState<any>(null)
  const router = useRouter()

  const handleRegistrationComplete = async (data: any) => {
    setUserData(data)
    setIsRegistered(true)
  }

  const handleOnboardingComplete = () => {
    // In a real app, this would handle authentication
    router.push('/playground')
  }

  if (isRegistered) {
    return (
      <OnboardingWelcome
        userData={userData}
        onComplete={handleOnboardingComplete}
      />
    )
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 8 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Get Started with MARA AI
        </Typography>
        <Typography variant="h6" color="text.secondary" align="center" sx={{ mb: 4 }}>
          Join thousands of developers building with sovereign AI infrastructure
        </Typography>

        <RegistrationForm
          onComplete={handleRegistrationComplete}
          onBack={() => router.push('/signin')}
        />

        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="body2" color="text.secondary">
            Already have an account?{' '}
            <Button component={Link} href="/signin" variant="text">
              Sign In
            </Button>
          </Typography>
        </Box>
      </Box>
    </Container>
  )
}