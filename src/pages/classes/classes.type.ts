import { User } from '../../providers'

export type Class = {
  _id: string
  start: Date
  end: Date
  subject: string
  room: string
  instructor: string
  users: User[]
}

export type GetClassesQuery = {
  limit: number
  skip: number
}
