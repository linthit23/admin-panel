import { Avatar, Menu } from '@mantine/core'
import { IoMdArrowDropdown } from 'react-icons/io'
import { useAuth } from '../../providers'

export const UserMenu = () => {
  const { user, onLogout } = useAuth()

  return (
    <Menu position="bottom-end">
      <Menu.Target>
        <div className="flex items-center cursor-pointer">
          <Avatar radius="xl" className="w-8 h-8" color="#828282">
            {user?.name?.[0]}
          </Avatar>

          <IoMdArrowDropdown size={'20'} fill="#828282" />
        </div>
      </Menu.Target>

      <Menu.Dropdown className="py-4 text-[12px]">
        <p className="px-4">{user?.email}</p>
        <div className="border border-b border-gray-200 my-2"></div>
        <div
          onClick={onLogout}
          className="flex items-center gap-1 font-medium cursor-pointer px-4"
        >
          <span>Log Out</span>
        </div>
      </Menu.Dropdown>
    </Menu>
  )
}
