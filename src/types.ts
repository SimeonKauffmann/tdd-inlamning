export interface EventType {
  id: string
  image?: string
  date: number
  start: string
  end: string
  organiser: string
  attending: string[]
  rating: number
  comments: string[]
  limit?: number
  online: boolean
  location?: string
  title: string
}

export interface UserType {
  id: string
  name: string
  ratings: RatingObject[]
}

interface RatingObject {
  event: string
  rating: number
}
