import Joi from 'joi';

const commentvalidator = Joi.object({
  comment: Joi.string().required(),
  postId: Joi.string().required()
});

export default commentvalidator;
