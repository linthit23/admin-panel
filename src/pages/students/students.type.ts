import { z } from 'zod'

export type Student = {
  _id: string
  name: string
  email: string
  createdAt: Date
}

export type GetStudentsQuery = {
  limit: number
  skip: number
}

export const addStudentSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Email is invalid' }),
  password: z.string().min(6, { message: 'Password is required' }),
})

export type AddStudentDto = z.infer<typeof addStudentSchema>
