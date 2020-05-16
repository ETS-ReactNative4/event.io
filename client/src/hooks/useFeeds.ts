import { useApi } from './useApi'
import { useContext } from 'react'
import { FeedContext, FeedCache } from '../context/FeedsContext'
import { tryCatch } from '../util/err'
import { getPosition } from '../util/geo'
import { IFeed } from '../interfaces/IFeed'

export default function useFeeds() {
  const api = useApi()
  const cache = useContext(FeedContext)

  async function createFeed(feed: IFeed) {
    await tryCatch(async () => {
      const pos = await getPosition()
      const { audience, title, description } = feed
      const location = {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude
      }
      const res = await api.post('/feed', {
        title,
        description,
        audience,
        location
      })
      if (res.ok) {
        const newFeed: IFeed = await res.json()
        cache.add(newFeed)
        return newFeed
      } else {
        console.log(
          'Error creating feed. Server responded with status code',
          res.status
        )
        return null
      }
    })
  }

  async function fetchFeeds() {
    await tryCatch(async () => {
      const res = await api.get('/feed')
      if (res.ok) {
        const data = await res.json()
        const newFeeds: FeedCache = {}
        for (const feed of data) {
          cache.add(feed)
        }
        return data
      }
    })
  }

  return { createFeed, fetchFeeds }
}
