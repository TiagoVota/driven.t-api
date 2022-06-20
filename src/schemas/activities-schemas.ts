import Joi from 'joi';

export const activityInscriptionSchema = Joi.object({
  activityId: Joi.number().min(1).required(),
});
