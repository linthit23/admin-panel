import { useQuery } from '@tanstack/react-query'
import axios from '../../../lib/axios'
import { pickBy, isNotNil, isEmpty } from 'ramda'
import { Facility, GetFacilitiesQuery } from '../facilities.type'

export const getFacilities = async (query: GetFacilitiesQuery) => {
  const params = pickBy((val) => isNotNil(val) && !isEmpty(val), query)

  return axios
    .get<{ data: Facility[]; count: number }>('/facilities', { params })
    .then((res) => res.data)
}

export const useGetFacilities = (query: GetFacilitiesQuery) =>
  useQuery({
    queryKey: ['facilities', query],
    queryFn: () => getFacilities(query),
  })
