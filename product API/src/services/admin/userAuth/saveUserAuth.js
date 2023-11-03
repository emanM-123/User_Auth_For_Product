import * as model from "../../../models/index.js";

export const saveUserAuth = async (saveData) => {
  const result = await model.db.userAuth.create(saveData);
  return result;
};
