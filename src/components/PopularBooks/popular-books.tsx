'use client'

import { CaretRightIcon } from '@phosphor-icons/react'
import { LinkCustom } from '../ui/link'

export function PopularBooks() {
  return (
    <div className="flex w-full flex-col gap-4">
      <header className="flex items-center justify-between">
        <p className="text-sm text-gray-100">Livros populares</p>

        <LinkCustom
          text="Ver Todas"
          href="/"
          iconposition="right"
          icon={<CaretRightIcon />}
        />
      </header>

      <section className="flex flex-col gap-3">bookCard</section>
    </div>
  )
}
