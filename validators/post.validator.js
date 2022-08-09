import Joi from 'joi';

const postvalidator = Joi.object({
  title: Joi.string().required(),
 // description: Joi.string().required(),
  category: Joi.string().required(),
  body: Joi.string().required(),
  _id: Joi.string(),
  isPublished: Joi.string().required(),
  userId: Joi.string()
});
export const postvalidator2 = Joi.object({
  title: Joi.string().required(),
 // description: Joi.string().required(),
  category: Joi.string().required(),
  body: Joi.string().required()
});


export const draftPostSchema = Joi.object({
  title: Joi.string(),
  isPublished: Joi.string(),
  description: Joi.string(),
  category: Joi.string(),
  body: Joi.string(),
  _id: Joi.string()
});

export default postvalidator;
