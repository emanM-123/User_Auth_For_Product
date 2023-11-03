import { StatusError } from "../../../config/StatusErrors.js";
import * as model from "../../../models/index.js";
import { Op } from "sequelize";

const { userDetails } = model.db;

/**
 * signup
 * User can update their profile with details
 * @param req
 * @param res
 * @param next
 */
export const updateProfile = async (req, res, next) => {
  try {
    const reqBody = req.body;
    const userId = req.userDetails.userId;

    const checkMobile = await userDetails.findOne({
      where: { mobile: reqBody.mobile, id: { [Op.ne]: userId } },
    });
    if (checkMobile) {
      throw StatusError.badRequest(res.__("This mobile is already registered"));
    }

    const isExists = await userDetails.findOne({
      where: { email: reqBody.email, id: { [Op.ne]: userId } },
    });
    if (isExists) {
      throw StatusError.badRequest(res.__("This email is already registered"));
    }

    const data = {
      email: reqBody.email,
      phone: reqBody.phone,
      mobile: reqBody.mobile,
      updated_at: reqBody.updated_at
      ? new Date(updated_at).toISOString().slice(0, 19).replace("T", " ")
      : new Date().toISOString().slice(0, 19).replace("T", " "),
    };

     userDetails.update(data, {
      where: {
        id: userId,
      },
    });


    res.ok({
      results: {
        message: res.__("Updated successfully"),
      },
    });

  } catch (error) {
    console.log(error);
    next(error);
  }
};
