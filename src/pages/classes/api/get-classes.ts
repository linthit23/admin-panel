import { useQuery } from '@tanstack/react-query'
import axios from '../../../lib/axios'
import { Class, GetClassesQuery } from '../classes.type'
import { pickBy, isNotNil, isEmpty } from 'ramda'

export const getClasses = async (query: GetClassesQuery) => {
  const params = pickBy((val) => isNotNil(val) && !isEmpty(val), query)

  return axios
    .get<{ data: Class[]; count: number }>('/classes', { params })
    .then((res) => res.data)
}

export const useGetClasses = (query: GetClassesQuery) =>
  useQuery({
    queryKey: ['classes', query],
    queryFn: () => getClasses(query),
  })
