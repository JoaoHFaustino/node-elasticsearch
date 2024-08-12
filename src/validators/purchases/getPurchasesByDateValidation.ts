import Joi from 'joi';

export const getPurchasesByDateSchema = Joi.object({
  startDate: Joi.date().iso().required(),
  endDate: Joi.date().iso().required(),
});
