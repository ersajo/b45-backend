import celeb from 'celebrate'

const { celebrate, Joi, Segments } = celeb

export default {
  create: celebrate({
    [Segments.BODY]: Joi
      .object()
      .keys({
        email: Joi.string().email().required(),
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        phone_number: Joi.string().max(10).required(),
        password: Joi.string().required(),
      }),
  }),
  updateOne: celebrate({
    [Segments.BODY]: Joi
      .object()
      .keys({
        email: Joi.string().email(),
        first_name: Joi.string(),
        last_name: Joi.string(),
        password: Joi.string(),
      }),
  }),
  login: celebrate({
    [Segments.BODY]: Joi
      .object()
      .keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      }),
  }),
  findOne: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
}
