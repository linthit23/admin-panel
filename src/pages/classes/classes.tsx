import { Table } from '../../components/common'
import { useGetClasses } from './api/get-classes'
import dayjs from 'dayjs'
import { useBaseFilters } from '../../hooks/useBaseFilters'
import { ClassForm } from './classes.form'

export const Classes = () => {
  const { page, limit, skip, onPageChange } = useBaseFilters()

  const { data: classes, isLoading } = useGetClasses({ limit, skip })

  const columns = [
    {
      label: 'Date',
      value: 'start',
      render: (value: string) => dayjs(value).format('DD MMM YYYY'),
    },
    {
      label: 'Start Time',
      value: 'start',
      render: (value: string) => dayjs(value).format('hh:mm A'),
    },
    {
      label: 'End Time',
      value: 'end',
      render: (value: string) => dayjs(value).format('hh:mm A'),
    },
    { label: 'Subject', value: 'subject' },
    { label: 'Instructor', value: 'instructor' },
    { label: 'Room', value: 'room' },
  ]

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-end">
        <ClassForm />
      </div>

      <Table
        data={classes?.data || []}
        columns={columns}
        loading={isLoading}
        pagination={{
          current: page,
          count: classes?.count || 0,
          onChange: onPageChange,
        }}
      />
    </div>
  )
}
