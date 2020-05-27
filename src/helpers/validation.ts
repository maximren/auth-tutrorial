const Joi = require('@hapi/joi');

const validateSignup = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().min(8).required().email(),
    password: Joi.string().min(6).max(1024).required(),
    empDepartment: Joi.string().required(),
    empActive: Joi.boolean().required()
  });

  return schema.validate(data);
};

const validateSignip = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(8).required().email(),
    password: Joi.string().min(6).max(1024).required(),
  });

  return schema.validate(data);
};

export { validateSignup, validateSignip };
