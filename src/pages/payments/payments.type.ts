export type Payment = {
  _id: string
  amount: number
  dueDate: Date
  createdAt: Date
}

export type GetPaymentsQuery = {
  limit: number
  skip: number
}
