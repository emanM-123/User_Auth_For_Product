import { StatusError } from "../../../config/StatusErrors.js";
import sequelize from "sequelize";
import * as model from "../../../models/index.js";

/**
 * getUserDetails
 * @param req
 * @param res
 */
export const getUserDetails = async (req, res, next) => {
  try {
    const reqParams = req.params.id;
    const condition = {
      status: { [sequelize.Op.ne]: "deleted" },
      id: reqParams,
    };
    const selectAttributes = [
      "id",
      "user_name",
      "email",
      "name",
      "gender",
      "age",
      "status",
      "mobile",
      [sequelize.literal("DATE_FORMAT(user.created_at, '%Y-%m-%d')"), "created_at"],
    ];

    const result = await model.db.user.findOne({
      where: condition,
      attributes: selectAttributes,
    });
    
    if (!result) {
      throw StatusError.badRequest(res.__("invalidId"));
    }

    return res.ok({
      data: result,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

