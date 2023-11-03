import { Router } from "express";
import { adminController } from "../../controllers/index.js";
import { adminValidation } from "../../validations/index.js";
import {
  validateApiKey,
  validateAdminAccessToken
} from "../../middleware/index.js";

const userRouter = Router();


userRouter.get(
  "/detail/:id",
  validateApiKey,
  validateAdminAccessToken,
  adminController.userController.getUserDetails,
);

userRouter.get(
  "/",
  validateApiKey,
  validateAdminAccessToken,
  adminController.userController.userList,
);

export { userRouter };
