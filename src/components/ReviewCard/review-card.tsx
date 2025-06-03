import Image from 'next/image'
import Link from 'next/link'
import { Avatar } from '../ui/avatar'
import { RatingStars } from '../RatingStars/rating-stars'

export function ReviewCard() {
  return (
    <div className="flex w-full flex-col rounded-lg bg-gray-900 p-6">
      <div className="mb-8 flex items-start justify-between">
        <section className="flex items-center gap-4">
          <Link href="/">
            <Avatar
              size="md"
              src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
              alt=""
            />
          </Link>
          <div>
            <p className="text-gray-100">Valdiberto username</p>
            <p className="text-sm text-gray-400">distancia</p>
          </div>
        </section>
        <RatingStars rating={5} />
      </div>

      <div className="flex">
        <Link href="/">
          <Image
            className="mr-5 min-w-27 rounded-md object-cover hover:brightness-125"
            src="/images/books/Book.png"
            width={108}
            height={152}
            alt=""
          />
        </Link>

        <div className="flex flex-col">
          <div>
            <h1 className="font-bold text-gray-100">Nome do livro</h1>
            <p className="text-sm text-gray-400"> autor do livro</p>
          </div>
          <p className="mt-5 text-sm text-gray-300">
            Nec tempor nunc in egestas. Euismod nisi eleifend at et in sagittis.
            Penatibus id vestibulum imperdiet a at imperdiet lectus leo. Sit
            porta eget nec vitae sit vulputate eget
          </p>
        </div>
      </div>
    </div>
  )
}
