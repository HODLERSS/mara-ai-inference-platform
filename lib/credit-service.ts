import { prisma } from '@/lib/db'
import { CreditType } from '@prisma/client'

const PROMOTION_AMOUNT = 20.0
const PROMOTION_TIME_LIMIT = 180 // 3 minutes in seconds

export interface CreditTransaction {
  userId: string
  amount: number
  type: CreditType
  description: string
  expiresAt?: Date
}

export class CreditService {
  /**
   * Apply promotional credit for first token generation within 3 minutes
   */
  static async applyFirstTokenPromotion(userId: string): Promise<boolean> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          createdAt: true,
          firstTokenAt: true,
          promotionEligible: true,
          promotionClaimed: true,
        }
      })

      if (!user || !user.promotionEligible || user.promotionClaimed) {
        return false
      }

      const now = new Date()
      const timeSinceRegistration = (now.getTime() - user.createdAt.getTime()) / 1000

      if (timeSinceRegistration > PROMOTION_TIME_LIMIT) {
        // Mark as ineligible if time limit exceeded
        await prisma.user.update({
          where: { id: userId },
          data: { promotionEligible: false }
        })
        return false
      }

      // Apply the promotional credit
      await prisma.$transaction([
        prisma.user.update({
          where: { id: userId },
          data: {
            firstTokenAt: now,
            promotionClaimed: true,
            creditBalance: { increment: PROMOTION_AMOUNT }
          }
        }),
        prisma.credit.create({
          data: {
            userId,
            amount: PROMOTION_AMOUNT,
            type: CreditType.PROMOTIONAL,
            description: 'Welcome bonus: First token generated within 3 minutes!',
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days expiry
          }
        })
      ])

      return true
    } catch (error) {
      console.error('Error applying first token promotion:', error)
      return false
    }
  }

  /**
   * Check if user is still eligible for promotion
   */
  static async checkPromotionEligibility(userId: string): Promise<{
    eligible: boolean
    timeRemaining: number | null
  }> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          createdAt: true,
          promotionEligible: true,
          promotionClaimed: true,
        }
      })

      if (!user || !user.promotionEligible || user.promotionClaimed) {
        return { eligible: false, timeRemaining: null }
      }

      const timeSinceRegistration = (Date.now() - user.createdAt.getTime()) / 1000
      const timeRemaining = Math.max(0, PROMOTION_TIME_LIMIT - timeSinceRegistration)

      return {
        eligible: timeRemaining > 0,
        timeRemaining: Math.floor(timeRemaining)
      }
    } catch (error) {
      console.error('Error checking promotion eligibility:', error)
      return { eligible: false, timeRemaining: null }
    }
  }

  /**
   * Add credit to user account
   */
  static async addCredit(transaction: CreditTransaction): Promise<boolean> {
    try {
      await prisma.$transaction([
        prisma.user.update({
          where: { id: transaction.userId },
          data: {
            creditBalance: { increment: transaction.amount }
          }
        }),
        prisma.credit.create({
          data: transaction
        })
      ])
      return true
    } catch (error) {
      console.error('Error adding credit:', error)
      return false
    }
  }

  /**
   * Use credits for a service
   */
  static async useCredits(userId: string, amount: number, description: string): Promise<boolean> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { creditBalance: true }
      })

      if (!user || user.creditBalance < amount) {
        return false
      }

      await prisma.$transaction([
        prisma.user.update({
          where: { id: userId },
          data: {
            creditBalance: { decrement: amount }
          }
        }),
        prisma.credit.create({
          data: {
            userId,
            amount: -amount,
            type: CreditType.ADJUSTMENT,
            description
          }
        })
      ])

      return true
    } catch (error) {
      console.error('Error using credits:', error)
      return false
    }
  }

  /**
   * Get user credit balance and history
   */
  static async getUserCredits(userId: string) {
    try {
      const [user, credits] = await Promise.all([
        prisma.user.findUnique({
          where: { id: userId },
          select: {
            creditBalance: true,
            promotionEligible: true,
            promotionClaimed: true,
            firstTokenAt: true,
          }
        }),
        prisma.credit.findMany({
          where: { userId },
          orderBy: { appliedAt: 'desc' },
          take: 10
        })
      ])

      return {
        balance: user?.creditBalance ?? 0,
        promotionStatus: {
          eligible: user?.promotionEligible ?? false,
          claimed: user?.promotionClaimed ?? false,
          firstTokenAt: user?.firstTokenAt
        },
        history: credits
      }
    } catch (error) {
      console.error('Error getting user credits:', error)
      return null
    }
  }

  /**
   * Calculate cost for inference request
   */
  static calculateInferenceCost(model: string, tokensUsed: number): number {
    // Pricing per 1000 tokens (example rates)
    const modelPricing: Record<string, number> = {
      'llama-2-70b': 2.56,
      'llama-2-13b': 1.23,
      'mixtral-8x7b': 1.90,
      'codellama-34b': 1.78,
    }

    const pricePerThousand = modelPricing[model] ?? 2.0
    return (tokensUsed / 1000) * pricePerThousand
  }
}