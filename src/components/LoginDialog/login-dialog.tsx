import { cn } from '@/lib/utils'
import { XIcon } from '@phosphor-icons/react'
import * as Dialog from '@radix-ui/react-dialog'
import { ReactNode } from 'react'
import { AuthButtons } from '../auth-buttons'
import { useSearchParams } from 'next/navigation'

type LoginDialogProps = {
  children: ReactNode
}

export function LoginDialog({ children }: LoginDialogProps) {
  const searchParams = useSearchParams()
  const paramBookId = searchParams.get('book')

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          className={cn(
            'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
            'fixed inset-0 bg-[#00000099]',
          )}
        />
        <Dialog.Content
          className={cn(
            'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-200',
            'fixed top-[50%] left-[50%] max-w-129 transform-[translate(-50%,_-50%)] rounded-xl bg-gray-900 px-18 py-14 shadow-[-4px_0px_30px_0px_#00000040]',
          )}
        >
          <Dialog.Title></Dialog.Title>
          <Dialog.Description></Dialog.Description>

          <Dialog.Close className="absolute top-4 right-4 flex items-center justify-center border-none bg-transparent text-gray-400">
            <XIcon size={24} />
          </Dialog.Close>

          <div>
            <h1 className="mb-10 font-bold text-gray-200">
              {' '}
              Faça login para deixar sua avaliação
            </h1>
            <AuthButtons
              callbackUrl={
                paramBookId ? `/explore?book=${paramBookId}` : '/explore'
              }
            />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
