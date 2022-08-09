import Joi from 'joi';

export const validatePassword = async (password = '') => {
  const schema = Joi.object({
    password: Joi.string().min(6).max(60).required()
  });

  const value = await schema.validateAsync({ password });

  return value;
};

export const validateToken = async (token = '') => {
  const schema = Joi.object({
    token: Joi.string().min(10).trim().required()
  });

  const value = await schema.validateAsync({ token });

  return value;
};

export const validatePasswordWithToken = async (data = {}) => {
  const { password } = await this.validatePassword(data.password);
  const { token } = await this.validateToken(data.token);

  return { password, token };
};

export default { validatePasswordWithToken, validateToken, validatePassword };
