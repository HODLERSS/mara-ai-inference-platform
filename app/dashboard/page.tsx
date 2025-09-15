import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { DashboardClient } from '@/components/dashboard/dashboard-client'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect('/signin')
  }

  // For now, return empty array since we don't have database set up yet
  const recentInferences: any[] = []

  return <DashboardClient initialInferences={recentInferences} />
}