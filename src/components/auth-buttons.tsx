'use client'

import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'

type AuthButtonsProps = {
  canGuest?: boolean
  callbackUrl?: string
}

export function AuthButtons({ callbackUrl = '/', canGuest }: AuthButtonsProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSignIn = (provider?: string) => {
    if (!provider) {
      return router.push('/')
    }

    signIn(provider, {
      callbackUrl,
    })
  }
  const hasAuthError = !!searchParams.get('error')
  return (
    <section className="mt-10 flex flex-col gap-4">
      <button
        onClick={() => handleSignIn('google')}
        className="flex h-18 w-full cursor-pointer items-center rounded-lg border-none bg-gray-800 px-6 text-lg font-bold text-gray-200 hover:bg-gray-700"
      >
        <Image
          className="mr-5"
          src="/images/icons/google-icon.svg"
          height={32}
          width={32}
          alt="google icon"
        />
        Entrar com Google
      </button>
      {hasAuthError && <span>Falha ao se conectar.</span>}
      <button
        onClick={() => handleSignIn('github')}
        className="flex h-18 w-full cursor-pointer items-center rounded-lg border-none bg-gray-800 px-6 text-lg font-bold text-gray-200 hover:bg-gray-700"
      >
        <Image
          className="mr-5"
          src="/images/icons/github-fill.svg"
          height={32}
          width={32}
          alt="github icon"
        />
        Entrar com Github
      </button>

      {canGuest && (
        <button
          onClick={() => handleSignIn()}
          className="flex h-18 w-full cursor-pointer items-center rounded-lg border-none bg-gray-800 px-6 text-lg font-bold text-gray-200 hover:bg-gray-700"
        >
          <Image
            className="mr-5"
            src="/images/icons/RocketLaunch.svg"
            height={32}
            width={32}
            alt="rocket icon"
          />
          Entrar como visitante
        </button>
      )}
    </section>
  )
}
