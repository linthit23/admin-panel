import { AppShell } from '@mantine/core'
import { useToggle } from '@mantine/hooks'
import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { SideBar } from './SideBar'
import { Protected } from '../auth/Protected'

export const BaseLayout = () => {
  const [expandSideBar, toggleSideBar] = useToggle([false, true])

  return (
    <Protected>
      <AppShell
        header={{ height: { base: 55, sm: 60, lg: 70 } }}
        navbar={{
          width: expandSideBar ? 240 : 60,
          breakpoint: 'xs',
        }}
      >
        <Header toggleSidebar={toggleSideBar} />
        <SideBar />

        <AppShell.Main>
          <Outlet />
        </AppShell.Main>
      </AppShell>
    </Protected>
  )
}
