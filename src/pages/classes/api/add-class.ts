import { useMutation } from '@tanstack/react-query'
import axios from '../../../lib/axios'
import { Class } from '../classes.type'

export const addClass = (payload: Omit<Class, '_id'>) =>
  axios.post(`/classes`, payload).then((res) => res.data)

export const useAddClass = () => useMutation({ mutationFn: addClass })
