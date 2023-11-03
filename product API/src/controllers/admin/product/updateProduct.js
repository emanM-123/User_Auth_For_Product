import { StatusError } from "../../../config/index.js";
import * as models from "../../../models/index.js";
import { Op } from "sequelize";

/**
 * Update product
 * @param req
 * @param res
 * @param next
 */
export const updateProduct = async (req, res, next) => {
  try {
    const reqBody = req.body;
    const productId = reqBody.product_id ? reqBody.product_id : "";
    if (!productId)
      throw StatusError.badRequest(res.__("Product Id is required"));

    const userId =
      req.userDetails && req.userDetails.userId ? req.userDetails.userId : null;
    const getProduct = await models.db.product.findOne({
      where: {
        id: productId,
        status: { [Op.ne]: "deleted" },
      },
    });

    if (!getProduct) throw StatusError.badRequest(res.__("invalidId"));

    const data = {
      title: reqBody.title ? reqBody.title : "",
      description: reqBody.description ? reqBody.description : "",
      product_tags: reqBody.product_tags ? reqBody.product_tags : "",
      price: reqBody.price ? reqBody.price : "",
      status: "active",
      updated_at: reqBody.updated_at
        ? new Date(reqBody.updated_at).toISOString().slice(0, 19).replace("T", " ")
        : new Date().toISOString().slice(0, 19).replace("T", " "),
      updated_by: userId,
    };

    const productUpdate = await models.db.product.update(data, {
      where: {
        id: productId,
      },
    });
    const updatedData = await models.db.product.findOne({
        where: {
          id: productId,
          status: { [Op.ne]: "deleted" },
        },
      });
    if (productUpdate) {
      return res.ok({
        message: res.__("Updated successfully"),
        data: updatedData,
      });
    } else {
      throw StatusError.serverError(res.__("serverError"));
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
