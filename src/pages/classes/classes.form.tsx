import { useDisclosure } from '@mantine/hooks'
import { AddClassDto, addClassSchema } from './classes.type'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { notification, queryClient } from '../../lib'
import { Button, Modal, TextInput } from '@mantine/core'
import { CiCirclePlus } from 'react-icons/ci'
import { useAddClass } from './api/add-class'
import { DatePicker, TimePicker } from '../../components/common'
import dayjs from 'dayjs'

export const ClassForm = () => {
  const [opened, { open, close }] = useDisclosure()

  const { mutate: addClass, isPending } = useAddClass()

  const {
    handleSubmit,
    register,
    control,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AddClassDto>({
    resolver: zodResolver(addClassSchema),
  })

  const onSubmit = handleSubmit((data) => {
    const { date, ...payload } = data

    addClass(payload, {
      onSuccess: () => {
        notification.success({ message: 'Class added successfully' })
        onCancel()
      },
      onError: (error) => {
        notification.error({
          message: error.message || 'Something went wrong',
          error,
        })
      },
    })
  })

  const onCancel = () => {
    close()
    reset()
    queryClient.invalidateQueries({ queryKey: ['classes'] })
  }

  const handleTimePickerChange = (time: string, key: 'start' | 'end') => {
    const date = watch('date') || dayjs().toDate()

    const [hours, minutes] = time.split(':').map(Number)

    const ret = dayjs(date)
      .set('hour', hours)
      .set('minute', minutes)
      .toISOString()

    setValue(key, ret)
  }

  return (
    <>
      <Button
        leftSection={<CiCirclePlus className="w-5 h-5 text-black" />}
        onClick={() => open()}
        className="cursor-pointer"
      >
        Add Class
      </Button>

      <Modal
        opened={opened}
        onClose={onCancel}
        title="Add Class"
        centered
        size="lg"
      >
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <Controller
            control={control}
            name="date"
            render={({ field }) => (
              <DatePicker
                label="Select Date"
                {...field}
                error={errors?.date?.message}
                withAsterisk
              />
            )}
          />

          <TimePicker
            value={watch('start') ? dayjs(watch('start')).format('HH:mm') : ''}
            onChange={(e) => handleTimePickerChange(e.target.value, 'start')}
            label="Start Time"
            withAsterisk
          />

          <TimePicker
            value={watch('end') ? dayjs(watch('end')).format('HH:mm') : ''}
            onChange={(e) => handleTimePickerChange(e.target.value, 'end')}
            label="End Time"
            withAsterisk
          />

          <TextInput
            label="Subject"
            {...register('subject')}
            error={errors?.subject?.message}
          />

          <TextInput
            label="Instructor"
            {...register('instructor')}
            error={errors?.instructor?.message}
          />

          <TextInput
            label="Room"
            {...register('room')}
            error={errors?.room?.message}
          />

          <div className="flex justify-end">
            <Button variant="outline" onClick={onCancel} className="mr-2">
              Cancel
            </Button>
            <Button type="submit" loading={isPending}>
              Submit
            </Button>
          </div>
        </form>
      </Modal>
    </>
  )
}
