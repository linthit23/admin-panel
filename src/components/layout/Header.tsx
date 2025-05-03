import { AppShellHeader } from '@mantine/core'
import { IoMenu } from 'react-icons/io5'
import { UserMenu } from './UserMenu'

type Props = {
  toggleSidebar: (value?: React.SetStateAction<boolean> | undefined) => void
}

export const Header = ({ toggleSidebar }: Props) => {
  return (
    <AppShellHeader
      className="flex items-center justify-between p-2 shadow-lg"
      bg={'#99e9ff'}
    >
      <div className="flex items-center">
        <IoMenu
          style={{ width: '35px', height: '25px' }}
          onClick={() => toggleSidebar()}
          className="cursor-pointer"
        />

        <h1 className="ml-2 font-semibold text-primary">UHive</h1>
      </div>

      <UserMenu />
    </AppShellHeader>
  )
}
