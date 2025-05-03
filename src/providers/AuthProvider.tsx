import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useLogin } from '../pages/auth'

export type User = {
  _id: string
  email: string
  name: string
  type: 'ADMIN'
}

type AuthContext = {
  user: User | null
  onLogin: (
    email: string,
    password: string
  ) => Promise<{ accessToken: string; user: User }>
  onLogout: () => void
  isLoadingUser: boolean
}

export const Context = createContext<AuthContext>({
  user: null,
  onLogin: async () => {
    throw new Error('onLogin not initialized')
  },
  onLogout: () => {},
  isLoadingUser: true,
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoadingUser, setIsLoadingUser] = useState(true)
  const { mutate: login } = useLogin()

  const onLogin = (email: string, password: string): any => {
    try {
      setIsLoadingUser(true)

      return login(
        { email, password },
        {
          onSuccess: (res) => {
            const { accessToken, user } = res.data

            localStorage.setItem('accessToken', accessToken)

            if (user) {
              localStorage.setItem('user', JSON.stringify(user))
              setUser(user)
            }

            setIsLoadingUser(false)
          },
          onError: (error) => {
            setIsLoadingUser(false)
            throw error
          },
        }
      )
    } catch (err) {
      setIsLoadingUser(false)
      throw err
    }
  }

  const onLogout = () => {
    setIsLoadingUser(true)

    localStorage.removeItem('accessToken')
    localStorage.removeItem('user')

    setUser(null)
    setIsLoadingUser(false)

    return
  }

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    const user = localStorage.getItem('user')

    if (accessToken && !!user) {
      setUser(JSON.parse(user))
    }

    setIsLoadingUser(false)
  }, [])

  return (
    <Context.Provider value={{ user, onLogin, onLogout, isLoadingUser }}>
      {children}
    </Context.Provider>
  )
}

export const useAuth = () => useContext(Context)
