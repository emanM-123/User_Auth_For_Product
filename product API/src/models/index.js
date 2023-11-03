import Sequelize from "sequelize";
import { sequelize } from "../config/database.js";
import * as masterDb from "./masterDb/index.js";

const db = {};
if (masterDb && Object.keys(masterDb) && Object.keys(masterDb).length > 0) {
  for (const master of Object.keys(masterDb)) {
    db[master] = masterDb[master].default(sequelize, Sequelize.DataTypes);
  }
}

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
export { db };
