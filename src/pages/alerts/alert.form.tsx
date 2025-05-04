import { useDisclosure } from '@mantine/hooks'
import { AddAlertDto, addAlertSchema } from './alerts.type'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { notification, queryClient } from '../../lib'
import { Button, Modal, TextInput } from '@mantine/core'
import { CiCirclePlus } from 'react-icons/ci'
import { useAddAlert } from './api/add-alert'
import { DatePicker } from '../../components/common'

export const AlertForm = () => {
  const [opened, { open, close }] = useDisclosure()

  const { mutate: addAlert, isPending } = useAddAlert()

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm<AddAlertDto>({
    resolver: zodResolver(addAlertSchema),
  })

  const onSubmit = handleSubmit((data) => {
    addAlert(data, {
      onSuccess: () => {
        notification.success({ message: 'Alert added successfully' })
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
    queryClient.invalidateQueries({ queryKey: ['alerts'] })
  }

  return (
    <>
      <Button
        leftSection={<CiCirclePlus className="w-5 h-5 text-black" />}
        onClick={() => open()}
        className="cursor-pointer"
      >
        Add Alert
      </Button>

      <Modal
        opened={opened}
        onClose={onCancel}
        title="Add Alert"
        centered
        size="lg"
      >
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <TextInput
            label="Content"
            {...register('content')}
            error={errors?.content?.message}
          />

          <TextInput
            label="Description"
            {...register('description')}
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
