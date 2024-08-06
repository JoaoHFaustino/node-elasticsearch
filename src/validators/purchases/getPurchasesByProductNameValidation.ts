import Joi from 'joi';

export const getPurchasesByProductNameSchema = Joi.object({
  productName: Joi.string().min(3).required(),
});
