import Joi from 'joi';

const commentvalidator = Joi.object({
  comment: Joi.string().required(),
  email: Joi.string().required(),
  name: Joi.string().required(),
  articleId: Joi.string().required(),
  editorsId: Joi.string().required()

  // image:Joi.string(),
});

export default commentvalidator;
