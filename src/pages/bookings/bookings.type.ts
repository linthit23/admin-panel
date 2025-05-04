import { z } from 'zod'
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

export const updateBookingStatusSchema = z.object({
  status: z.enum(['PENDING', 'APPROVED', 'REJECTED'], {
    required_error: 'Status is required',
  }),
})

export type UpdateBookingStatusDto = z.infer<typeof updateBookingStatusSchema>
