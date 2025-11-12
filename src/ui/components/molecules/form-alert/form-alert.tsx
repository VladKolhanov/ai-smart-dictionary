import type { ReactNode } from 'react'

import type { handleError } from '@/lib/errors'
import { cn } from '@/lib/utils/cn'
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/ui/components/atoms/alert'
import { ShieldCheckIcon, ShieldXIcon } from '@/ui/icons'

type Props = {
  variant: 'success' | 'error'
  data: ReturnType<typeof handleError>
  className?: string
}

export const FormAlert = ({ variant, data, className }: Props) => {
  let title: string = ''
  let description: string | ReactNode | ReactNode[] = []
  const isError = variant === 'error'

  if (data.type === 'parse-schema') {
    title = data.message
    description = Object.entries(data.fields).map(([field, errors]) => (
      <div key={field}>
        <p>Field {field}:</p>
        {errors.map((error, i) => (
          <p className="indent-4" key={i}>
            {error}
          </p>
        ))}
      </div>
    ))
  } else {
    title = 'Error'
    description = data.message
  }

  return (
    <Alert
      variant={isError ? 'destructive' : 'default'}
      className={cn(className)}
    >
      {isError ? <ShieldXIcon /> : <ShieldCheckIcon />}
      <AlertTitle className="first-letter:uppercase">{title}</AlertTitle>
      <AlertDescription className="first-letter:uppercase">
        {description}
      </AlertDescription>
    </Alert>
  )
}
