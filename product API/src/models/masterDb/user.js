import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({  }) {
    
    }
  }
  user.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: DataTypes.STRING,
      user_name: DataTypes.STRING,
      uuid:  DataTypes.STRING,
      mobile: DataTypes.STRING,
      email:  DataTypes.STRING,
      name: DataTypes.STRING,
      age: DataTypes.STRING,
      gender: DataTypes.ENUM("male", "female"),
      status: {
        type: DataTypes.ENUM("active", "deleted"),
        allowNull: false,
        defaultValue: "active",
      },
      deleted_by: DataTypes.INTEGER,
      deleted_at: DataTypes.DATE,
      created_by: DataTypes.INTEGER,
      created_at: DataTypes.DATE,
      updated_by: DataTypes.INTEGER,
      updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "user",
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    },
  );
  return user;
};
