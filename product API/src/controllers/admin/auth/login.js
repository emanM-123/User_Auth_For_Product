import bcrypt from "bcrypt";
import { adminService } from "../../../services/index.js";
import { StatusError } from "../../../config/StatusErrors.js";

/**
 * User login
 * @param req
 * @param res
 * @param next
 */
export const login = async (req, res, next) => {
  try {
    const reqBody = req.body;
    const username = reqBody.username ? reqBody.username : "";
    const password = reqBody.username ? reqBody.password : "";

    // get user details by username
    const userDetails = await adminService.userAuthService.getUserAuth({ username: username });
    if (!userDetails) {
      throw StatusError.badRequest({ email: res.__("user does not exists") });
    }

    // comparing the password:
    const isSame = await bcrypt.compare(password, userDetails.password);
    if (!isSame) throw StatusError.badRequest({ password: res.__("Password does not match") });

    const result = await adminService.userService.generateTokens({
      userId: userDetails.user_id,
      username: userDetails.username,
    });


    const userdetail = {
      message: res.__("Login successful"),
      user_id: userDetails.user_id,
      username: userDetails.username,
      token: result.access_token,
      token_expiry: result.access_token_expiry,
    };

    return res.ok({
      results: userdetail,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
