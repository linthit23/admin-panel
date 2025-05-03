export type Homework = {
  _id: string
  content: string
  dueDate: string
  createdAt: Date
}

export type GetHomeworksQuery = {
  limit: number
  skip: number
}
