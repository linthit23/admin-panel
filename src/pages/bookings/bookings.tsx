import dayjs from 'dayjs'
import { useBaseFilters } from '../../hooks/useBaseFilters'
import { useGetBookings } from './api/get-bookings'
import { Student } from '../students'
import { Facility } from '../facilities'
import { Table } from '../../components/common'

export const Bookings = () => {
  const { limit, skip, page, onPageChange } = useBaseFilters()

  const { data: bookings, isLoading } = useGetBookings({ limit, skip })

  const columns = [
    {
      label: 'Date',
      value: 'start',
      render: (value: string) => dayjs(value).format('MMM DD, YYYY'),
    },
    {
      label: 'Start',
      value: 'start',
      render: (value: string) => dayjs(value).format('hh:mm A'),
    },
    {
      label: 'End',
      value: 'end',
      render: (value: string) => dayjs(value).format('hh:mm A'),
    },
    { label: 'User', value: 'user', render: (value: Student) => value.name },
    {
      label: 'Facility',
      value: 'facility',
      render: (value: Facility) => value.name,
    },
    { label: 'Status', value: 'status' },
  ]

  return (
    <div className="p-4">
      <Table
        data={bookings?.data || []}
        columns={columns}
        loading={isLoading}
        pagination={{
          current: page,
          count: bookings?.count || 0,
          onChange: onPageChange,
        }}
      />
    </div>
  )
}
