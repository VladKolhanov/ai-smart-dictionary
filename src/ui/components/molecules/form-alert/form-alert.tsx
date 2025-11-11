import { useEffect, useState } from 'react'

import type { handleError } from '@/lib/errors/handle-error'
import { cn } from '@/lib/utils/cn'
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/ui/components/atoms/alert'
import { ShieldCheckIcon, ShieldXIcon } from '@/ui/icons'

type Props = {
  variant: 'success' | 'error'
  data: ReturnType<typeof handleError> | string
  className?: string
}

export const FormAlert = ({ variant, data, className }: Props) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState<
    string | Record<string, string[]>
  >('')

  const isError = variant === 'error'

  useEffect(() => {
    if (typeof data === 'string') {
      setTitle('Error')
      setDescription(data)
    } else if (data.payload && typeof data.payload === 'object') {
      setTitle(data.payload.message)
      setDescription(data.payload.description)
    }
  }, [data])

  return (
    <Alert
      variant={isError ? 'destructive' : 'default'}
      className={cn(className)}
    >
      {isError ? <ShieldXIcon /> : <ShieldCheckIcon />}
      <AlertTitle className="first-letter:uppercase">{title}</AlertTitle>
      <AlertDescription className="first-letter:uppercase">
        {typeof description === 'string'
          ? description
          : Object.entries(description).map(([field, errors]) => (
              <div key={field}>
                <p>Field {`"${field}"`}:</p>
                {errors.map((error, i) => (
                  <p className="indent-4" key={i}>
                    {error}
                  </p>
                ))}
              </div>
            ))}
      </AlertDescription>
    </Alert>
  )
}
