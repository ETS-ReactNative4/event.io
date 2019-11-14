const axios = require('axios').default;
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZGI5YWY0YTgzYWU1OTFmNmQxYTI5YjciLCJ1c2VybmFtZSI6ImNocmlzLnNhbHphIiwicGljdHVyZSI6Imh0dHBzOi8vZmFrZWltZy5wbC8xMDB4MTAwLzMzMy8_dGV4dD1DJmZvbnQ9bm90byIsImZyaWVuZHMiOlsiNWRiOWIwYWU0NjVkY2UxZmNjYTEwZWE1IiwiNWRiYTEwNGY1ZTdlNzgzNTc4YmFiNTQzIl0sImlhdCI6MTU3MzcxMDg5MSwiZXhwIjoxNTczNzk3MjkxfQ.hfYhSYCXsapw-7ioJv6ktcVvQl5X3O8OIHzzgxKGO-E'

const api = axios.create({ 
	baseURL: 'http://localhost:3000', 
	headers: {
		'content-type': 'application/json',
		Authorization: `Bearer ${token}`
	}
});

function pretty(obj) {
	return JSON.stringify(obj, null, 2)
}


async function main() {
	try {
		const res = await api.get('/feed')
		const feed = res.data[0];
		//return;
		console.log('----------------')
		console.log('FeedResponse\n', pretty(res.data))
		await postToFeed(feed._id, 'hello world')

		const postRes = await api.get(`/feed/${feed._id}/`)
		const post = postRes.data.posts[0];
		await postToPost(feed._id, post._id, 'this is a comment')
		console.log('----------------')
		console.log('PostResponse\n', pretty(postRes.data))
	//	await postToPost(feed._id, post._id, 'Hello this is a comment')
		// return ste post
		const commentRes = await api.get(`/feed/${feed._id}/${post._id}`)
		console.log('----------------')
		console.log('CommentResponse\n', pretty(commentRes.data))

	} catch (err) {
		console.log(err)
	}
}

async function postToPost(feedId, postId, message) {
	const res = await api.post(`/feed/${feedId}/${postId}`, { body: message})
	console.log('Response to post to post', pretty(res.data))
}

async function postToFeed(feedId, message) {
	const res = await api.post(`/feed/${feedId}`, { body: message})
	console.log('Response to create post\n', pretty(res.data))
}
main()
