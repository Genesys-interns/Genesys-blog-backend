import Joi from 'joi';

const postvalidator = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  category: Joi.string().required(),
  body: Joi.string().required(),
  userId: Joi.string().required(),
  image: Joi.string()
});

export default postvalidator;
