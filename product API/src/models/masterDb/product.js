import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({  }) {
    
    }
  }
  product.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      product_tags:  DataTypes.STRING,
      price: DataTypes.DECIMAL,
      status: {
        type: DataTypes.ENUM("active","inactive", "deleted"),
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
      modelName: "product",
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    },
  );
  return product;
};
