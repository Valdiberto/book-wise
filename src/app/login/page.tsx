import { AuthButtons } from '@/components/auth-buttons'
import { Metadata } from 'next'
import Image from 'next/image'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Login',
}

export default function Login() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-5 lg:grid lg:grid-cols-2">
      <section className="flex h-full w-full items-center justify-center rounded-[10px] bg-[url(/images/logo-bg.png)] bg-cover bg-center bg-no-repeat">
        <Image
          src="/images/Logotext.svg"
          height={58}
          width={232}
          alt="bookwise logo"
        />
      </section>
      <section className="mx-auto mt-10 flex w-full max-w-93 flex-col justify-center pl-5 lg:mt-0">
        <h1 className="text-2xl font-bold text-gray-100">Boas vindas!</h1>
        <span className="leading-[160%] text-gray-200">
          Faça seu login ou acesse como visitante.
        </span>
        <Suspense fallback={null}>
          <AuthButtons canGuest />
        </Suspense>
      </section>
    </div>
  )
}
