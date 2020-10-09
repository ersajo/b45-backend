import { PostService, UserService } from '../services/index.js'

export default {
  create: async (req, res, next) => {
    try {
      const { body, decoded } = req
      const user = await UserService.findOneById(decoded.id)
      const post = await PostService.create(body)

      const userWithPost = await PostService.addPost(user, post)
      userWithPost.password = undefined
      res.status(200).json(userWithPost)
    } catch (error) {
      next(error)
    }
  },
  findOne: async (req, res, next) => {
    try {
      const { id } = req.params
      const post = await PostService.findOneById(id)
      if (!post) throw new Error('Not Found')
      res.status(200).json(post)
    } catch (error) {
      next(error)
    }
  },
  delete: async (req, res, next) => {
    try {
      const { decoded } = req
      const user = await PostService.findOneById(decoded.id)
      res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  },
}
