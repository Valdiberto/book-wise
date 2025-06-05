import { ProfileData } from '@/app/(home)/profile/[id]/profile-page-client'
import { Avatar } from '../ui/avatar'
import { ProfileItemsDetails } from './profile-items-details'
import {
  BookIcon,
  BookmarkSimpleIcon,
  BookOpenIcon,
  UserListIcon,
} from '@phosphor-icons/react/dist/ssr'

type ProfileDetailsProps = {
  profile: ProfileData
}

export function ProfileDetails({ profile }: ProfileDetailsProps) {
  const memberSinceYear = new Date(profile.user.member_since).getFullYear()

  return (
    <div className="mt-18 flex h-max w-full flex-col items-center border-l border-gray-700/80">
      <div className="flex flex-col items-center">
        <Avatar
          size="lg"
          alt={profile.user.name}
          src={profile.user.avatar_url}
        />
        <h1 className="mt-5 text-xl text-gray-100">{profile.user.name}</h1>
        <p className="text-sm text-gray-400">membro desde {memberSinceYear}</p>
      </div>
      <span className="mt-8 flex h-1 w-8 rounded-full bg-gradient-to-b from-teal-300 to-violet-400 opacity-100 transition-opacity"></span>

      <div className="mt-10 flex flex-col gap-10">
        <ProfileItemsDetails
          icon={<BookOpenIcon size={32} className="text-green-300" />}
          info={profile.readPages}
          label="Páginas Lidas"
        />
        <ProfileItemsDetails
          icon={<BookIcon size={32} className="text-green-300" />}
          info={profile.ratedBooks}
          label="Livros avaliados"
        />
        <ProfileItemsDetails
          icon={<UserListIcon size={32} className="text-green-300" />}
          info={profile.ratedBooks}
          label="Autores lidos"
        />
        {profile?.mostReadCategory && (
          <ProfileItemsDetails
            icon={<BookmarkSimpleIcon size={32} className="text-green-300" />}
            info={profile.mostReadCategory}
            label="Categoria mais lida"
          />
        )}
      </div>
    </div>
  )
}
