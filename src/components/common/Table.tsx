import { Loader, Table as MantineTable, Pagination } from '@mantine/core'
import { ReactNode } from 'react'

export type TableColumn = {
  label: ReactNode
  value?: string
  key?: string
  render?: (value: any) => ReactNode
}

export type TableProps<T extends Record<string, any>> = {
  data: T[]
  columns: TableColumn[]
  striped?: boolean
  highlightOnHover?: boolean
  noDataMsg?: ReactNode
  loading?: boolean
  pagination?: {
    current: number
    count: number
    onChange: (value: number) => void
  }
  trClassName?: (item: T) => string
}

export const Table = <T extends Record<string, any>>({
  columns,
  data,
  noDataMsg = 'No Data',
  striped = true,
  highlightOnHover = false,
  loading = false,
  pagination,
  trClassName,
}: TableProps<T>) => {
  return (
    <>
      <MantineTable.ScrollContainer minWidth={500}>
        <MantineTable
          striped={striped ? 'even' : false}
          highlightOnHover={highlightOnHover}
          classNames={{
            table: 'bg-white overflow-hidden rounded w-full',
            thead: 'bg-[#99e9ff] text-[#] rounded overflow-hidden',
            tbody: 'overflow-auto max-h-32 min-w-[500px]',
            th: 'h-[50px] font-medium',
            td: 'h-[60px]',
            tfoot: 'p-4 flex',
          }}
        >
          <MantineTable.Thead>
            <MantineTable.Tr>
              {columns.map((item, index) => (
                <MantineTable.Th key={item.key || index}>
                  {item.label}
                </MantineTable.Th>
              ))}
            </MantineTable.Tr>
          </MantineTable.Thead>

          <MantineTable.Tbody>
            {loading && <Loader type="bars" />}
            {!data?.length ? (
              <MantineTable.Tr>
                <MantineTable.Td
                  colSpan={columns.length}
                  classNames={{ td: 'text-center' }}
                >
                  {noDataMsg}
                </MantineTable.Td>
              </MantineTable.Tr>
            ) : (
              data.map((item, index) => (
                <MantineTable.Tr
                  key={index}
                  className={trClassName ? trClassName(item) : ''}
                >
                  {columns.map((col, index) => (
                    <MantineTable.Td key={col.key || index}>
                      {col.render
                        ? col.render(col.value ? item[col.value] : item)
                        : item[col.value!]}
                    </MantineTable.Td>
                  ))}
                </MantineTable.Tr>
              ))
            )}
          </MantineTable.Tbody>
        </MantineTable>
      </MantineTable.ScrollContainer>
      <div className="p-2 mt-2 w-full flex justify-center">
        {!!pagination && (
          <Pagination
            total={Math.ceil(pagination.count / 10)}
            onChange={pagination.onChange}
            value={pagination.current}
            withEdges
          />
        )}
      </div>
    </>
  )
}
