'use client'

import Image from 'next/image'
import { Navigation } from './navigation'
import Link from 'next/link'
import { SignOutIcon } from '@phosphor-icons/react/dist/ssr'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Avatar } from './ui/avatar'

export function Sidebar() {
  const { data: session } = useSession()
  const router = useRouter()

  const user = session?.user

  const handleOpenProfile = () => {
    router.push(`/profile/${user?.id}`)
  }
  return (
    <aside className="m-5 flex w-58 flex-col items-center justify-between rounded-xl bg-gray-700 bg-[url(/images/sidebar-bg.png)] bg-cover bg-center bg-no-repeat pt-10 pb-6">
      <div>
        <Image
          className="mb-16"
          src="/images/Logotext.svg"
          alt=""
          width={128}
          height={32}
        />
        <Navigation />
      </div>
      <footer>
        {!user ? (
          <Link
            className="flex items-center gap-3 font-bold text-gray-200"
            href="/login"
          >
            Fazer login
            <SignOutIcon className="text-teal-300" size={20} />
          </Link>
        ) : (
          <div className="flex items-center gap-3">
            <Avatar
              className="h-full w-full cursor-pointer rounded-full object-cover"
              size="sm"
              alt={user?.name}
              onClick={handleOpenProfile}
              src={user?.image || '/images/default-avatar.png'}
            />
            <p className="max-w-25 overflow-hidden text-sm text-nowrap overflow-ellipsis text-gray-200">
              {user?.name}
            </p>
            <SignOutIcon
              className="cursor-pointer text-[#F75A68]"
              size={20}
              onClick={() => signOut()}
            />
          </div>
        )}
      </footer>
    </aside>
  )
}
