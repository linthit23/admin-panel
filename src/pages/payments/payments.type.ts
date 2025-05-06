import { z } from 'zod'
import { Student } from '../students'

export type PaymentUser = {
  invoice: string
  user: Student
  status: 'UNPAID' | 'PENDING' | 'PAID'
}

export type Payment = {
  _id: string
  amount: number
  dueDate: Date
  createdAt: Date
  users: PaymentUser[]
}

export type GetPaymentsQuery = {
  limit: number
  skip: number
}

export const updatePaymentSchema = z.object({
  status: z.string({ required_error: 'Status is required' }),
  user: z.string({ required_error: 'User is required' }),
})

export type UpdatePaymentDto = z.infer<typeof updatePaymentSchema>

export const addPaymentSchema = z.object({
  amount: z
    .number({ required_error: 'Amount is required' })
    .min(1, { message: 'Amount must be greater than 0' }),
  dueDate: z.date({ required_error: 'Due date is required' }),
})

export type AddPaymentDto = z.infer<typeof addPaymentSchema>
