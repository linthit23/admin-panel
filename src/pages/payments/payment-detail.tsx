import { useParams } from 'react-router-dom'
import { useGetPaymentById } from './api/get-payment-by-id'
import dayjs from 'dayjs'
import { Table } from '../../components/common'
import { Student } from '../students'
import { Button, Image, Modal, Select } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { notification, queryClient } from '../../lib'
import { useState } from 'react'
import {
  PaymentUser,
  UpdatePaymentDto,
  updatePaymentSchema,
} from './payments.type'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { useUpdatePayment } from './api/update-payment'

const STATUSES = [
  { label: 'Unpaid', value: 'UNPAID' },
  { label: 'Pending', value: 'PENDING' },
  { label: 'Paid', value: 'PAID' },
]

export const PaymentDetail = () => {
  const { id } = useParams()
  const [opened, { open, close }] = useDisclosure()
  const [selectedUser, setSelectedUser] = useState<PaymentUser | null>()

  const { data: payment, isLoading } = useGetPaymentById(id!)

  const { mutate: updatePayment, isPending } = useUpdatePayment()

  const {
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    control,
  } = useForm<UpdatePaymentDto>({
    resolver: zodResolver(updatePaymentSchema),
  })

  const onOpenModal = (user: PaymentUser) => {
    setSelectedUser(user)
    setValue('user', user?.user?._id)
    open()
  }

  const columns = [
    { label: 'Name', value: 'user', render: (value: Student) => value?.name },
    { label: 'Email', value: 'user', render: (value: Student) => value?.email },
    { label: 'Invoice', value: 'invoice' },
    { label: 'Status', value: 'status' },
    {
      label: 'Actions',
      render: (value: PaymentUser) => (
        <Button onClick={() => onOpenModal(value)}>Update Status</Button>
      ),
    },
  ]

  const onSubmit = handleSubmit((data) => {
    const payload = {
      status: data.status,
      user: selectedUser!.user!._id!,
    }

    updatePayment(
      { id: id!, payload },
      {
        onSuccess: () => {
          notification.success({
            message: 'Payment Status updated sucessfully',
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
    reset()
    setSelectedUser(null)
    queryClient.invalidateQueries({ queryKey: ['payment', id] })
  }

  return (
    <div className="p-4">
      <div className="mb-2">
        <span className="font-semibold">Due Date - </span>
        <span>
          {payment?.dueDate ? dayjs(payment.dueDate).format('MMM DD YYYY') : ''}
        </span>
      </div>

      <div className="mb-4">
        <span className="font-semibold">Amount - </span>
        <span>{payment?.amount}</span>
      </div>

      <Table
        columns={columns}
        loading={isLoading}
        data={payment ? payment.users : []}
      />

      <Modal
        opened={opened && !!selectedUser}
        onClose={onClose}
        size="lg"
        title={`Update Payment Status`}
        centered
      >
        <div className="mb-2">
          <span className="font-semibold mb-2">Name</span>
          <div className="text-sm">{selectedUser?.user.name}</div>
        </div>

        <div className="mb-2">
          <span className="font-semibold mb-2">Invoice</span>
          <div className="text-sm">{selectedUser?.invoice}</div>
        </div>

        <div className="mb-2">
          <span className="font-semibold mb-2">Slip</span>
          <Image src={selectedUser?.slip} radius={'lg'} />
        </div>

        <div className="mb-4">
          <Controller
            name="status"
            control={control}
            defaultValue={selectedUser?.status}
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
          disabled={selectedUser?.status !== 'PENDING'}
          onClick={onSubmit}
        >
          Confirm
        </Button>
      </Modal>
    </div>
  )
}
