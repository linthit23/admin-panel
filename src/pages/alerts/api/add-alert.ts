import { useMutation } from '@tanstack/react-query'
import axios from '../../../lib/axios'
import { Alert } from '../alerts.type'

export const addAlert = (payload: Omit<Alert, '_id'>) =>
  axios.post(`/alerts`, payload).then((res) => res.data)

export const useAddAlert = () => useMutation({ mutationFn: addAlert })
