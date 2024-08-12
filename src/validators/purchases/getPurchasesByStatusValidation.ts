import Joi from 'joi';

export const getPurchasesByStatusSchema = Joi.object({
  status: Joi.string().valid('Shipped', 'Processing', 'Delivered').required()
});
