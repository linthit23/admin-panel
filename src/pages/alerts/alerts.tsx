import dayjs from 'dayjs'
import { useBaseFilters } from '../../hooks/useBaseFilters'
import { useGetAlerts } from './api/get-alerts'
import { LoadingOverlay } from '@mantine/core'
import { Table } from '../../components/common'

export const Alerts = () => {
  const { limit, skip, page, onPageChange } = useBaseFilters()

  const { data: alerts, isLoading } = useGetAlerts({ limit, skip })

  const columns = [
    {
      label: 'Created Date',
      value: 'createAt',
      render: (value: string) => dayjs(value).format('MMM DD, YYYY hh:mm A'),
    },
    {
      label: 'Due Date',
      value: 'dueDate',
      render: (value: string) => dayjs(value).format('MMM DD, YYYY hh:mm A'),
    },
    {
      label: 'Content',
      value: 'content',
    },
    {
      label: 'Description',
      value: 'description',
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
        data={alerts?.data || []}
        columns={columns}
        pagination={{
          current: page,
          count: alerts?.count || 0,
          onChange: onPageChange,
        }}
      />
    </div>
  )
}
