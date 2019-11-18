const db = require('./api/models')
const axios = require('axios').default
const pex = require('./api/utils/pexelsService')
const MONGO_URI =
  process.env.MONGO_URI || 'mongodb://127.0.0.1/hidden-notes'
const mongoose = require('mongoose')

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

const users = [
  'alex',
  'george',
  'gary',
  'georgia',
  'chris',
  'fred',
  'eric',
  'erica',
  'angela',
  'hector',
  'derek',
  'david',
  'dorothy',
  'vincent',
  'james',
  'bob',
  'joe',
  'sarah',
  'susan',
  'william',
  'wilson',
  'jeff',
  'robert'
]
const dbUsers = []
const dbFeeds = []

async function getPosts() {
  const res = await axios.get('http://jsonplaceholder.typicode.com/posts')
  return res.data
}

async function getComments() {
  const res = await axios.get(
    'http://jsonplaceholder.typicode.com/posts/1/comments'
  )
  return res.data
}

const centralLocation = {
  latitude: 43.70011,
  longitude: -79.4163
}

async function seedReplies(post, comments) {
  if (Math.random() < 0.9) {
    return null
  } else {
    const numOfComments = Math.floor(Math.random() * 10)
    for await (let [i, commentObj] of comments.entries()) {
      if (i <= numOfComments) {
        console.log('creating comment', i, 'on post', post._id)
        const likes = []
        const user = dbUsers[Math.floor(Math.random() * dbUsers.length)]
        const likeChance = Math.random()
        for (let dbUser of dbUsers) {
          if (Math.random() < likeChance) {
            likes.push(dbUser._id)
          }
        }
        const newComment = await db.Post.create({
          user,
          likes,
          body: comments[Math.floor(Math.random() * comments.length)].body,
          parent: post._id,
          feed: post.feed
        })
        await db.Post.findByIdAndUpdate(post._id, {
          $push: { comments: newComment._id }
        })
        await seedReplies(newComment, comments)
      }
    }
  }
}

async function seedComments(feed, comments) {
  const numberOfComments = Math.round(Math.random() * 10)
  for await (let [i, comment] of comments.entries()) {
    if (i <= numberOfComments) {
      // find which users will comment
      const likes = []
      const likeChance = Math.random()
      for (let dbUser of dbUsers) {
        if (Math.random() < likeChance) {
          likes.push(dbUser._id)
        }
      }
      const user = dbUsers[Math.floor(Math.random() * dbUsers.length)]
      const post = await db.Post.create({
        user: user.id,
        body: comment.body,
        parent: null,
        feed: feed.id,
        likes
      })
      console.log('creating post', post.id, 'on feed', feed._id)
      const updatedFeed = await db.Feed.findByIdAndUpdate(feed._id, {
        $push: { posts: post.id }
      })
      await seedReplies(post, comments)
    } else {
      break
    }
  }
}

async function seedFriends(user) {
  for await (dbUser of dbUsers) {
    if (user.friends.includes(dbUser._id) || user._id === dbUser._id)
      continue
    // roll
    else if (Math.random() < 0.3) {
      console.log('creating friends', user._id, dbUser._id)
      await db.User.findOneAndUpdate(
        { _id: user._id },
        { $push: { friends: dbUser._id } }
      )
      await db.User.findOneAndUpdate(
        { _id: dbUser._id },
        { $push: { friends: user._id } }
      )
    } else {
      const exists = await db.FriendRequest.exists({
        $or: [
          { from: user._id },
          { to: dbUser._id },
          { from: dbUser._id },
          { to: user._id }
        ]
      })
      if (!exists) {
        const friendRequest = await db.FriendRequest.create({
          from: user._id,
          to: dbUser._id,
          closed: false
        })
        console.log('creating friend request', friendRequest._id)
      }
    }
  }
}

async function seedDb() {
  await db.User.deleteMany({})
  await db.Post.deleteMany({})
  await db.Feed.deleteMany({})

  for await (let user of users) {
    const dbUser = await db.User.create({
      username: user,
      email: `${user}@${user}.com`,
      password: user,
      friends: []
    })
    dbUsers.push(dbUser)
  }
  for await (let user of dbUsers) {
    await seedFriends(user)
  }
  const posts = await getPosts()
  const comments = await getComments()

  for await (let [i, post] of posts.entries()) {
    // get random user
    const user = dbUsers[Math.floor(Math.random() * dbUsers.length)]
    const feed = await db.Feed.create({
      user: user.id,
      title: post.title,
      description: post.body,
      location: {
        latitude: centralLocation.latitude + (Math.random() - 0.5) * 0.05,
        longitude: centralLocation.longitude + (Math.random() - 0.5) * 0.05
      },
      audience: 'public',
      thumbnail: `https://loremflickr.com/128/128?lock=${i}`
    })
    console.log('creating feed', feed._id)
    await seedComments(feed, comments)
    dbFeeds.push(feed)
    // calculate odds of having comment
  }
}
seedDb().then(() => {
  console.log('finished seeding db.')
  mongoose.connection.close()
})
