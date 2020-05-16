import React, { useState, createContext } from 'react'

export const FriendsContext = createContext({
  friends: {},
  setFriends: ({}) => {},
  friendRequests: {},
  setFriendRequests: ({}) => {}
})
export const FriendsProvider: React.FC = (props: any) => {
  const [friendRequests, setFriendRequests] = useState({})
  const [friends, setFriends] = useState({})
  return (
    <FriendsContext.Provider
      value={{
        friendRequests,
        friends,
        setFriendRequests,
        setFriends
      }}
    >
      {props.children}
    </FriendsContext.Provider>
  )
}

export const FriendsConsumer = FriendsContext.Consumer
