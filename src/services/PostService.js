import { Post } from '../models/index.js'

export default {
  create: (body) => Post(body).save(),
  addPost: (user, { _id }) => {
    user.posts.push(_id)
    return user.save()
  },
  deleteMany: (posts) => Post.deleteMany({
    _id: {
      $in: posts,
    },
  }),
  findOneById: (id) => Post.findById(id),
  updateOne: (post, body) => {
    Object.assign(post, body)
    return post.save()
  },
}
