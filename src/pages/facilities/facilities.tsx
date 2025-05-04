import dayjs from 'dayjs'
import { useBaseFilters } from '../../hooks/useBaseFilters'
import { useGetFacilities } from './api/get-facilities'
import { Table } from '../../components/common'
import { FacilityForm } from './facility.form'

export const Facilities = () => {
  const { limit, skip, page, onPageChange } = useBaseFilters()

  const { data: facilities, isLoading } = useGetFacilities({ limit, skip })

  const columns = [
    {
      label: 'Created Date',
      value: 'createdAt',
      render: (value: string) => dayjs(value).format('DD MMM YYYY, hh:mm A'),
    },
    { label: 'Name', value: 'name' },
  ]

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-end">
        <FacilityForm />
      </div>

      <Table
        data={facilities?.data || []}
        columns={columns}
        loading={isLoading}
        pagination={{
          current: page,
          count: facilities?.count || 0,
          onChange: onPageChange,
        }}
      />
    </div>
  )
}
