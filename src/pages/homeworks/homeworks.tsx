import dayjs from 'dayjs'
import { useBaseFilters } from '../../hooks/useBaseFilters'
import { useGetHomeworks } from './api/get-homeworks'
import { LoadingOverlay } from '@mantine/core'
import { Table } from '../../components/common'

export const Homeworks = () => {
  const { limit, skip, page, onPageChange } = useBaseFilters()

  const { data: homeworks, isLoading } = useGetHomeworks({ limit, skip })

  const columns = [
    {
      label: 'Created Date',
      value: 'createdAt',
      render: (value: string) => dayjs(value).format('DD MMM YYYY, hh:mm A'),
    },
    { label: 'Content', value: 'content' },
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
        data={homeworks?.data || []}
        columns={columns}
        pagination={{
          current: page,
          count: homeworks?.count || 0,
          onChange: onPageChange,
        }}
      />
    </div>
  )
}
