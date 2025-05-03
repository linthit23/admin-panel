export type Alert = {
  dueDate: Date
  content: String
  description: String
}

export type GetAlertsQuery = {
  limit: number
  skip: number
}
