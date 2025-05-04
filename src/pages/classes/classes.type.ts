import { z } from 'zod'
import { User } from '../../providers'

export type Class = {
  _id: string
  start: string
  end: string
  subject: string
  room: string
  instructor: string
  users?: User[]
}

export type GetClassesQuery = {
  limit: number
  skip: number
}

export const addClassSchema = z.object({
  date: z.date({ required_error: 'Date is required' }),
  start: z.string({ required_error: 'Start time is required' }),
  end: z.string({ required_error: 'End time is required' }),
  subject: z.string().min(1, { message: 'Subject is required' }),
  room: z.string().min(1, { message: 'Room is required' }),
  instructor: z.string().min(1, { message: 'Instructor is required' }),
})

export type AddClassDto = z.infer<typeof addClassSchema>
