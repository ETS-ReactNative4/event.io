export interface IFeed {
  _id: string
  audience: string
  title: string
  description: string
  location: {
    lattitude: number
    longitude: number
  }
}
