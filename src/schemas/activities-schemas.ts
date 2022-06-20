import Joi from 'joi';

export const activityInscriptionSchema = Joi.object({
  activityId: Joi.number().integer().min(1).required(),
});
