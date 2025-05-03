import { useSearchParams } from 'react-router-dom'
import { anyPass, isEmpty, isNil, reject } from 'ramda'

export const useBaseFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const limit = searchParams.get('limit')
    ? parseInt(searchParams.get('limit')!)
    : 10
  const page = searchParams.get('page')
    ? parseInt(searchParams.get('page')!)
    : 1

  const rejectFalsy = (params: Record<string, any>) =>
    reject(anyPass([isEmpty, isNil]))(params)

  const onPageChange = (page?: number) => {
    if (page) setSearchParams((prev) => rejectFalsy({ ...prev, page }))
  }

  return {
    limit,
    page,
    skip: (page - 1) * limit,
    onPageChange,
  }
}
