import { isEmpty, isNotNil, pickBy } from 'ramda'
import { Booking, GetBookingsQuery } from '../bookings.type'
import axios from '../../../lib/axios'
import { useQuery } from '@tanstack/react-query'

export const getBookings = (query: GetBookingsQuery) => {
  const params = pickBy((val) => isNotNil(val) && !isEmpty(val), query)

  return axios
    .get<{ data: Booking[]; count: number }>('/facilities/bookings', { params })
    .then((res) => res.data)
}

export const useGetBookings = (query: GetBookingsQuery) =>
  useQuery({
    queryKey: ['bookings', query],
    queryFn: () => getBookings(query),
  })
