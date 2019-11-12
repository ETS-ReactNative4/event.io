export default {
	comments: {},
	getComments: async postId => {
    const post = posts[postId]
    if (post && post.comments) {
      const out = []
      for (let commentId of post.comments) {
        const comment = comments[commentId]
        if (comment) {
          out.push(comment)
        } else {
          return await fetchComments(postId)
        }
      }
      comments = {...comments, ...out}
    } else {
      return await fetchComments(postId)
    }
	}
}

