import { UserService } from '../services/index.js'
import auth from '../utils/auth.js'

export default {
  create: async (req, res, next) => {
    try {
      const criteria = await UserService.exists({ email: req.body.email })
      if (criteria) throw new Error('Ese correo ya esta en uso')

      const user = await UserService.create(req.body)
      res.status(201).send({ UserCreated: user, msg: `El usuario ${user.email} fue creado` })
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
      res.status(201).json(user)
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
  read: async (req, res, next) => {
    try {
      const criteria = await UserService.exists({ _id: req.params.id })
      if (!criteria) throw new Error('No se encontro información del usuario solicitado')
      const user = await UserService.read(req.params.id)
      res.status(201).send({ UserFounded: user, msg: `El usuario ${user.email} fue encontrado` })
    } catch (error) {
      next(error)
    }
  },
  update: async (req, res, next) => {
    try {
      const { id } = req.params
      const { body } = req
      const user = await UserService.findOneById(id)
      if (!user) throw new Error('User not found')
      const modifiedUser = await UserService.updateOne(user, body)
      user.password = undefined
      res.status(201).send({ UserUpdated: modifiedUser, msg: `El usuario ${user.email} fue actualizado` })
    } catch (error) {
      next(error)
    }
  },
  delete: async (req, res, next) => {
    try {
      const criteria = await UserService.exists({ _id: req.params.id })
      if (!criteria) throw new Error('No se encontro información del usuario solicitado')
      const user = await UserService.read(req.params.id)
      await UserService.delete(req.params.id)
      res.status(201).send({ UserDeleted: user, msg: `El usuario ${user.email} fue eliminado` })
    } catch (error) {
      next(error)
    }
  },
}
