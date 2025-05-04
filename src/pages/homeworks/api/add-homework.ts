import { useMutation } from '@tanstack/react-query'
import axios from '../../../lib/axios'
import { Homework } from '../homeworks.type'

export const addHomework = (payload: Omit<Homework, '_id'>) =>
  axios.post(`/homeworks`, payload).then((res) => res.data)

export const useAddHomework = () => useMutation({ mutationFn: addHomework })
