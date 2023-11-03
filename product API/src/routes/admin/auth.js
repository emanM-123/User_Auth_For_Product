import { Router } from "express";
import { adminController } from "../../controllers/index.js";
import { validateAdminAccessToken, validateApiKey } from "../../middleware/index.js";
import { adminValidation } from "../../validations/index.js";

const authRouter = Router();

authRouter.post(
  "/signup",
  validateApiKey,
  adminValidation.authValidation.userSignup,
  adminController.authController.signup,
);

authRouter.post(
  "/login",
  validateApiKey,
  adminValidation.authValidation.adminLogin,
  adminController.authController.login,
);
authRouter.post(
  "/update-profile",
  validateApiKey,
  validateAdminAccessToken,
  adminValidation.authValidation.updateProfile,
  adminController.authController.updateProfile,
);

export { authRouter };
