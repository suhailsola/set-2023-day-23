import { DataTypes } from "sequelize";
import { PostgresConnection } from "../connection";
import User from "./User";

const File = PostgresConnection.define(
  "File",
  {
    fieldname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    originalname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    encoding: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mimetype: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    destination: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    underscored: true,
    paranoid: true,
    timestamps: true,
  }
);

File.belongsTo(User, {
  foreignKey: "created_by",
});

export default File;
