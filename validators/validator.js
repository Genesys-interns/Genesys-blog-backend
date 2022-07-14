import Joi from 'joi';
import validateUserSchema from './user.validator';

const validator = Joi.validate(user, validateUserSchema, (err, result) => {
  if (err) {
    result.send({
      success: false,
      message: 'Validation Error'
    });
  }
  result.send({
    success: true,
    message: 'Validation Success'
  });
});

export default validator;
