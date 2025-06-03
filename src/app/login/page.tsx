import { AuthButtons } from '@/components/auth-buttons'
import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Login',
}

export default function Login() {
  return (
    <div className="grid min-h-screen grid-cols-2 items-center justify-center p-5">
      <section className="flex h-full w-full items-center justify-center rounded-[10px] bg-[url(/images/logo-bg.png)] bg-cover bg-center bg-no-repeat">
        <Image
          src="/images/Logotext.svg"
          height={58}
          width={232}
          alt="bookwise logo"
        />
      </section>
      <section className="mx-auto flex w-full max-w-93 flex-col justify-center pl-5">
        <h1 className="text-2xl font-bold text-gray-100">Boas vindas!</h1>
        <span className="leading-[160%] text-gray-200">
          Faça seu login ou acesse como visitante.
        </span>
        <AuthButtons />
      </section>
    </div>
  )
}
