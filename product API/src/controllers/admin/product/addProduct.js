import { StatusError } from "../../../config/StatusErrors.js";
import * as model from "../../../models/index.js";

/**
 * addProduct
 * @param req
 * @param res
 */
export const addProduct = async (req, res, next) => {
  try {
    let reqBody = req.body;
    const userId =
      req.userDetails && req.userDetails.userId ? req.userDetails.userId : null;
    const productData = {
      title: reqBody.title ? reqBody.title : "",
      description: reqBody.description ? reqBody.description : "",
      product_tags: reqBody.product_tags ? reqBody.product_tags : "",
      price: reqBody.price ? reqBody.price : "",
      status: "active",
      created_at: reqBody.created_at
        ? new Date(reqBody.created_at).toISOString().slice(0, 19).replace("T", " ")
        : new Date().toISOString().slice(0, 19).replace("T", " "),
      created_by: userId ? userId : 1,
    };

    const productAdd = await model.db.product.create(productData);

    if (productAdd) {
      return res.ok({
        message: res.__("createdSuccessfully"),
        Data: productAdd
      });
    } else {
      throw StatusError.serverError(res.__("serverError"));
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};
