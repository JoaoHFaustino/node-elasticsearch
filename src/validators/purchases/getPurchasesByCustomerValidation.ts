import Joi from 'joi';

export const getPurchasesByCustomerSchema = Joi.object({
  customerId: Joi.string().required(),
});
