import { Sequelize } from "sequelize";


const db = new Sequelize('book', 'root', '', {
    host: process.env.HOST,
    port: 8111,
    dialect: 'mysql'
})

export default db