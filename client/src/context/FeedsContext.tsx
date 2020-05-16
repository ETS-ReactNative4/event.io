import React, { useState, createContext } from 'react'
import { IFeed } from '../interfaces/IFeed'

export type FeedCache = { [key: string]: IFeed }
export const FeedContext = createContext({
  feeds: {},
  add: (feed: IFeed) => {}
})

export const FeedProvider = (props: any) => {
  const [feeds, setFeeds] = useState<FeedCache>({})

  function add(feed: IFeed) {
    setFeeds({ ...feeds, [feed._id]: feed })
  }

  return (
    <FeedContext.Provider
      value={{
        feeds,
        add
      }}
    >
      {props.children}
    </FeedContext.Provider>
  )
}

export const FeedConsumer = FeedContext.Consumer
