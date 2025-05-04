import { z } from 'zod'

export type Facility = {
  _id: string
  name: string
}

export type GetFacilitiesQuery = {
  limit: number
  skip: number
}

export const addFacilitySchema = z.object({
  name: z.string({ required_error: 'Facility name is required' }),
})

export type AddFacilityDto = z.infer<typeof addFacilitySchema>
