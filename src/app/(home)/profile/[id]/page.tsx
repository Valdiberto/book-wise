import { Metadata } from 'next'
import { ProfilePageClient } from './profile-page-client'

export const metadata: Metadata = {
  title: 'Perfil',
}

export default function ProfilePage() {
  return <ProfilePageClient />
}
