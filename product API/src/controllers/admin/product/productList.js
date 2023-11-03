import sequelize from "sequelize";
import * as model from "../../../models/index.js";

/**
 * productList
 * @param req
 * @param res
 */
export const productList = async (req, res, next) => {
  try {
    const selectAttributes = [
      "id",
      "title",
      "description",
      "product_tags",
      "price",
      "status",
      [
        sequelize.literal("DATE_FORMAT(product.created_at, '%Y-%m-%d')"),
        "created_at",
      ],
    ];
    const result = await model.db.product.findAll({
      attributes: selectAttributes,
    });

    return res.ok({
      data: result,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
