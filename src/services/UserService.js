import { User } from '../models/index.js'

export default {
  create: (body) => new User(body).save(),
  read: (id) => User.findById(id),
  update: (id, body) => User.updateOne({ _id: id }, {
    $set: {
      email: body.email,
      first_name: body.first_name,
      last_name: body.last_name,
      phone_number: body.phone_number,
      password: body.password,
    },
  }),
  delete: (id) => User.deleteOne({ _id: id }),
  exists: (query) => User.exists(query),
}
