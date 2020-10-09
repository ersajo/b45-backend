import { UserService } from '../services/index.js'
import PostService from '../services/PostService.js'
import auth from '../utils/auth.js'

export default {
  create: async (req, res, next) => {
    try {
      const criteria = await UserService.exists({ email: req.body.email })
      if (criteria) throw new Error('Ese correo ya esta en uso')

      const user = await UserService.create(req.body)
      res.status(200).send({ UserCreated: user, msg: `El usuario ${user.email} fue creado` })
    } catch (error) {
      next(error)
    }
  },
  signup: async (req, res, next) => {
    try {
      const criteria = await UserService.exists({ email: req.body.email })
      if (criteria) throw new Error('Ese correo ya esta en uso')
      const user = await UserService.create(req.body)
      user.password = undefined
      res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  },
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body
      const user = await UserService.findOneByEmail(email)
      if (!user) throw new Error('error on credentials')
      const isValid = await auth.comparePasswords(user.password, password)
      if (!isValid) throw new Error('error on credentials')
      const token = auth.createToken(user)
      res.status(200).json({ token })
    } catch (error) {
      next(error)
    }
  },
  findOne: async (req, res, next) => {
    try {
      const { id } = req.params
      const criteria = await UserService.exists({ _id: id })
      if (!criteria) throw new Error('No se encontro información del usuario solicitado')
      const user = await UserService.findOneById(id)
      user.password = undefined
      res.status(200).send({ UserFounded: user, msg: `El usuario ${user.email} fue encontrado` })
    } catch (error) {
      next(error)
    }
  },
  updateOne: async (req, res, next) => {
    try {
      const { body, decoded } = req
      const user = await UserService.findOneById(decoded.id)
      if (!user) throw new Error('User not found')
      const modifiedUser = await UserService.updateOne(user, body)
      user.password = undefined
      res.status(200).send({ UserUpdated: modifiedUser, msg: `El usuario ${user.email} fue actualizado` })
    } catch (error) {
      next(error)
    }
  },
  deleteOne: async (req, res, next) => {
    try {
      const { decoded } = req
      const criteria = await UserService.exists({ _id: decoded.id })
      if (!criteria) throw new Error('No se encontro información del usuario solicitado')
      const deletedUser = await UserService.deleteOneById(decoded.id)
      const deletedPosts = await PostService.deleteMany(deletedUser.posts)
      res.status(200).send({ UserDeleted: deletedUser, PostsDeleted: deletedPosts, msg: `El usuario ${deletedUser.email} fue eliminado` })
    } catch (error) {
      next(error)
    }
  },
}
