import Joi from 'joi';

export const addPurchaseSchema = Joi.object({
  orderId: Joi.string().required(),
  customerId: Joi.string().required(),
  orderDate: Joi.date().iso().required(),
  totalAmount: Joi.number().positive().required(),
  items: Joi.array().items(
    Joi.object({
      productId: Joi.string().required(),
      productName: Joi.string().required(),
      quantity: Joi.number().integer().min(1).required(),
      pricePerUnit: Joi.number().positive().required(),
    })
  ).required(),
  shippingAddress: Joi.object({
    addressLine1: Joi.string().required(),
    addressLine2: Joi.string().optional().allow(''),
    city: Joi.string().required(),
    state: Joi.string().required(),
    zipCode: Joi.string().required(),
    country: Joi.string().required(),
  }).required(),
  status: Joi.string().valid('Shipped', 'Processing', 'Delivered').required(),
});
