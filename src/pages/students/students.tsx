import dayjs from 'dayjs'
import { useBaseFilters } from '../../hooks/useBaseFilters'
import { useGetStudents } from './api/get-students'
import { LoadingOverlay } from '@mantine/core'
import { Table } from '../../components/common'

export const Students = () => {
  const { limit, skip, page, onPageChange } = useBaseFilters()

  const { data: students, isLoading } = useGetStudents({ limit, skip })

  const columns = [
    {
      label: 'Created Date',
      value: 'createdAt',
      render: (value: string) => dayjs(value).format('MMM DD, YYYY hh:mm A'),
    },
    {
      label: 'Name',
      value: 'name',
    },
    {
      label: 'Email',
      value: 'email',
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
        data={students?.data || []}
        columns={columns}
        pagination={{
          current: page,
          count: students?.count || 0,
          onChange: onPageChange,
        }}
      />
    </div>
  )
}
