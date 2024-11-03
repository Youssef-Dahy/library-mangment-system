import express from 'express'
import sequelize from './database/dbConnection.js'
import userRoutes from './modules/user/user.routes.js'
import bookRoutes from './modules/Book/Book.routes.js'
import borrowRoutes from './modules/Borrow/Borrow.routes.js'
const app = express()
const port = 3000

app.use(express.json())
app.use("/auth",userRoutes)
app.use("/book",bookRoutes)
app.use("/borrow",borrowRoutes)




sequelize.sync()
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))