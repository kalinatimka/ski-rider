import Joi from 'joi';
import JoiPassword from 'joi-password';
import {
    ContainerTypes,
    ValidatedRequestSchema
} from 'express-joi-validation';

export interface UserRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    mail: string,
    password: string,
  }
}

export const userSchema = Joi.object({
    mail: Joi.string().required(),
    password: JoiPassword.string().min(3).minOfNumeric(1).minOfLowercase(1).minOfUppercase(1).required()
});
