import { useDisclosure } from '@mantine/hooks'
import { notification, queryClient } from '../../lib'
import { Button, Modal, Select } from '@mantine/core'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import {
  UpdateBookingStatusDto,
  updateBookingStatusSchema,
} from './bookings.type'
import { useUpdateBookingStatus } from './api/update-booking-status'

const STATUSES = [
  { label: 'Pending', value: 'PENDING' },
  { label: 'Approved', value: 'APPROVED' },
  { label: 'Rejected', value: 'REJECTED' },
]

export const UpdateBookingStatus = ({
  bookingId,
  current,
}: {
  bookingId: string
  current: 'PENDING' | 'APPROVED' | 'REJECTED'
}) => {
  const [opened, { open, close }] = useDisclosure(false)

  const { mutate: updateBooking, isPending } = useUpdateBookingStatus()

  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<UpdateBookingStatusDto>({
    resolver: zodResolver(updateBookingStatusSchema),
  })

  const onSubmit = handleSubmit((payload) => {
    updateBooking(
      { id: bookingId, payload },
      {
        onSuccess: () => {
          notification.success({
            message: 'Booking Status updated sucessfully',
          })
          onClose()
        },
        onError: (error) => {
          notification.error({ message: error.message, error })
        },
      }
    )
  })

  const onClose = () => {
    close()
    queryClient.invalidateQueries({ queryKey: ['bookings'] })
  }

  return (
    <>
      <Button onClick={open} className="cursor-pointer">
        Update Status
      </Button>

      <Modal
        opened={opened}
        onClose={onClose}
        size="lg"
        title={`Update Booking Status`}
        centered
      >
        <div className="mb-4">
          <Controller
            name="status"
            control={control}
            defaultValue={current}
            render={({ field }) => (
              <Select
                {...field}
                data={STATUSES}
                label="Status"
                error={errors.status?.message}
              />
            )}
          />
        </div>

        <Button
          onClick={onClose}
          loading={isPending}
          variant="outline"
          className="mr-2"
        >
          Cancel
        </Button>
        <Button
          loading={isPending}
          disabled={current !== 'PENDING'}
          onClick={onSubmit}
        >
          Confirm
        </Button>
      </Modal>
    </>
  )
}
