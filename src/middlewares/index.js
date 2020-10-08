import jwt from 'jsonwebtoken'

export const getDate = (req, res, next) => {
  const date = new Date()
  console.log(date.toDateString())
  next()
}
export const verifyToken = (req, res, next) => {
  try {
    const { authorization } = req.headers
    console.log(authorization);
    const token = authorization.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log(decoded);
    req.decoded = decoded
    next()
  } catch (error) {
    next(error)
  }
}
