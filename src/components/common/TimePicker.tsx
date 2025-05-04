import { ActionIcon } from '@mantine/core'
import { TimeInput, TimeInputProps } from '@mantine/dates'
import { useRef } from 'react'
import { IoIosTime } from 'react-icons/io'

type Props = {
  label?: string
} & TimeInputProps

export const TimePicker = ({ label = 'Select Time', ...props }: Props) => {
  const ref = useRef<HTMLInputElement>(null)

  const pickerControl = (
    <ActionIcon variant="subtle" onClick={() => ref.current?.showPicker()}>
      <IoIosTime width={16} height={16} color="#99e9ff" />
    </ActionIcon>
  )

  return (
    <TimeInput label={label} ref={ref} leftSection={pickerControl} {...props} />
  )
}
