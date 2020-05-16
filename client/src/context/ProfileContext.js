import React, { useState, createContext } from 'react'

export const ProfilesContext = createContext({
  profiles: {},
  setProfiles: () => {}
})

export const ProfilesProvider = ({ children }) => {
  const [profiles, setProfiles] = useState([])
  return (
    <ProfilesContext.Provider
      value={{
        profiles,
        setProfiles
      }}
    >
      {children}
    </ProfilesContext.Provider>
  )
}

export const ProfilesConsumer = ProfilesContext.Consumer
