import React, { useState, createContext } from 'react'

export const FriendsContext = createContext({
  friends: null,
  setFriends: () => {},
  friendRequests: null,
  setFriendRequests: () => {}
})

export const FriendsProvider = ({ children }) => {
  const [friendRequests, setFriendRequests] = useState([])
  const [friends, setFriends] = useState([])
  return (
    <FriendsContext.Provider
      value={{
        friendRequests,
        friends,
        setFriendRequests,
        setFriends
      }}
    >
      {children}
    </FriendsContext.Provider>
  )
}

export const FriendsConsumer = FriendsContext.Consumer
