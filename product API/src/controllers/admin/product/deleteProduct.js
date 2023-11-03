import { StatusError } from "../../../config/StatusErrors.js";
import * as model from "../../../models/index.js";
import { Op } from "sequelize";

/**
 * deleteProduct
 * @param req
 * @param res
 */
export const deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.id ? req.params.id : null;
    if (!productId) throw StatusError.badRequest("product Id is required");

    const userId = req.userDetails.userId ? req.userDetails.userId : "";

    const getProduct = await model.db.product.findOne({
      where: {
        id: productId,
        status: { [Op.ne]: "deleted" },
      },
    });
    if (!getProduct) throw StatusError.badRequest("invalidId");

    const data = {
      status: "deleted",
      updated_by: userId,
      updated_at: req.body.updated_at
        ? new Date(req.body.updated_at)
            .toISOString()
            .slice(0, 19)
            .replace("T", " ")
        : new Date().toISOString().slice(0, 19).replace("T", " "),
    };

    const updateProduct = await model.db.product.update(data, {
      where: { id: productId },
    });
    const updatedData = await model.db.product.findOne({
      where: {
        id: productId,
      },
    });
    if (updateProduct) {
      return res.ok({
        message: res.__("Deleted successfully"),
        deletedProduct: updatedData,

      });
    } else {
      throw StatusError.badRequest(res.__("serverError"));
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};
