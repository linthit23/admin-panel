import { isEmpty, isNotNil, pickBy } from 'ramda'
import { Alert, GetAlertsQuery } from '../alerts.type'
import axios from '../../../lib/axios'
import { useQuery } from '@tanstack/react-query'

export const getAlerts = (query: GetAlertsQuery) => {
  const params = pickBy((val) => isNotNil(val) && !isEmpty(val), query)

  return axios
    .get<{ data: Alert[]; count: number }>('/alerts', { params })
    .then((res) => res.data)
}

export const useGetAlerts = (query: GetAlertsQuery) =>
  useQuery({
    queryKey: ['alerts', query],
    queryFn: () => getAlerts(query),
  })
