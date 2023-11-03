import {envs} from "./envs.js";
import Sequelize from "sequelize";

export const sequelize = new Sequelize(envs.db.database, envs.db.username, envs.db.password, {
  host: envs.db.host,
  port: envs.db.port,
  dialect: envs.db.dialect,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  dialectOptions: {},
  logging: console.log,
});
export const connect = () => {
  sequelize
    .authenticate()
    .then(() => {
      console.log(`Connection(${envs.db.dialect}) has been established successfully.`);
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
    });
};
