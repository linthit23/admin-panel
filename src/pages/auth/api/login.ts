import { useMutation } from '@tanstack/react-query'

import axios from '../../../lib/axios'
import { User } from '../../../providers'

export const login = async ({
  email,
  password,
}: {
  email: string
  password: string
}) =>
  axios.post<{
    accessToken: string
    user: User
  }>(`/auth/login`, {
    email,
    password,
  })

export const useLogin = () => useMutation({ mutationFn: login })
