import { Sequelize } from "sequelize";


const sequelize= new Sequelize('library_management_system','root','',{
    host:'localhost',
    dialect:'mysql'
})

sequelize.authenticate()
.then(console.log('Connection has been established successfully.'))
.catch((err)=>{console.error('Unable to connect to the database:');})

export default sequelize