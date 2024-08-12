import Joi from 'joi';

export const getPurchaseByIdSchema = Joi.object({
  id: Joi.string().required(),
});
