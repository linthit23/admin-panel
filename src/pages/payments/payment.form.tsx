import { useDisclosure } from '@mantine/hooks'
import { AddPaymentDto, addPaymentSchema } from './payments.type'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { notification, queryClient } from '../../lib'
import { Button, Modal, TextInput } from '@mantine/core'
import { CiCirclePlus } from 'react-icons/ci'
import dayjs from 'dayjs'
import { DatePicker } from '../../components/common'
import { useAddPayment } from './api/add-payment'

export const PaymentForm = () => {
  const [opened, { open, close }] = useDisclosure()

  const { mutate: addPayment, isPending } = useAddPayment()

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<AddPaymentDto>({
    resolver: zodResolver(addPaymentSchema),
  })

  const onSubmit = handleSubmit((data) => {
    addPayment(data, {
      onSuccess: () => {
        notification.success({ message: 'Payment added successfully' })
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
    queryClient.invalidateQueries({ queryKey: ['payments'] })
  }

  return (
    <>
      <Button
        leftSection={<CiCirclePlus className="w-5 h-5 text-black" />}
        onClick={() => open()}
        className="cursor-pointer"
      >
        Add Payment
      </Button>

      <Modal
        opened={opened}
        onClose={onCancel}
        title="Add Payment"
        centered
        size="lg"
      >
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <Controller
            control={control}
            name="amount"
            render={({ field: { onChange, value } }) => (
              <TextInput
                type="number"
                label="Amount"
                error={errors.amount?.message}
                withAsterisk
                placeholder="Enter Amount"
                onChange={(e) => {
                  onChange(+e.target.value)
                }}
                value={value}
              />
            )}
          />

          <Controller
            control={control}
            name="dueDate"
            render={({ field: { onChange, value } }) => (
              <DatePicker
                className="my-2"
                label={<span className="text-sm">Due Date</span>}
                placeholder="Select Due Date"
                type="default"
                onChange={(value) => onChange(value)}
                value={value ? dayjs(value).toDate() : null}
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
