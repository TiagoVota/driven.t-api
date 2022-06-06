import { CreditCardBody } from '@/services/payments-service';
import Joi from 'joi';

export const creditCardInfoSchema = Joi.object<CreditCardBody>({
  name: Joi.string().min(5).max(255).required(),
  number: Joi.string().min(14).max(19).required(),
  expiry: Joi.string().min(4).max(5).required(),
  cvc: Joi.string().min(3).max(4).required(),
  totalPrice: Joi.number().integer().min(1).required(),
}).length(5);
