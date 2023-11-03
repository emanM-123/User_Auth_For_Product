import { Router } from "express";
import { adminController } from "../../controllers/index.js";
import {
  validateApiKey,
  validateAdminAccessToken,
} from "../../middleware/index.js";

const productRouter = Router();

productRouter.post(
  "/add",
  validateApiKey,
  validateAdminAccessToken,
  adminController.productController.addProduct
);

productRouter.post(
  "/update",
  validateApiKey,
  validateAdminAccessToken,
  adminController.productController.updateProduct
);

productRouter.get(
  "/",
  validateApiKey,
  validateAdminAccessToken,
  adminController.productController.productList
);

productRouter.post(
  "/delete/:id",
  validateApiKey,
  validateAdminAccessToken,
  adminController.productController.deleteProduct
);

export { productRouter };
