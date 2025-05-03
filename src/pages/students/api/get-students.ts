import { isEmpty, isNotNil, pickBy } from 'ramda'
import { GetStudentsQuery, Student } from '../students.type'
import axios from '../../../lib/axios'
import { useQuery } from '@tanstack/react-query'

export const getStudents = (query: GetStudentsQuery) => {
  const params = pickBy((val) => isNotNil(val) && !isEmpty(val), query)

  return axios
    .get<{ data: Student[]; count: number }>('/users', { params })
    .then((res) => res.data)
}

export const useGetStudents = (query: GetStudentsQuery) =>
  useQuery({
    queryKey: ['students', query],
    queryFn: () => getStudents(query),
  })
