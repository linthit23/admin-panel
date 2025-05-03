import { useQuery } from '@tanstack/react-query'
import axios from '../../../lib/axios'
import { pickBy, isNotNil, isEmpty } from 'ramda'
import { Payment, GetPaymentsQuery } from '../payments.type'

export const getPayments = async (query: GetPaymentsQuery) => {
  const params = pickBy((val) => isNotNil(val) && !isEmpty(val), query)

  return axios
    .get<{ data: Payment[]; count: number }>('/payment-reminders', { params })
    .then((res) => res.data)
}

export const useGetPayments = (query: GetPaymentsQuery) =>
  useQuery({
    queryKey: ['payments', query],
    queryFn: () => getPayments(query),
  })
