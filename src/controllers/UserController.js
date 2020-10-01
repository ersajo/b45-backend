import { UserService } from '../services/index.js'

// eslint-disable-next-line import/prefer-default-export
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
      const criteria = await UserService.exists({ _id: req.params.id })
      if (!criteria) throw new Error('No se encontro información del usuario solicitado')
      await UserService.update(req.params.id, req.body)
      const user = await UserService.read(req.params.id, req.body)
      res.status(201).send({ UserUpdated: user, msg: `El usuario ${user.email} fue actualizado` })
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
