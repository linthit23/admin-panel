import { AppShellNavbar, NavLink, ScrollArea } from '@mantine/core'
import { Link, useNavigate } from 'react-router-dom'

import { navLinks } from '../../constants'

export const SideBar = () => {
  const navigate = useNavigate()

  const isActive = (path: string) => {
    const currentPath = window.location.pathname

    return currentPath === path || (currentPath.includes(path) && path !== '/')
  }

  return (
    <AppShellNavbar className="bg-[#F6F6F6]">
      <ScrollArea scrollbarSize={8}>
        {navLinks.map((nav) => {
          return (
            <NavLink
              color="black"
              component={Link}
              label={nav.label}
              to={nav.path}
              key={nav.path}
              active={isActive(nav.path)}
              onClick={() => navigate(nav.path)}
            />
          )
        })}
      </ScrollArea>
    </AppShellNavbar>
  )
}
