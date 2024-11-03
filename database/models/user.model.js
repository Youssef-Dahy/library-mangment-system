import { DataTypes } from "sequelize";
import sequelize from "../dbConnection.js";
import bcrypt from 'bcrypt'
import Book from "./book.model.js";
import Borrow from "./borrow.model.js";


const User=sequelize.define('user',{
    userName:{
        type:DataTypes.STRING(100),
        allowNull:false,
        unique:true
    },
    password:{
        type:DataTypes.STRING(100),
        allowNull:false
    },
    role:{
        type:DataTypes.STRING(),
        values:['admin','user'],
        defaultValue:'user',
        allowNull:false
    }
},{
    hooks: {
        beforeCreate: async (user) => {
            user.password = await bcrypt.hash(user.password, 8);
        }
    }
})

User.hasMany(Book, { foreignKey: 'adminId' ,onDelete:'CASCADE',onUpdate:'CASCADE',})
Book.belongsTo(User, { foreignKey: 'adminId' });

User.hasMany(Borrow, { foreignKey: 'userId' ,onDelete:'CASCADE',onUpdate:'CASCADE',})
Borrow.belongsTo(User, { foreignKey: 'userId' });



export default User