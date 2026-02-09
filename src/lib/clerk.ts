import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export interface UserProfile {
  id: string
  email: string
  fullName: string | null
  phone: string | null
  type: 'individual' | 'company'
  companyId: string | null
  roles: string[]
  verifiedDriverLicense: boolean
  driverLicenseMeta: any
  profileImageUrl: string | null
}

export interface ClerkUserMetadata {
  roles?: string[]
  user_type?: 'individual' | 'company'
  company_id?: string
  onboarding_complete?: boolean
  license_uploaded?: boolean
  license_verified?: boolean
}

// Get current user with role information
export async function getCurrentUserWithRoles(): Promise<UserProfile | null> {
  try {
    const user = await currentUser()
    if (!user) return null

    // Extract metadata from Clerk user
    const metadata = user.publicMetadata as ClerkUserMetadata

    return {
      id: user.id,
      email: user.emailAddresses[0]?.emailAddress || '',
      fullName: user.fullName,
      phone: user.phoneNumbers[0]?.phoneNumber || null,
      type: metadata.user_type || 'individual',
      companyId: metadata.company_id || null,
      roles: metadata.roles || ['customer'],
      verifiedDriverLicense: metadata.license_verified || false,
      driverLicenseMeta: user.privateMetadata?.driver_license_meta || null,
      profileImageUrl: user.imageUrl
    }
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

// Check if user has specific role
export function hasRole(user: UserProfile | null, role: string): boolean {
  if (!user) return false
  return user.roles.includes(role)
}

// Check if user has any of the specified roles
export function hasAnyRole(user: UserProfile | null, roles: string[]): boolean {
  if (!user) return false
  return roles.some(role => user.roles.includes(role))
}

// Require authentication and redirect if not authenticated
export async function requireAuth() {
  const { userId } = await auth()
  if (!userId) {
    redirect('/sign-in')
  }
  return userId
}

// Require specific role and redirect if not authorized
export async function requireRole(role: string) {
  const user = await getCurrentUserWithRoles()
  if (!user || !hasRole(user, role)) {
    redirect('/unauthorized')
  }
  return user
}

// Require any of the specified roles
export async function requireAnyRole(roles: string[]) {
  const user = await getCurrentUserWithRoles()
  if (!user || !hasAnyRole(user, roles)) {
    redirect('/unauthorized')
  }
  return user
}

// Check if user is admin
export function isAdmin(user: UserProfile | null): boolean {
  return hasRole(user, 'admin')
}

// Check if user is car owner
export function isCarOwner(user: UserProfile | null): boolean {
  return hasRole(user, 'owner')
}

// Check if user is fleet manager
export function isFleetManager(user: UserProfile | null): boolean {
  return hasRole(user, 'fleet_manager')
}

// Check if user is support staff
export function isSupport(user: UserProfile | null): boolean {
  return hasRole(user, 'support')
}

// Check if user is finance staff
export function isFinance(user: UserProfile | null): boolean {
  return hasRole(user, 'finance')
}

// Get user's company ID
export function getUserCompanyId(user: UserProfile | null): string | null {
  return user?.companyId || null
}

// Check if user belongs to a specific company
export function belongsToCompany(user: UserProfile | null, companyId: string): boolean {
  return user?.companyId === companyId
}
