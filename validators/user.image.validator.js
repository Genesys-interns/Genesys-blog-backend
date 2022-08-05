import Joi from 'joi';

const imageValidator = Joi.object({
  photo: Joi.string().required()
});

export default imageValidator;
