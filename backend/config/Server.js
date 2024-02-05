import { Sequelize } from "sequelize";


const dbConect = new Sequelize('book', 'root', '', {
    host: process.env.HOST,
    port: 8111,
    dialect: 'mysql'
})

export default dbConect