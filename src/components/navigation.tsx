'use client'

import {
  BinocularsIcon,
  ChartLineUpIcon,
  UserIcon,
} from '@phosphor-icons/react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'

const NAV_ITEMS = [
  {
    label: 'Início',
    href: '/',
    icon: <ChartLineUpIcon className="mr-3" size={24} />,
  },
  {
    label: 'Explorar',
    href: '/explore',
    icon: <BinocularsIcon className="mr-3" size={24} />,
  },
]

export function Navigation() {
  const pathname = usePathname()

  const { data: session } = useSession()

  const navItems = useMemo(() => {
    if (session) {
      return NAV_ITEMS.concat({
        label: 'Perfil',
        href: `/profile/${session.user.id}`,
        icon: <UserIcon size={24} />,
      })
    }
    return NAV_ITEMS
  }, [session])

  return (
    <nav className="mt-4 ml-4 flex flex-col lg:mt-0 lg:ml-0 lg:gap-7">
      {navItems.map(({ href, label, icon }) => (
        <Link
          href={href}
          key={label}
          className={`mb-4 flex items-center ${pathname === href ? 'font-bold text-gray-100' : 'text-gray-400'} hover:text-gray-100`}
        >
          <span
            className={`mr-4 flex h-6 w-1 rounded-full transition-opacity ${
              pathname === href
                ? 'bg-gradient-to-b from-teal-300 to-violet-400 opacity-100'
                : 'opacity-0'
            }`}
          />
          {icon}
          {label}
        </Link>
      ))}
    </nav>
  )
}
