import { useMutation } from '@tanstack/react-query'
import axios from '../../../lib/axios'

export const updateBookingStatus = ({
  id,
  payload,
}: {
  id: string
  payload: { status: string }
}) => axios.patch(`/facilities/booking/${id}`, payload).then((res) => res.data)

export const useUpdateBookingStatus = () =>
  useMutation({ mutationFn: updateBookingStatus })
