import { StarIcon } from '@phosphor-icons/react'
import { ComponentProps, useState } from 'react'
import { tv } from 'tailwind-variants'

type RatingStarsProps = ComponentProps<'div'> & {
  rating: number
  size?: 'sm' | 'md' | 'lg'
  setRating?: (rating: number) => void
}

const ratestars = tv({
  base: 'text-purple-300',
  variants: {
    size: {
      sm: 'w-3.5 h-3.5 px-[2px]',
      md: 'w-5 h-5 px-[3px]',
      lg: 'w-6 h-6 px-[2px]',
    },
  },
  defaultVariants: {
    size: 'sm',
  },
})

export function RatingStars({
  rating,
  size = 'sm',
  setRating,
  ...props
}: RatingStarsProps) {
  const [previewValue, setPreviewValue] = useState(0)
  const isEditable = !!setRating

  const ratingValue = isEditable ? previewValue : rating

  const handleMouseEnter = (value: number) => {
    if (isEditable) setPreviewValue(value)
  }

  const handleMouseLeave = () => {
    if (isEditable) setPreviewValue(rating)
  }

  const handleSetValue = () => {
    if (isEditable) setRating(previewValue)
  }

  return (
    <div className="flex items-center" {...props}>
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon
          key={`star-${i}`}
          weight={i + 1 <= ratingValue ? 'fill' : 'regular'}
          className={ratestars({ size })}
          onMouseEnter={() => handleMouseEnter(i + 1)}
          onMouseLeave={handleMouseLeave}
          onClick={handleSetValue}
        />
      ))}
    </div>
  )
}
