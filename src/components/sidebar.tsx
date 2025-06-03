import Image from 'next/image'
import { Navigation } from './navigation'
import Link from 'next/link'
import { SignOutIcon } from '@phosphor-icons/react/dist/ssr'

export function Sidebar() {
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
        <Link
          className="flex items-center gap-3 font-bold text-gray-200"
          href="/login"
        >
          Fazer login
          <SignOutIcon className="text-teal-300" size={20} />
        </Link>
      </footer>
    </aside>
  )
}
