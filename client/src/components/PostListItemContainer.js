import React, { useState, useEffect, useContext } from 'react';
import PostListItem from './PostListItem';
import { withNavigation } from 'react-navigation';
import { AuthContext } from '../context/AuthContext';
import { PostContext } from '../context/PostContext';

const PostListItemContainer = ({ id, navigation, showAvatar, showOptions }) => {
  const [post, setPost] = useState(null);
  const auth = useContext(AuthContext);
  const postctx = useContext(PostContext);

  useEffect(() => {
    postctx.getPost(id).then(post => setPost(post));
  }, [postctx.posts[id]]);

  async function onLike(like) {
    try {
      const res = await auth.get(`/posts/${id}/likes`, {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ like: like }),
      });
      if (res.ok) {
        const data = await res.json();
        postctx.setPost(id, data);
        //setPost(data);
      } else {
        console.log('error posting like to server', res);
      }
    } catch (err) {
      console.log(err);
    }
  }

  function onComment(isComment) {
    isComment ? null : null;
  }

  function onReply() {
    function attatchSetPost(post) {
      console.log('attatch successfull');
    }
    navigation.push('Post', { post, setPost: attatchSetPost.bind(this) });
  }

  return (
    <>
      {post && (
        <PostListItem
          showOptions={showOptions}
          showAvatar={showAvatar}
          post={post}
          onLike={onLike}
          onComment={onComment}
          onReply={onReply}
        />
      )}
    </>
  );
};

export default withNavigation(PostListItemContainer);
