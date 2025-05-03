import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('accessToken')

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }

  return config
})

export default api
