import { useDisclosure } from '@mantine/hooks'
import { AddHomeworkDto, addHomeworkSchema } from './homeworks.type'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { notification, queryClient } from '../../lib'
import { Button, Modal, TextInput } from '@mantine/core'
import { CiCirclePlus } from 'react-icons/ci'
import { useAddHomework } from './api/add-homework'
import { DatePicker } from '../../components/common'

export const HomeworkForm = () => {
  const [opened, { open, close }] = useDisclosure()

  const { mutate: addHomework, isPending } = useAddHomework()

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm<AddHomeworkDto>({
    resolver: zodResolver(addHomeworkSchema),
  })

  const onSubmit = handleSubmit((data) => {
    addHomework(data, {
      onSuccess: () => {
        notification.success({ message: 'Homework added successfully' })
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
    queryClient.invalidateQueries({ queryKey: ['homeworks'] })
  }

  return (
    <>
      <Button
        leftSection={<CiCirclePlus className="w-5 h-5 text-black" />}
        onClick={() => open()}
        className="cursor-pointer"
      >
        Add Homework
      </Button>

      <Modal
        opened={opened}
        onClose={onCancel}
        title="Add Homework"
        centered
        size="lg"
      >
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <TextInput
            label="Content"
            {...register('content')}
            error={errors?.content?.message}
          />

          <Controller
            control={control}
            name="dueDate"
            render={({ field }) => (
              <DatePicker
                label="Select Due Date"
                {...field}
                error={errors?.dueDate?.message}
                withAsterisk
              />
            )}
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
