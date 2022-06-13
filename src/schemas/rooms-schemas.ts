import Joi from 'joi';

interface roomBody {
  roomId: number;
}

export const roomSchema = Joi.object<roomBody>({
  roomId: Joi.number().required(),
});
