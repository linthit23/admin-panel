import { z } from 'zod'

export type Homework = {
  _id: string
  content: string
  dueDate: Date
}

export type GetHomeworksQuery = {
  limit: number
  skip: number
}

export const addHomeworkSchema = z.object({
  content: z.string().min(1, { message: 'Content is required' }),
  dueDate: z.date({ required_error: 'Due date is required' }),
})

export type AddHomeworkDto = z.infer<typeof addHomeworkSchema>
