'use client'

import { Book, CategoriesOnBooks, Category, Rating } from '@prisma/client'
import { useMemo, useState } from 'react'
import { PageTitle } from '../page-title'
import {
  CaretLeftIcon,
  MagnifyingGlassIcon,
  UserIcon,
} from '@phosphor-icons/react'
import { LinkCustom } from '../ui/link'
import { Input } from '../ui/input'
import { ProfileRatingsCard } from './profile-ratings-card'

export type ProfileRating = Rating & {
  book: Book & {
    categories: CategoriesOnBooks &
      {
        category: Category
      }[]
  }
}

type ProfileRatingsProps = {
  ratings: ProfileRating[]
  isOwnProfile?: boolean
}

export function ProfileRatings({ ratings, isOwnProfile }: ProfileRatingsProps) {
  const [search, setSearch] = useState('')

  const filteredRatings = useMemo(() => {
    return ratings.filter((rating) => {
      return rating.book.name.toLowerCase().includes(search.toLowerCase())
    })
  }, [ratings, search])

  return (
    <div className="scrollbar-hide flex flex-col overflow-y-auto pb-10 lg:h-full lg:w-full">
      {isOwnProfile ? (
        <PageTitle
          className="mt-2 mb-2 lg:mt-0 lg:mb-5"
          title="Perfil"
          icon={<UserIcon className="mt-2 mb-2 lg:mt-0 lg:mb-5" size={25} />}
        />
      ) : (
        <LinkCustom
          className="mt-5 mb-11 text-gray-200 lg:mt-0"
          href="/"
          text="Voltar"
          icon={<CaretLeftIcon size={20} />}
          iconposition="left"
        />
      )}

      <Input
        className="mb-4"
        placeholder="Buscar livro avaliado"
        icon={<MagnifyingGlassIcon className="mb-4" size={20} />}
        value={search}
        onChange={({ target }) => setSearch(target.value)}
      />

      <div className="flex flex-col gap-6">
        {filteredRatings.map((rating) => (
          <ProfileRatingsCard key={rating.id} rating={rating} />
        ))}
        {filteredRatings.length <= 0 && (
          <p className="text-center text-gray-400">
            {search
              ? 'Nenhum resultado encontrado'
              : 'Nenhuma avaliação encontrada'}
          </p>
        )}
      </div>
    </div>
  )
}
