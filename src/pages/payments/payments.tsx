import dayjs from 'dayjs'
import { useBaseFilters } from '../../hooks/useBaseFilters'
import { useGetPayments } from './api/get-payments'
import { LoadingOverlay } from '@mantine/core'
import { Table } from '../../components/common'

export const Payments = () => {
  const { limit, skip, page, onPageChange } = useBaseFilters()

  const { data: payments, isLoading } = useGetPayments({ limit, skip })

  const columns = [
    {
      label: 'Created Date',
      value: 'createdAt',
      render: (value: string) => dayjs(value).format('DD MMM YYYY, hh:mm A'),
    },
    { label: 'Amount', value: 'amount' },
    {
      label: 'Due Date',
      value: 'dueDate',
      render: (value: string) => dayjs(value).format('DD MMM YYYY'),
    },
  ]

  return (
    <div className="p-4">
      <LoadingOverlay
        visible={isLoading}
        loaderProps={{ type: 'bars', color: 'primary' }}
        bg="#000"
      />

      <Table
        data={payments?.data || []}
        columns={columns}
        pagination={{
          current: page,
          count: payments?.count || 0,
          onChange: onPageChange,
        }}
      />
    </div>
  )
}
