import { createBrowserRouter } from 'react-router-dom'
import { Home } from './pages'
import { BaseLayout } from './components/layout'
import { Login } from './pages/auth'
import { Classes } from './pages/classes'
import { Facilities } from './pages/facilities'
import { Homeworks } from './pages/homeworks'
import { PaymentDetail, Payments } from './pages/payments'
import { Alerts } from './pages/alerts'
import { Students } from './pages/students'
import { Bookings } from './pages/bookings'

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: '/students', element: <Students /> },
      { path: '/classes', element: <Classes /> },
      { path: '/facilities', element: <Facilities /> },
      { path: '/bookings', element: <Bookings /> },
      { path: '/homeworks', element: <Homeworks /> },
      { path: '/payments', element: <Payments /> },
      { path: '/payments/:id', element: <PaymentDetail /> },
      { path: '/alerts', element: <Alerts /> },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
])
