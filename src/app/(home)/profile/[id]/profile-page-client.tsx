'use client'

import { ProfileDetails } from '@/components/ProfileDetails/profile-details'
import {
  ProfileRating,
  ProfileRatings,
} from '@/components/ProfileRatings/profile-ratings'
import { api } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'

export type ProfileData = {
  user: {
    avatar_url: string
    name: string
    member_since: string
  }
  ratings: ProfileRating[]
  readPages: number
  ratedBooks: number
  readAuthors: number
  mostReadCategory?: string
}

export function ProfilePageClient() {
  const params = useParams()

  const userId = params.id as string

  const { data: session } = useSession()
  const { data: profileData } = useQuery<ProfileData>({
    queryKey: ['profile', userId],
    queryFn: async () => {
      const { data } = await api.get(`/profile/${userId}`)
      return data?.profile
    },
    enabled: !!userId,
  })

  const profile = profileData

  const isOwnProfile = session?.user?.id === userId

  if (!profile) {
    return <h1 className="text-gray-50">Carregando...</h1>
  }

  return (
    <div className="flex flex-col gap-16 lg:grid lg:h-full lg:grid-cols-[1fr_308px] lg:overflow-hidden">
      {profile ? (
        <>
          <ProfileRatings
            isOwnProfile={isOwnProfile}
            ratings={profile.ratings}
          />
          <ProfileDetails profile={profile} />
        </>
      ) : (
        <h1 className="text-gray-50">Carregando...</h1>
      )}
    </div>
  )
}
