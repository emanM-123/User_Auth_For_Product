import * as model from "../../../models/index.js";
import sequelize from "sequelize";

/**
 * User List
 * @param req
 * @param res
 * @param next
 */
export const userList = async (req, res, next) => {
  try {
    const selectAttributes = [
      "id",
      "user_name",
      "email",
      "name",
      "gender",
      "age",
      "status",
      "mobile",
      [sequelize.literal("DATE_FORMAT(user.created_at, '%Y-%m-%d')"), "created_at"]
    ];
    const result = await model.db.user.findAll({
      attributes: selectAttributes,
    });
    return res.json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
