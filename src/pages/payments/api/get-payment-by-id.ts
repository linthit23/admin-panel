import { useQuery } from '@tanstack/react-query'
import axios from '../../../lib/axios'
import { Payment } from '../payments.type'

export const getPaymentById = (id: string) =>
  axios.get<Payment>(`/payment-reminders/${id}`).then((res) => res.data)

export const useGetPaymentById = (id: string) =>
  useQuery({
    queryKey: ['payment', id],
    queryFn: () => getPaymentById(id),
  })
