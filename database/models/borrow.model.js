import { DataTypes } from "sequelize";
import sequelize from "../dbConnection.js";


const Borrow=sequelize.define('borrow',{
    returned:{
        type:DataTypes.BOOLEAN(),
        defaultValue:false
    }
})

export default Borrow