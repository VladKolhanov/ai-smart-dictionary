import type { ActionError } from '@/core/types/global'
import { cn } from '@/shared/utils/cn'
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/ui/components/atoms/alert'
import { ShieldXIcon } from '@/ui/icons'

type Props = {
  error: ActionError | null
  className?: string
}

// TODO: refactor this component

export const FormErrorAlert = ({ error, className }: Props) => {
  if (!error) return null

  return (
    <Alert
      variant="destructive"
      className={cn(
        'animate-in duration-300 zoom-in-95 fade-in',
        'border-l-4 border-l-destructive',
        'shadow-lg shadow-destructive/10',
        className
      )}
    >
      <ShieldXIcon className="h-5 w-5 text-destructive" />

      <AlertTitle className="">{error.message}</AlertTitle>

      <div />

      {!!error.details && (
        <AlertDescription className="">
          <div className="">
            {Object.entries(error.details).map(([key, value], i) => (
              <div key={i} className="">
                {Array.isArray(value) ? (
                  <div className="">
                    <p className="">{key}:</p>
                    <ul className="">
                      {value.map((error, idx) => (
                        <li key={idx} className="">
                          {error}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="">{value}</p>
                )}
              </div>
            ))}
          </div>
        </AlertDescription>
      )}
    </Alert>
  )
}
