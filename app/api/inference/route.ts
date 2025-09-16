import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { inferenceRequestSchema } from '@/lib/schemas'
import { CreditService } from '@/lib/credit-service'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = inferenceRequestSchema.parse(body)

    // Get user ID from session
    const userEmail = session.user.email
    if (!userEmail) {
      return NextResponse.json(
        { error: 'User email not found' },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email: userEmail },
      select: {
        id: true,
        firstTokenAt: true,
        promotionEligible: true,
        promotionClaimed: true,
        creditBalance: true
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Simulate AI inference processing
    // In production, this would call your AI inference service
    const mockResponse = `Mock response for prompt: "${validatedData.prompt}". This demonstrates the MARA AI Inference Platform's capability to deliver sub-120μs/token responses with 30-50% cost savings over hyperscalers.`
    const mockLatency = Math.floor(Math.random() * 100) + 80 // 80-180ms
    const mockTokensUsed = Math.floor(Math.random() * validatedData.maxTokens) + 10
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Calculate cost
    const cost = CreditService.calculateInferenceCost(validatedData.model, mockTokensUsed)

    // Check for first token promotion
    let promotionApplied = false
    let creditEarned = 0
    if (!user.firstTokenAt && user.promotionEligible && !user.promotionClaimed) {
      promotionApplied = await CreditService.applyFirstTokenPromotion(user.id)
      if (promotionApplied) {
        creditEarned = 20
      }
    }

    // Deduct from credit balance if available
    let paidWithCredits = false
    if (user.creditBalance >= cost) {
      paidWithCredits = await CreditService.useCredits(
        user.id,
        cost,
        `Inference request: ${validatedData.model} (${mockTokensUsed} tokens)`
      )
    }

    // Store inference request in database
    await prisma.inferenceRequest.create({
      data: {
        userId: user.id,
        model: validatedData.model,
        prompt: validatedData.prompt,
        response: mockResponse,
        maxTokens: validatedData.maxTokens,
        temperature: validatedData.temperature,
        tokensUsed: mockTokensUsed,
        latencyMs: mockLatency,
        status: 'COMPLETED',
        completedAt: new Date()
      }
    })

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 500))

    return NextResponse.json({
      id: requestId,
      response: mockResponse,
      tokensUsed: mockTokensUsed,
      latencyMs: mockLatency,
      model: validatedData.model,
      timestamp: new Date(),
      status: 'COMPLETED',
      cost,
      paidWithCredits,
      promotionApplied,
      creditEarned,
      creditBalance: user.creditBalance + creditEarned - (paidWithCredits ? cost : 0)
    })
  } catch (error) {
    console.error('Inference API error:', error)

    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid request data' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(_: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Return empty array for now (in production, this would fetch from database)
    return NextResponse.json([])
  } catch (error) {
    console.error('Get inference requests error:', error)

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}