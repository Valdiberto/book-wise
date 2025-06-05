import { api } from '@/lib/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { FormEvent, useState } from 'react'
import { Avatar } from '../ui/avatar'
import { RatingStars } from '../RatingStars/rating-stars'
import { TextArea } from '../ui/text-area'
import { ActionIcon } from '../ui/action-icon'
import { CheckIcon, XIcon } from '@phosphor-icons/react'

type RatingFormProps = {
  onCancel: () => void
  bookId: string
}

export function ReviewForm({ onCancel, bookId }: RatingFormProps) {
  const { data: session } = useSession()

  const user = session?.user

  const [description, setDescription] = useState('')
  const [currentRate, setCurrentRate] = useState(0)

  const submitDisabled = !description.trim() || !currentRate

  const queryClient = useQueryClient()

  const { mutateAsync: handleRate, isPending } = useMutation({
    mutationFn: async () => {
      await api.post(`/books/${bookId}/rate`, {
        description,
        rate: currentRate,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['book', bookId] })
      queryClient.invalidateQueries({ queryKey: ['books'] })
      onCancel()
    },
  })

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    if (submitDisabled) return
    await handleRate()
  }
  return (
    <div className="flex flex-col rounded-lg bg-gray-800 p-6">
      {user && (
        <div className="flex items-center justify-between">
          <section className="flex items-center gap-4">
            <Avatar size="md" src={user.image || ''} alt={user.name} />
            <h1 className="text-md font-bold text-gray-100">{user.name}</h1>
          </section>
          <RatingStars
            className="flex cursor-pointer items-center"
            size="lg"
            rating={currentRate}
            setRating={setCurrentRate}
          />
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
        <TextArea
          maxLength={450}
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          placeholder="Escreva sua avaliação"
        />
        <div className="flex items-center justify-end gap-2">
          <ActionIcon
            type="button"
            onClick={onCancel}
            icon={<XIcon size={24} className="text-purple-300" />}
          />
          <ActionIcon
            icon={<CheckIcon size={24} className="text-teal-300" />}
            disabled={submitDisabled || isPending}
          />
        </div>
      </form>
    </div>
  )
}
