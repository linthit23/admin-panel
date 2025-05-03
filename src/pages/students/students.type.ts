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
