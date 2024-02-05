import { Sequelize } from "sequelize";
import db from "../config/Server.js";

const { DataTypes } = Sequelize

const Note = db.define('note', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    catatan: {
        type: DataTypes.TEXT
    }
}, {
    freezeTableName: true
})

export default Note
