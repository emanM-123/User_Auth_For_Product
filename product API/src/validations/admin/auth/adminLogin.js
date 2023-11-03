import { celebrate, Joi } from "celebrate";
export const adminLogin = celebrate({
  body: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    user_type: Joi.string().optional(),
  }),
});
