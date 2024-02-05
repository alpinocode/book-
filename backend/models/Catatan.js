import { Sequelize } from "sequelize";
import db from "../config/Server.js";

const { DataTypes } = Sequelize

const Note = db.define('note', {
    catatan: {
        type: DataTypes.TEXT
    }
}, {
    freezeTableName: true
})

export default Note
