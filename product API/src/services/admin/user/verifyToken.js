import jwt from "jsonwebtoken";
import { StatusError } from "../../../config/StatusErrors.js";

/**
 * Berify jwt token
 * @param token
 * @param tokenSecret
 */
export const verifyToken = (token, tokenSecret) => {
  try {
    const decodeData = jwt.verify(token, tokenSecret);
    return decodeData;
  } catch (error) {
    throw StatusError.forbidden("");
  }
};
