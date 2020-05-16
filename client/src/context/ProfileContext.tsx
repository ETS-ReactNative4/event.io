import React, { useState, createContext } from 'react'

export const ProfilesContext = createContext({
  profiles: {},
  setProfiles: (obj: Object) => {}
})

export const ProfilesProvider = (props: any) => {
  const [profiles, setProfiles] = useState({})
  return (
    <ProfilesContext.Provider
      value={{
        profiles,
        setProfiles
      }}
    >
      {props.children}
    </ProfilesContext.Provider>
  )
}

export const ProfilesConsumer = ProfilesContext.Consumer
