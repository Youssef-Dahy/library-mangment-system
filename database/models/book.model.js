import { DataTypes } from "sequelize";
import sequelize from "../dbConnection.js";
import Borrow from "./borrow.model.js";

const Book = sequelize.define('book', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  available: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false
  }
  
})

Book.hasMany(Borrow, { foreignKey: 'bookId' ,onDelete:'CASCADE',onUpdate:'CASCADE',})
Borrow.belongsTo(Book, { foreignKey: 'bookId' });

export default Book