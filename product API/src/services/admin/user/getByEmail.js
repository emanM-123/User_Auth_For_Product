import * as model from "../../../models/index.js";

export const getByEmail = async (email) => {
  const conditions = { email: email };
  const result = await model.db.user.findOne({
    where: conditions,
    raw: true,
  });
  return result;
};
