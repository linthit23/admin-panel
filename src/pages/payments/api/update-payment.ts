import { useMutation } from '@tanstack/react-query'
import axios from '../../../lib/axios'

export const updatePayment = ({
  id,
  payload,
}: {
  id: string
  payload: { status: string; user: string }
}) =>
  axios
    .post(`/payment-reminders/${id}/approve`, payload)
    .then((res) => res.data)

export const useUpdatePayment = () => useMutation({ mutationFn: updatePayment })
