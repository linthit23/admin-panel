import {
  DatePickerInput,
  DatePickerProps,
  DateValue,
  DatesRangeValue,
} from '@mantine/dates'
import { ReactNode } from 'react'
import { FaCalendar } from 'react-icons/fa'
import { cn } from '../../utils/cn'

type Props = {
  type?: 'default' | 'range'
  placeholder?: string
  size?: DatePickerProps['size']
  value?: DatesRangeValue | Date[] | DateValue
  onChange: (value: DateValue | DatesRangeValue | Date[] | null) => void
  className?: string
  label?: ReactNode
  error?: any
  leftSection?: ReactNode
  withAsterisk?: boolean
  rightSection?: ReactNode
  excludeDate?: (date: Date) => boolean
  w?: string | number
  disabled?: boolean
}

export const DatePicker = ({
  placeholder = 'Select Date',
  size = 'md',
  withAsterisk = false,
  ...props
}: Props) => {
  return (
    <DatePickerInput
      placeholder={placeholder}
      size={size}
      clearable
      valueFormat="MMM D, YYYY"
      withAsterisk={withAsterisk}
      leftSection={<FaCalendar />}
      allowSingleDateInRange
      classNames={{
        day: cn([
          'data-[today]:border-[1.5px] data-[today]:border-primary data-[today]:border-solid',
        ]),
      }}
      {...props}
    />
  )
}
