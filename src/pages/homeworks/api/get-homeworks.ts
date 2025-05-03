import { useQuery } from '@tanstack/react-query'
import axios from '../../../lib/axios'
import { pickBy, isNotNil, isEmpty } from 'ramda'
import { Homework, GetHomeworksQuery } from '../homeworks.type'

export const getHomeworks = async (query: GetHomeworksQuery) => {
  const params = pickBy((val) => isNotNil(val) && !isEmpty(val), query)

  return axios
    .get<{ data: Homework[]; count: number }>('/homeworks', { params })
    .then((res) => res.data)
}

export const useGetHomeworks = (query: GetHomeworksQuery) =>
  useQuery({
    queryKey: ['homeworks', query],
    queryFn: () => getHomeworks(query),
  })
