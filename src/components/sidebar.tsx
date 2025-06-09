'use client'

import { Navigation } from './navigation'
import Link from 'next/link'
import { SignOutIcon } from '@phosphor-icons/react/dist/ssr'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Avatar } from './ui/avatar'
import * as Collapsible from '@radix-ui/react-collapsible'
import { Menu } from 'lucide-react'
import { Logo } from './Logo'
import { cn } from '@/lib/utils'

export function Sidebar() {
  const { data: session } = useSession()
  const router = useRouter()

  const user = session?.user

  const handleOpenProfile = () => {
    router.push(`/profile/${user?.id}`)
  }
  return (
    <Collapsible.Root className="flex flex-col justify-between rounded-xl bg-gray-700 bg-[url(/images/sidebar-bg.png)] bg-cover bg-center bg-no-repeat py-3 pb-6 lg:m-5 lg:h-auto lg:w-58 lg:items-center lg:pt-10">
      <div>
        <Collapsible.Trigger
          asChild
          className="fixed top-0 left-0 z-20 flex lg:hidden"
        >
          <button
            className={cn(
              'text-zinc-500 shadow-none hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-white/5',
              'rounded-lg px-4 py-2 text-sm font-semibold shadow-sm outline-none',
              'focus-visible:ring-1 focus-visible:ring-violet-500 focus-visible:ring-offset-1',
              'active:opacity-80',
            )}
          >
            <Menu className="h-6 w-6 text-gray-100" />
          </button>
        </Collapsible.Trigger>
      </div>

      <Collapsible.Content
        forceMount
        className="mt-10 flex flex-1 flex-col data-[state=closed]:hidden lg:mt-0 lg:data-[state=closed]:flex"
      >
        <div className="not-lg:hidden">
          <Logo />
        </div>

        <Navigation />
        <footer className="mt-5 ml-10 lg:mt-auto lg:ml-0">
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
      </Collapsible.Content>
    </Collapsible.Root>
  )
}
