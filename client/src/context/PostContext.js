import React, { useState } from 'react';
export const PostContext = React.createContext();
export const PostContextProvider = props => {
  const [post, setPost] = useState(props.post);
  return (
    <PostContext.Provider value={{ post, setPost }}>
      {props.children}
    </PostContext.Provider>
  );
};
export const PostContextConsumer = PostContext.Consumer;
