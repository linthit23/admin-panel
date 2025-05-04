import dayjs from 'dayjs'
import { useBaseFilters } from '../../hooks/useBaseFilters'
import { useGetAlerts } from './api/get-alerts'
import { Table } from '../../components/common'
import { AlertForm } from './alert.form'

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
      <div className="mb-4 flex justify-end">
        <AlertForm />
      </div>

      <Table
        data={alerts?.data || []}
        columns={columns}
        loading={isLoading}
        pagination={{
          current: page,
          count: alerts?.count || 0,
          onChange: onPageChange,
        }}
      />
    </div>
  )
}
