import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient, theme } from './lib'
import { MantineProvider } from '@mantine/core'
import { RouterProvider } from 'react-router-dom'
import { routes } from './routes'
import { AuthProvider } from './providers'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <AuthProvider>
          <RouterProvider router={routes} />
        </AuthProvider>
      </MantineProvider>
    </QueryClientProvider>
  )
}

export default App
