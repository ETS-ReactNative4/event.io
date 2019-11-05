import React, { useEffect, useState, createContext, useContext } from 'react';
import { AuthContext } from './AuthContext';
export const FriendsContext = createContext();

export const FriendsProvider = ({ children }) => {
  const [requests, setRequests] = useState([]);
  const [friends, setFriends] = useState([]);
  const auth = useContext(AuthContext);

  async function getRequests() {
    try {
      const res = await auth.get('/friends/requests');
      const requests = await res.json();
      setRequests(requests);
    } catch (err) {
      console.log(err);
    }
  }

  async function getFriends() {
    try {
      const res = await auth.get('/friends');
      const data = await res.json();
      setFriends(data.friends);
    } catch (err) {
      console.log(err);
    }
  }
  // whenever auth state changes
  useEffect(() => {
    getRequests();
    getFriends();
  }, [auth]);

  // handle socket subscriptions
  useEffect(() => {
    if (auth.socket) {
      auth.socket.on('friendRequest', getRequests);
      auth.socket.on('friend', getFriends);
    }
    return () => {
      if (auth.socket) {
        auth.socket.removeListener('friendRequest', getRequests);
        auth.socket.removeListener('friend', getFriends);
      }
    };
  }, [auth]);

  return (
    <FriendsContext.Provider value={{ requests, friends }}>
      {children}
    </FriendsContext.Provider>
  );
};

export const FriendsConsumer = FriendsContext.Consumer;
