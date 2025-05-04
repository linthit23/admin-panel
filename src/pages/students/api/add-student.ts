import { useMutation } from '@tanstack/react-query'
import axios from '../../../lib/axios'

export const addStudent = (payload: {
  name: string
  email: string
  password: string
}) => axios.post(`/users`, payload).then((res) => res.data)

export const useAddStudent = () => useMutation({ mutationFn: addStudent })
