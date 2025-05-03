export type TNavLink = {
  label: string
  path: string
}

export const navLinks: TNavLink[] = [
  { path: '/', label: 'Home' },
  { path: '/students', label: 'Students' },
  { path: '/classes', label: 'Classes' },
  { path: '/facilities', label: 'Facilities' },
  { path: '/bookings', label: 'Bookings' },
  { path: '/homeworks', label: 'Homeworks' },
  { path: '/payments', label: 'Payments' },
  { path: '/alerts', label: 'Alerts' },
]
