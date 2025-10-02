import { ComponentProps, ReactNode } from 'react'

import { Link as LinkI18n } from '@/lib/i18n/navigation'
import { Button } from '@/ui/components/atoms/button'

type CommonProps = {
  href: string
  children: ReactNode
} & ComponentProps<typeof LinkI18n>

type WrapperProps = {
  asWrapper: true
}

type ButtonLinkProps = {
  asWrapper?: false
} & Omit<ComponentProps<typeof Button>, 'asChild'>

type Props = CommonProps & (WrapperProps | ButtonLinkProps)

export const Link = (props: Props) => {
  if (props.asWrapper) {
    const { asWrapper, ...otherProps } = props
    return <LinkI18n {...otherProps}>{props.children}</LinkI18n>
  }

  const { asWrapper, ...otherProps } = props
  return (
    <Button {...otherProps} asChild>
      <LinkI18n href={props.href}>{props.children}</LinkI18n>
    </Button>
  )
}
