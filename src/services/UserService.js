import { User } from '../models/index.js'

export default {
  create: (body) => new User(body).save(),
  read: (id) => User.findById(id),
  updateOne: (user, body) => {
    Object.assign(user, body)
    return user.save()
  },
  delete: (id) => User.deleteOne({ _id: id }),
  exists: (query) => User.exists(query),
  findOneByEmail: (email) => User.findOne({ email }),
  findOneById: (id) => User.findById(id),
}
