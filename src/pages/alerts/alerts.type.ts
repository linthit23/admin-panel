import { z } from 'zod'

export type Alert = {
  dueDate: Date
  content: String
  description: String
}

export type GetAlertsQuery = {
  limit: number
  skip: number
}

export const addAlertSchema = z.object({
  content: z.string().min(1, { message: 'Content is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  dueDate: z.date({ required_error: 'Due date is required' }),
})

export type AddAlertDto = z.infer<typeof addAlertSchema>
