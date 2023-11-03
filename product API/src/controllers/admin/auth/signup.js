import bcrypt from "bcrypt";
import { adminService } from "../../../services/index.js";
import { StatusError } from "../../../config/StatusErrors.js";
import { envs } from "../../../config/envs.js";
import { v4 as uuidv4 } from "uuid";
import * as model from "../../../models/index.js";
import { Op } from "sequelize";
const { user } = model.db;

/**
 * signup
 * User can signup with details
 * @param req
 * @param res
 * @param next
 */
export const signup = async (req, res, next) => {
  try {
    const reqBody = req.body;
console.log(reqBody);
    const checkUserId = await user.findOne({
      where: { status: { [Op.ne]: "deleted" }, user_name: reqBody.user_name },
    });
    const checkMobile = await user.findOne({
      where: { status: { [Op.ne]: "deleted" }, mobile: reqBody.mobile },
    });
    if (checkUserId) throw StatusError.badRequest(res.__("This User Id is already registered"));
    // check duplicate user exists by given email
    const isExists = await adminService.userService.getByEmail(reqBody.email);
    if (isExists) throw StatusError.badRequest(res.__("This email is already registered"));
    if (checkMobile) throw StatusError.badRequest(res.__("This mobile is already registered"));

    // prepare data for insertion
    const data = {
      uuid: uuidv4(),
      user_name: reqBody.user_name,
      password: await bcrypt.hash(reqBody.password, envs.passwordSalt),
      name: reqBody.name,
      email: reqBody.email,
      gender: reqBody.gender,
      mobile: reqBody.mobile,
      created_at: reqBody.created_at
      ? new Date(created_at).toISOString().slice(0, 19).replace("T", " ")
      : new Date().toISOString().slice(0, 19).replace("T", " "),
    };

    const result = await user.create(data);
    console.log(result);

    if (result && result.id > 0) {
      const updateData = {
        created_by: result.id,
      };
      await user.update(updateData, {
        where: {
          id: result.id,
        },
      });
      const saveAuthInfo = {
        user_id: result.id,
        username: result.user_name,
        password: await bcrypt.hash(reqBody.password, envs.passwordSalt),
      };
      await adminService.userAuthService.saveUserAuth(saveAuthInfo);
      res.ok({
        results: {
          message: res.__("Registration successfully"),
        },
      });
    } else {
      throw StatusError.badRequest(res.__("serverError"));
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
