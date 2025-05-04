import dayjs from 'dayjs'
import { useBaseFilters } from '../../hooks/useBaseFilters'
import { useGetHomeworks } from './api/get-homeworks'
import { Table } from '../../components/common'
import { HomeworkForm } from './homework.form'

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
      <div className="mb-4 flex justify-end">
        <HomeworkForm />
      </div>

      <Table
        data={homeworks?.data || []}
        columns={columns}
        loading={isLoading}
        pagination={{
          current: page,
          count: homeworks?.count || 0,
          onChange: onPageChange,
        }}
      />
    </div>
  )
}
