import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default {
  comparePasswords: (userPassword, reqPassword) => bcrypt.compareSync(reqPassword, userPassword),
  // eslint-disable-next-line consistent-return
  createToken: ({ id, email, firstName }) => {
    try {
      const payload = {
        id,
        email,
        firstName,
      }
      const token = jwt.sign(payload,
        process.env.JWT_SECRET,
        { expiresIn: '1h' })
      return token
    } catch (error) {
      return null
    }
  },
}
