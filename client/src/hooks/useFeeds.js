import { useApi } from './useApi'
import { useContext } from 'react'
import { FeedsContext } from '../context/FeedsContext'
import { tryCatch } from '../util/err'
import { getPosition } from '../util/geo'

export default function useFeeds() {
  const api = useApi()
  const feedsctx = useContext(FeedsContext)

  async function createFeed(feed) {
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
        const createdFeed = await res.json()
        feedsctx.setFeeds({ [createdFeed._id]: createdFeed, ...feeds })
        return createdFeed
      } else {
        console.log(
          'Error creating feed. Server responded with status code',
          res.code
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
        const newFeeds = {}
        for (const feed of data) {
          newFeeds[feed._id] = feed
        }
        feedsctx.setFeeds(newFeeds)
        return data
      }
    })
  }

  return { createFeed, fetchFeeds }
}
