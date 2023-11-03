import { celebrate, Joi } from "celebrate";
export const updateProfile = celebrate({
  body: Joi.object({
    email: Joi.string().required().email(),
    mobile: Joi.string().required().min(10).max(11),
    phone: Joi.string().required().min(10).max(11),
  }),
});
