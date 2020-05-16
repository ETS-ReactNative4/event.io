import React, { useState, createContext } from 'react'

export const FeedsContext = createContext({
  feeds: null,
  setFeeds: () => {}
})

export const FriendsProvider = ({ children }) => {
  const [feeds, setFeeds] = useState([])
  return (
    <FeedsContext.Provider
      value={{
        feeds,
        setFeeds
      }}
    >
      {children}
    </FeedsContext.Provider>
  )
}

export const FeedsConsumer = FeedsContext.Consumer
