import { useDisclosure } from '@mantine/hooks'
import { AddFacilityDto, addFacilitySchema } from './facilities.type'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { notification, queryClient } from '../../lib'
import { Button, Modal, TextInput } from '@mantine/core'
import { CiCirclePlus } from 'react-icons/ci'
import { useAddFacility } from './api/add-facility'

export const FacilityForm = () => {
  const [opened, { open, close }] = useDisclosure()

  const { mutate: addFacility, isPending } = useAddFacility()

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<AddFacilityDto>({
    resolver: zodResolver(addFacilitySchema),
  })

  const onSubmit = handleSubmit((data) => {
    addFacility(data, {
      onSuccess: () => {
        notification.success({ message: 'Facility added successfully' })
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
    queryClient.invalidateQueries({ queryKey: ['facilities'] })
  }

  return (
    <>
      <Button
        leftSection={<CiCirclePlus className="w-5 h-5 text-black" />}
        onClick={() => open()}
        className="cursor-pointer"
      >
        Add Facility
      </Button>

      <Modal
        opened={opened}
        onClose={onCancel}
        title="Add Facility"
        centered
        size="lg"
      >
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <TextInput
            label="Name"
            {...register('name')}
            error={errors?.name?.message}
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
