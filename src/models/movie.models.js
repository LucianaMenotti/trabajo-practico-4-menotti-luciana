import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export const MovieModel = sequelize.define(
  "movie",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: "id"
    },
    title: {
      type: DataTypes.STRING(150),
      allowNull: false,
      field: "title"
    },
    genre: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "genre"
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "duration"
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "year"
    },
    synopsis: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "synopsis"
    }
  },
  {
    timestamps: false,
  }
);