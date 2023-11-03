import { celebrate, Joi } from "celebrate";
import { validationHelper } from "../../../helpers/index.js";
export const userSignup = celebrate({
  body: Joi.object({
    user_name: Joi.string()
      .required()
      .min(5)
      .max(12)
      .custom((value) => {
        const validateRes = validationHelper.validateUserID(value);
        if (validateRes === true) {
          return value;
        } else {
          throw new Error(`${validateRes}`);
        }
      }),
    password: Joi.string()
      .required()
      .min(8)
      .max(16)
      .custom((value) => {
        const validateRes = validationHelper.adminPasswordRule(value);
        if (validateRes === true) {
          return value;
        } else {
          throw new Error(`${validateRes}`);
        }
      }),
    email: Joi.string().required().email(),
    mobile: Joi.string().required().min(10).max(11),
    name: Joi.string()
      .required()
      .custom((value) => {
        const validateRes = validationHelper.validateUserName(value);
        if (validateRes === true) {
          return value;
        } else {
          throw new Error(`${validateRes}`);
        }
      }),
    gender: Joi.string().required().valid("male", "female"),
  }),
});
