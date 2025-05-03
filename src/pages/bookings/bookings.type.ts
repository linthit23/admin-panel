import { Facility } from '../facilities'
import { Student } from '../students'

export type Booking = {
  _id: string
  user: Student
  facility: Facility
  start: Date
  end: Date
  number_of_people: number
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  createdAt: Date
}

export type GetBookingsQuery = {
  limit: number
  skip: number
}
