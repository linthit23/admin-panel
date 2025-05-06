import { useQuery } from '@tanstack/react-query'
import axios from '../../../lib/axios'
import { Reporting } from '../reportings.type'

export const getReportings = () =>
  axios.get<Reporting>('/reportings').then((res) => res.data)

export const useGetReportings = () =>
  useQuery({
    queryKey: ['reportings'],
    queryFn: getReportings,
  })
