import { useMutation } from '@tanstack/react-query'
import axios from '../../../lib/axios'

export const addPayment = (payload: { amount: number; dueDate: Date }) =>
  axios.post(`/payment-reminders`, payload).then((res) => res.data)

export const useAddPayment = () => useMutation({ mutationFn: addPayment })
