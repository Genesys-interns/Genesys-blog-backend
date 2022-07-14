import Joi from 'joi';

const validateUserSchema = Joi.object().keys({
  email: Joi.string().email().regex(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).required(),
  username: Joi.string().required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required(),
  confirmPassword: Joi.string().min(8).max(15).valid(Joi.ref('password'))
    .required()
});

export default validateUserSchema;
