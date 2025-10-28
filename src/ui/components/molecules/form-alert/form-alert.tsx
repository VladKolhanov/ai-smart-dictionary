import { useTranslations } from 'next-intl'

import { cn } from '@/lib/utils/cn'
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/ui/components/atoms/alert'
import { ShieldCheckIcon, ShieldXIcon } from '@/ui/icons'

type Props = {
  variant: 'success' | 'error'
  message: string
  className?: string
}

export const FormAlert = ({ variant, message, className }: Props) => {
  const t = useTranslations('form-alert')

  const isError = variant === 'error'

  return (
    <Alert
      variant={isError ? 'destructive' : 'default'}
      className={cn(className)}
    >
      {isError ? <ShieldXIcon /> : <ShieldCheckIcon />}
      <AlertTitle className="first-letter:uppercase">
        {isError ? t('errorTitle') : t('successTitle')}
      </AlertTitle>
      <AlertDescription className="first-letter:uppercase">
        {message}
      </AlertDescription>
    </Alert>
  )
}
