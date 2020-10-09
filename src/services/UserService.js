import { User } from '../models/index.js'

export default {
  create: (body) => new User(body).save(),
  updateOne: (user, body) => {
    Object.assign(user, body)
    return user.save()
  },
  deleteOneById: (id) => User.findOneAndDelete(id),
  exists: (query) => User.exists(query),
  findOneByEmail: (email) => User.findOne({ email }),
  findOneById: (id) => User.findById(id).populate('posts'),
}
