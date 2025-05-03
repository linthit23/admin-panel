import { LoadingOverlay } from '@mantine/core'
import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../providers'

export const Protected = ({ children }: { children: ReactNode }) => {
  const { user, isLoadingUser } = useAuth()

  return (
    <>
      {isLoadingUser ? (
        <LoadingOverlay
          visible={isLoadingUser}
          loaderProps={{ type: 'bars', color: 'primary' }}
          bg="#000"
        />
      ) : user ? (
        children
      ) : (
        <Navigate to="/login" />
      )}
    </>
  )
}
