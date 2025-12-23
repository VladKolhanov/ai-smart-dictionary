import {
  type ControllerProps,
  type FieldValues,
  type Path,
  useFormContext,
} from 'react-hook-form'

import { cn } from '@/shared/utils/cn'
import {
  FormControl as FormInputControl,
  FormField as FormFieldControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/ui/components/atoms/form'
import { Input } from '@/ui/components/atoms/input'

type Props<TSchema extends FieldValues> = Omit<
  ControllerProps<TSchema, Path<TSchema>>,
  'render' | 'control'
> & {
  label: string
  className?: string
  inputProps?: React.ComponentProps<typeof Input>
}

export const FormField = <TSchema extends FieldValues>({
  label,
  className,
  inputProps,
  name,
  ...props
}: Props<TSchema>) => {
  const form = useFormContext<TSchema>()

  return (
    <FormFieldControl<TSchema>
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
