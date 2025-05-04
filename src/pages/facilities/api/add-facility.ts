import { useMutation } from '@tanstack/react-query'
import axios from '../../../lib/axios'
import { Facility } from '../facilities.type'

export const addFacility = (payload: Omit<Facility, '_id'>) =>
  axios.post(`/facilities`, payload).then((res) => res.data)

export const useAddFacility = () => useMutation({ mutationFn: addFacility })
