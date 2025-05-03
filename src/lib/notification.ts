import { ReactNode } from 'react'
import { notifications } from '@mantine/notifications'
import { NotificationProps } from '@mantine/core'
import { isAxiosError } from 'axios'

type NotiOpts = {
  message: ReactNode
  title?: string
  autoClose?: number
  error?: Error
} & NotificationProps

const defaultNotiOpts: Partial<NotiOpts> = {
  autoClose: 3000,
}

export const notification = {
  show(opts: NotiOpts) {
    notifications.show({ ...opts, ...defaultNotiOpts })
  },

  success(opts: NotiOpts) {
    this.show({ color: 'primary', ...opts, ...defaultNotiOpts })
  },

  error(opts: NotiOpts) {
    let message = opts?.message

    if (opts.error && isAxiosError(opts.error)) {
      message = opts.error.response?.data?.message || 'Something went wrong'
    }
    this.show({
      color: 'red',
      ...opts,
      message,
      ...defaultNotiOpts,
    })
  },
}
