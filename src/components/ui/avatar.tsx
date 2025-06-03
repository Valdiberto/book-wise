import Image from 'next/image'
import { ComponentProps } from 'react'
import { tv } from 'tailwind-variants'

type AvatarProps = ComponentProps<typeof Image> & {
  src: string
  size?: 'sm' | 'md' | 'lg'
  alt: string
}

const avatar = tv({
  base: 'rounded-full  p-[1px] bg-gradient-to-b from-teal-300 to-violet-400',
  variants: {
    size: {
      sm: 'w-8 h-8 min-w-8',
      md: 'w-10 h-10 min-w-10',
      lg: 'w-18 h-18 min-w-18',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export function Avatar({ src, alt, size = 'md', ...props }: AvatarProps) {
  return (
    <div className={avatar({ size })}>
      <Image
        src={src}
        width={80}
        height={80}
        alt={alt}
        className="h-full w-full rounded-full object-cover"
        {...props}
      />
    </div>
  )
}
