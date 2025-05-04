import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient, theme } from './lib'
import { MantineProvider } from '@mantine/core'
import { RouterProvider } from 'react-router-dom'
import { routes } from './routes'
import { AuthProvider } from './providers'
import { Notifications } from '@mantine/notifications'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <AuthProvider>
          <Notifications position="top-right" />
          <RouterProvider router={routes} />
        </AuthProvider>
      </MantineProvider>
    </QueryClientProvider>
  )
}

export default App
