import { useFormContext } from 'react-hook-form'

import { cn } from '@/lib/utils/cn'
import {
  FormControl as FormInputControl,
  FormField as FormFieldControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/ui/components/atoms/form'
import { Input } from '@/ui/components/atoms/input'

type FormFieldWrapperProps = React.ComponentProps<typeof FormFieldControl>

type Props<TSchema> = Omit<FormFieldWrapperProps, 'render' | 'control'> & {
  label: string
  name: keyof TSchema
  className?: string
  inputProps?: React.ComponentProps<typeof Input>
}

export const FormField = <TSchema,>({
  label,
  className,
  inputProps,
  name,
  ...props
}: Props<TSchema>) => {
  const form = useFormContext()

  return (
    <FormFieldControl
      control={form.control}
      name={name}
      {...props}
      render={({ field }) => (
        <FormItem className={cn('relative', className)}>
          <FormLabel>{label}</FormLabel>
          <FormInputControl>
            <Input {...inputProps} {...field} />
          </FormInputControl>
          <FormMessage className="absolute top-full mt-1" />
        </FormItem>
      )}
    />
  )
}
