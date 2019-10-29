import React, { useEffect, useState, createContext, useContext } from 'react';
import { AuthContext } from './AuthContext';
export const FriendRequestContext = createContext();
export const FriendRequestProvider = ({ children }) => {
  const [friendRequests, setFriendRequests] = useState([]);
  const auth = useContext(AuthContext);
  async function getFriendRequests() {
    try {
      const res = await auth.get('/friends/requests');
      const data = await res.json();
      console.log('FRIEND_REQUEST_CONTEXT::FETCHING DATA', data);
      setFriendRequests(data);
    } catch (err) {
      console.log('ERROR::FRIEND_REQUEST_CONTEXT', err);
    }
  }
  useEffect(() => {
    getFriendRequests();
  }, [auth]);
  useEffect(() => {
    auth.socket && auth.socket.on('friendRequest', getFriendRequests);
    return () =>
      auth.socket &&
      auth.socket.removeListener('friendRequest', getFriendRequests);
  }, [auth]);
  return (
    <FriendRequestContext.Provider value={{ friendRequests }}>
      {children}
    </FriendRequestContext.Provider>
  );
};
export const FriendRequestConsumer = FriendRequestContext.Consumer;
